const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

const departmentSubjects = {
  'Computer Science': ['Programming', 'Database', 'Networking', 'Software Engineering', 'Operating Systems'],
  'Accounting': ['Financial Accounting', 'Cost Accounting', 'Auditing', 'Taxation', 'Management Accounting'],
  'Marketing Management': ['Principles of Marketing', 'Consumer Behavior', 'Brand Management', 'Services Marketing', 'Digital Marketing'],
  'Tourism & Hospitality': ['Tourism Management', 'Hospitality Operations', 'Event Management', 'Travel Agency Operations', 'Sustainable Tourism']
};

// @route   GET /api/exam/questions
// @desc    Get mock exam questions dynamic by department & size limit
// @access  Private
router.get('/questions', auth, async (req, res) => {
  try {
    const userDept = req.user.department || 'Computer Science';

    // Parse query parameter limit (default 25)
    const limit = parseInt(req.query.limit) || 25;

    // Fetch random questions directly without subject-based splitting
    const result = await db.query(
      'SELECT id, question, option_a, option_b, option_c, option_d, subject FROM questions WHERE department = $1 ORDER BY RANDOM() LIMIT $2',
      [userDept, limit]
    );

    res.json({ questions: result.rows });
  } catch (err) {
    console.error('Error fetching questions:', err.message);
    res.status(500).json({ error: 'Server error while fetching questions.' });
  }
});

// @route   POST /api/exam/submit
// @desc    Submit exam responses, grade them, and save performance results
// @access  Private
router.post('/submit', auth, async (req, res) => {
  const { answers } = req.body; // Expecting { question_id: 'A', question_id: 'B', ... }

  if (!answers || typeof answers !== 'object') {
    return res.status(400).json({ error: 'Invalid submission format.' });
  }

  try {
    const questionIds = Object.keys(answers);
    if (questionIds.length === 0) {
      return res.status(400).json({ error: 'No answers submitted.' });
    }

    // Fetch the correct answers from the database for verification
    const placeholders = questionIds.map((_, index) => `$${index + 1}`).join(', ');
    const queryStr = `SELECT id, correct_answer, subject FROM questions WHERE id IN (${placeholders})`;
    
    const dbQuestions = await db.query(queryStr, questionIds);
    
    let totalCorrect = 0;
    let totalQuestions = dbQuestions.rows.length;
    
    // Dynamic stats by subject for the user's department
    const userDept = req.user.department || 'Computer Science';
    const subjects = departmentSubjects[userDept] || departmentSubjects['Computer Science'];
    const subjectStats = {};
    for (const s of subjects) {
      subjectStats[s] = { correct: 0, total: 0 };
    }

    const gradedDetails = dbQuestions.rows.map(q => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correct_answer;
      
      if (subjectStats[q.subject]) {
        subjectStats[q.subject].total += 1;
        if (isCorrect) {
          subjectStats[q.subject].correct += 1;
        }
      }

      if (isCorrect) {
        totalCorrect += 1;
      }

      return {
        question_id: q.id,
        user_answer: userAnswer,
        correct_answer: q.correct_answer,
        is_correct: isCorrect,
        subject: q.subject
      };
    });

    const overallScore = Math.round((totalCorrect / totalQuestions) * 100);
    
    // Evaluate readiness level based on overall score
    let readinessLevel = 'Needs Improvement';
    if (overallScore >= 75) {
      readinessLevel = 'High Chance of Passing';
    } else if (overallScore >= 50) {
      readinessLevel = 'Moderate Readiness';
    }

    // Save Overall/Comprehensive result
    const overallResult = await db.query(
      'INSERT INTO results (user_id, score, subject, readiness_level) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, overallScore, 'Comprehensive', readinessLevel]
    );

    // Save individual subject results
    for (const [subjectName, stats] of Object.entries(subjectStats)) {
      if (stats.total > 0) {
        const subScore = Math.round((stats.correct / stats.total) * 100);
        let subReadiness = 'Needs Improvement';
        if (subScore >= 75) {
          subReadiness = 'High Chance of Passing';
        } else if (subScore >= 50) {
          subReadiness = 'Moderate Readiness';
        }
        
        await db.query(
          'INSERT INTO results (user_id, score, subject, readiness_level) VALUES ($1, $2, $3, $4)',
          [req.user.id, subScore, subjectName, subReadiness]
        );
      }
    }

    res.json({
      message: 'Exam graded successfully',
      result_id: overallResult.rows[0].id,
      overall_score: overallScore,
      readiness_level: readinessLevel,
      subject_breakdown: subjectStats,
      details: gradedDetails
    });

  } catch (err) {
    console.error('Error submitting exam:', err.message);
    res.status(500).json({ error: 'Server error while grading exam.' });
  }
});

module.exports = router;
