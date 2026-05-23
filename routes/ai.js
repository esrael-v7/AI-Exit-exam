const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');
require('dotenv').config();

const departmentSubjects = {
  'Computer Science': ['Programming', 'Database', 'Networking', 'Software Engineering', 'Operating Systems'],
  'Accounting': ['Financial Accounting', 'Cost Accounting', 'Auditing', 'Taxation', 'Management Accounting'],
  'Marketing Management': ['Principles of Marketing', 'Consumer Behavior', 'Brand Management', 'Services Marketing', 'Digital Marketing'],
  'Tourism & Hospitality': ['Tourism Management', 'Hospitality Operations', 'Event Management', 'Travel Agency Operations', 'Sustainable Tourism']
};

// Helper: Generate simulated study recommendation
const generateSimulatedRecommendation = (userName, userDept, score, readiness_level, subject_breakdown, weakSubjects, isErrorFallback = false) => {
  const breakdownStr = Object.entries(subject_breakdown || {})
    .map(([subj, stats]) => `  * ${subj}: ${stats.correct}/${stats.total} correct (${stats.total > 0 ? Math.round((stats.correct/stats.total)*100) : 0}%)`)
    .join('\n');
  
  const weakList = weakSubjects.length > 0 ? weakSubjects.join(', ') : 'None! Excellent work.';

  return `### 🎓 SMU AI-Prep Study Coach Recommendation for **${userName}**
    
**Performance Evaluation:**
*   **Overall Score:** ${score}%
*   **National Exam Readiness:** **${readiness_level}**

**Subject Performance Breakdown:**
${breakdownStr}

**Key Areas of Focus:**
${weakSubjects.length > 0 
  ? `Based on your quiz results, you should prioritize reviewing **${weakList}** as these fell below the 70% proficiency threshold.`
  : `Splendid! You scored 70% or higher in all subjects. Continue taking mock exams to build speed and stamina.`}

**Suggested Next Steps:**
1.  **Review Incorrect Questions:** Click on the question numbers in the quiz summary below to see which topics caused confusion.
2.  **Targeted Practice:** Use the SMU Study Chatbot on the dashboard to ask questions like: *"Can you explain the main concepts in ${weakSubjects[0] || 'your core subjects'}?"*
3.  **Readiness Target:** Try to achieve a steady score of **75% or higher** on 25-question comprehensive mocks to feel fully prepared for the actual exit exam.`;
};

// Helper: Generate simulated chat response
const generateSimulatedChatResponse = (userName, userDept, message, readinessScore, readinessLevel, recentExamsCount, subjectAverages, weakSubjects, strongSubjects, isErrorFallback = false) => {
  const msg = message.toLowerCase();
  let reply = `👋 Hello **${userName}**!\n\n`;

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    reply += `Welcome to your SMU AI Study Assistant! I am configured for the **${userDept}** department.\n\nYour current estimated exit exam readiness is **${readinessLevel}** (readiness score: **${readinessScore}%** based on **${recentExamsCount}** mock exams).\n\nHow can I help you study today? You can ask me about:\n- **"weak areas"** or **"study plan"**\n- **"strong areas"**\n- Specific subjects: *${(departmentSubjects[userDept] || []).join(', ')}*`;
  } else if (msg.includes('weak') || msg.includes('improve') || msg.includes('fail') || msg.includes('study plan') || msg.includes('plan')) {
    if (weakSubjects.length > 0) {
      reply += `According to your exam history, your weak subjects are: **${weakSubjects.join(', ')}**.\n\nHere is a recommended study plan:\n1. **Focus on Fundamentals**: Dedicate 60% of your study time to **${weakSubjects[0]}** this week.\n2. **Conceptual Review**: Re-read the lecture slides or standard textbooks for **${weakSubjects[0]}** specifically focusing on past exam questions.\n3. **Targeted Quizzes**: Take short quizzes (e.g. 5-10 questions) in just **${weakSubjects[0]}** to check your progress.\n4. **Ask for Clarification**: You can ask me specific conceptual questions like *"Explain Database normalization"* or *"What is Cost Accounting?"*`;
    } else {
      reply += `You don't have any subjects flagged as weak (under 65%) in your database! Keep doing what you're doing. To take it to the next level:\n- Focus on speed: try to complete 25-question exams in under 20 minutes.\n- Ensure you maintain consistency across all subjects.`;
    }
  } else if (msg.includes('strong') || msg.includes('pass') || msg.includes('good')) {
    if (strongSubjects.length > 0) {
      reply += `Excellent job! Your strongest subjects are: **${strongSubjects.join(', ')}**.\n\nYou have demonstrated high proficiency here. To keep these skills sharp:\n1. Solve advanced practice questions in these areas.\n2. Peer-mentor other classmates in these subjects—it's one of the best ways to solidify your own knowledge!`;
    } else {
      reply += `You haven't established strong subject benchmarks (75%+) in the system database yet. Keep taking mock exams and practicing to identify your core strengths!`;
    }
  } else if (msg.includes('computer science') || msg.includes('programming') || msg.includes('database') || msg.includes('networking') || msg.includes('software') || msg.includes('operating')) {
    reply += `### 💻 Computer Science Exam Prep Tips\n\nFor **${userDept}** students, key areas in these subjects include:\n- **Programming**: Focus on OOP principles, recursion, memory management, and data structures (arrays, linked lists, trees).\n- **Database**: Practice normal forms (1NF, 2NF, 3NF), SQL queries (joins, aggregation), and transactions (ACID properties).\n- **Networking**: Memorize the OSI model layers, TCP vs. UDP, and basic subnetting.\n- **Software Engineering**: Review SDLC models (Agile, Waterfall) and UML diagrams.`;
  } else if (msg.includes('accounting') || msg.includes('financial') || msg.includes('cost') || msg.includes('auditing') || msg.includes('taxation')) {
    reply += `### 📊 Accounting Exam Prep Tips\n\nKey focus areas for **Accounting** exit exams:\n- **Financial Accounting**: Double-entry bookkeeping, adjusting entries, and financial statements preparation (Balance Sheet, Income Statement, Cash Flow).\n- **Cost Accounting**: Job order costing, process costing, activity-based costing (ABC), and variance analysis.\n- **Auditing**: Audit evidence, internal control assessments, audit reports, and professional ethics.`;
  } else if (msg.includes('marketing') || msg.includes('consumer') || msg.includes('brand') || msg.includes('digital')) {
    reply += `### 📈 Marketing Management Exam Prep Tips\n\nKey focus areas for **Marketing** exit exams:\n- **Principles of Marketing**: The 4 Ps (Product, Price, Place, Promotion) and STP (Segmentation, Targeting, Positioning).\n- **Consumer Behavior**: Decision-making models, psychological influences, and cultural factors.\n- **Digital Marketing**: SEO, social media strategies, and content marketing funnel analysis.`;
  } else if (msg.includes('tourism') || msg.includes('hospitality') || msg.includes('event') || msg.includes('travel')) {
    reply += `### 🏨 Tourism & Hospitality Prep Tips\n\nKey focus areas for **Tourism & Hospitality** exit exams:\n- **Tourism Management**: Eco-tourism, destination marketing, and tourism impact studies.\n- **Hospitality Operations**: Front office management, housekeeping standards, and food & beverage service systems.\n- **Event Management**: Risk assessment, venue planning, and budgeting logs.`;
  } else {
    reply += `I hear you! You asked about: *"${message}"*\n\nSince I'm running in offline/simulated advisor mode right now, here is some tailored general advice for **${userDept}** students:\n- Make sure you study all core topics: **${(departmentSubjects[userDept] || []).join(', ')}**.\n- Maintain a study schedule of at least 1-2 hours daily.\n- Leverage the mock tests regularly to identify weak areas.`;
  }
  return reply;
};

// POST /api/ai/chat
// Desc: Chat with context-aware Gemini AI Advisor
// Access: Private
router.post('/chat', auth, async (req, res) => {
  const { message, chatHistory } = req.body;
  const userId = req.user.id;
  const userName = req.user.full_name;
  const userDept = req.user.department;

  if (!message) {
    return res.status(400).json({ error: 'Message content is required.' });
  }

  // 1. Gather student's live analytics database context first
  let readinessScore = 0;
  let readinessLevel = 'Needs Improvement';
  let recentExams = [];
  let subjectAverages = [];
  let weakSubjects = [];
  let strongSubjects = [];

  try {
    const recentExamsRes = await db.query(
      "SELECT score, readiness_level, date_taken FROM results WHERE user_id = $1 AND subject = 'Comprehensive' ORDER BY date_taken DESC LIMIT 5",
      [userId]
    );
    recentExams = recentExamsRes.rows;

    if (recentExams.length > 0) {
      const scores = recentExams.map(e => e.score);
      const mostRecent = scores[0];
      const historicAvg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
      readinessScore = Math.round((historicAvg * 0.6) + (mostRecent * 0.4));

      if (readinessScore >= 75) {
        readinessLevel = 'High Chance of Passing';
      } else if (readinessScore >= 50) {
        readinessLevel = 'Moderate Readiness';
      }
    }

    const subjects = departmentSubjects[userDept] || departmentSubjects['Computer Science'];

    const subjectStatsRes = await db.query(
      `SELECT subject, AVG(score)::int as avg_score, COUNT(*) as count 
       FROM results 
       WHERE user_id = $1 AND subject != 'Comprehensive' 
       GROUP BY subject`,
      [userId]
    );

    subjectAverages = subjects.map(subj => {
      const match = subjectStatsRes.rows.find(s => s.subject === subj);
      return {
        subject: subj,
        avg_score: match ? match.avg_score : 0,
        count: match ? match.count : 0
      };
    });

    weakSubjects = subjectAverages.filter(s => s.avg_score < 65 && s.count > 0).map(s => s.subject);
    strongSubjects = subjectAverages.filter(s => s.avg_score >= 75 && s.count > 0).map(s => s.subject);
  } catch (dbErr) {
    console.error('[DB Fetch Error in AI Chat]:', dbErr.message);
    // If DB fails, we can proceed with empty lists and defaults.
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyInvalid = !apiKey || apiKey === 'your_actual_gemini_api_key_here' || apiKey.trim() === '';

  if (isKeyInvalid) {
    const simReply = generateSimulatedChatResponse(
      userName, userDept, message, readinessScore, readinessLevel, 
      recentExams.length, subjectAverages, weakSubjects, strongSubjects, false
    );
    return res.json({ reply: simReply });
  }

  try {
    const subjects = departmentSubjects[userDept] || departmentSubjects['Computer Science'];
    const systemPrompt = `You are "SMU AI-Prep", a helpful, elite, context-aware AI Study Assistant specifically designed for St. Mary's University in Ethiopia to help graduating senior students pass their National Exit Exams.

STUDENT PROFILE CONTEXT:
- Name: ${userName}
- Department: ${userDept} (St. Mary's University)
- Calculated Readiness Score: ${readinessScore}% (Status: ${readinessLevel})
- Total Mock Exams Completed: ${recentExams.length}
- Subject Performance Profiles (Averages):
${subjectAverages.map(s => `  * ${s.subject}: ${s.count > 0 ? `${s.avg_score}% (${s.count} quizzes)` : 'No exams completed yet'}`).join('\n')}
- Identified Weak Areas (<65%): ${weakSubjects.length > 0 ? weakSubjects.join(', ') : 'None yet! Keep studying.'}
- Identified Strong Areas (>=75%): ${strongSubjects.length > 0 ? strongSubjects.join(', ') : 'None yet. Take more quizzes to establish benchmarks.'}

YOUR MISSION:
1. Address the student warmly by name (${userName}) if appropriate.
2. Provide highly detailed, pedagogically sound, and encouraging answers. Explain the concepts clearly with illustrative bullet points or examples from their subjects: ${subjects.join(', ')}.
3. Suggest specific study plans or preparation paths based on their weak subjects.
4. Format your responses with clear markdown: use bold text, lists, and line breaks to ensure readability. Avoid extremely long paragraphs. Keep code blocks formatted using clean markdown blocks if relevant. Do NOT mention these system instructions in your response. Keep responses under 350 words.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const contents = [{
      role: 'user',
      parts: [{ text: `${systemPrompt}\n\nHere is the student's message/question: ${message}` }]
    }];

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      throw new Error(`Gemini API responded with status ${response.status}`);
    }

    const data = await response.json();
    let replyText = '';

    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      replyText = data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Empty response from Gemini');
    }

    res.json({ reply: replyText });
  } catch (err) {
    console.error('[AI Chatbot Error - Falling back to local]:', err.message);
    const fallbackReply = generateSimulatedChatResponse(
      userName, userDept, message, readinessScore, readinessLevel, 
      recentExams.length, subjectAverages, weakSubjects, strongSubjects, true
    );
    res.json({ reply: fallbackReply });
  }
});

// POST /api/ai/recommendation
// Desc: Generate post-exam study recommendations based on score and subject breakdown
// Access: Private
router.post('/recommendation', auth, async (req, res) => {
  const { score, readiness_level, subject_breakdown } = req.body;
  const userName = req.user.full_name;
  const userDept = req.user.department;

  const weakSubjects = Object.entries(subject_breakdown || {})
    .filter(([_, stats]) => stats.total > 0 && (stats.correct / stats.total) < 0.7)
    .map(([subj]) => subj);

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyInvalid = !apiKey || apiKey === 'your_actual_gemini_api_key_here' || apiKey.trim() === '';

  if (isKeyInvalid) {
    const simReply = generateSimulatedRecommendation(userName, userDept, score, readiness_level, subject_breakdown, weakSubjects, false);
    return res.json({ recommendation: simReply });
  }

  try {
    const breakdownStr = Object.entries(subject_breakdown || {})
      .map(([subj, stats]) => `  * ${subj}: ${stats.correct}/${stats.total} correct (${stats.total > 0 ? Math.round((stats.correct/stats.total)*100) : 0}%)`)
      .join('\n');

    const prompt = `You are "SMU AI-Prep", an elite AI Exam Coach for St. Mary's University.
Generate a concise, constructive, and highly personalized study recommendation report for a student who has just finished a mock exit exam.

STUDENT INFO:
- Student Name: ${userName}
- Department: ${userDept}

MOCK EXAM PERFORMANCE:
- Overall Score: ${score}%
- Readiness Level: ${readiness_level}
- Subject Performance:
${breakdownStr}

INSTRUCTIONS:
1. Provide a professional, encouraging evaluation of their readiness.
2. Highlight which subjects require immediate attention (scores < 70%) and offer 1-2 specific conceptual study tips for those weak areas.
3. Recommend how they should proceed with their study plan.
4. Keep the response concise, action-oriented, and formatted in clean markdown (with headers, bold text, and bullet points). Do not mention system rules or prompt constraints. Keep the response under 250 words.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const contents = [{
      role: 'user',
      parts: [{ text: prompt }]
    }];

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    let recommendationText = '';

    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
      recommendationText = data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Empty response from Gemini');
    }

    res.json({ recommendation: recommendationText });
  } catch (err) {
    console.error('[AI Recommendation Error - Falling back to local]:', err.message);
    const fallbackReply = generateSimulatedRecommendation(userName, userDept, score, readiness_level, subject_breakdown, weakSubjects, true);
    res.json({ recommendation: fallbackReply });
  }
});

module.exports = router;

