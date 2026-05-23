const express = require('express');
const router = express.Router();
const db = require('../config/db');
const auth = require('../middleware/auth');

// Helper to determine recommendations based on subjects across all departments
const SUBJECT_DETAILS = {
  // Computer Science
  'Programming': {
    topics: ['Object-Oriented Design', 'Recursion & Stack depth', 'Binary Search Trees', 'Static vs Instance Methods', 'Data Structures (Stack/Queue)'],
    aiTip: 'Focus on practicing recursion base cases and memory layouts for static members. Re-read OOP inheritance rules.'
  },
  'Database': {
    topics: ['SQL Left/Right Outer Joins', '2nd Normal Form (2NF)', 'ACID Transaction properties', 'Database Indexing mechanisms', 'HAVING clause filters'],
    aiTip: 'Your SQL join syntax is correct, but you need to focus on normalization dependencies and how B-Trees improve query indexing.'
  },
  'Networking': {
    topics: ['OSI Model Layer Functions', 'Subnet Masking (CIDR calculations)', 'TCP vs UDP handshake protocols', 'DHCP/DNS client configuration', 'Secure HTTPS port mappings'],
    aiTip: 'Try calculating subnets by converting IP addresses to binary. Remember that Layer 3 handles packet routing while Layer 4 manages flow control.'
  },
  'Software Engineering': {
    topics: ['Agile Scrum Daily Standup goals', 'Singleton Design Patterns', 'Black-Box vs White-Box verification', 'UML Class Diagram links', 'Continuous Integration (CI) systems'],
    aiTip: 'Review the structural difference between Singleton and Factory patterns. Memorize the difference between black-box and white-box test access.'
  },
  'Operating Systems': {
    topics: ['Process Deadlock conditions', 'Shortest Job First scheduling', 'Virtual Memory disk swapping', 'Process vs Thread memory spaces', 'Least Recently Used (LRU) paging'],
    aiTip: 'Recall that threads share the same process heap but have separate stacks. Study the four Coffman conditions for deadlocks.'
  },

  // Accounting
  'Financial Accounting': {
    topics: ['Accounting Equation details', 'Accrual Basis vs Cash Basis', 'Balance Sheet accounts', 'Adjusting Entries matching principle', 'Accounting Equation effects'],
    aiTip: 'Make sure you master matching principle concepts for adjusting entries. Review debit/credit rules for owner\'s equity.'
  },
  'Cost Accounting': {
    topics: ['Prime Costs identification', 'Fixed vs Variable Costs behavior', 'Break-Even Point formulas', 'Job-Order vs Process Costing systems', 'Contribution Margin Ratio'],
    aiTip: 'Study the difference between Job-Order and Process Costing systems. Practice break-even math under varying sales mixes.'
  },
  'Auditing': {
    topics: ['Independent External Audits goals', 'Unqualified vs Qualified audit opinions', 'Professional Skepticism expectations', 'Audit Risk model parameters', 'Recalculation and confirmation steps'],
    aiTip: 'Learn the exact triggers for Qualified, Disclaimer, and Adverse audit opinions. Always maintain a professional skepticism mindset.'
  },
  'Taxation': {
    topics: ['Tax Ability-to-Pay principles', 'Tax Avoidance vs Tax Evasion legality', 'Regressive vs Progressive tax features', 'Form W-2 reporting schedules', 'Double Taxation corporate payouts'],
    aiTip: 'Review corporate dividend taxation mechanics. Understand how regressive taxes (like sales tax) impact income brackets differently.'
  },
  'Management Accounting': {
    topics: ['Management vs Financial Accounting focus', 'Zero-Based Budgeting justifications', 'Sunk Costs exclusion in decisions', 'Material Price Variance calculations', 'Balanced Scorecard perspective tracking'],
    aiTip: 'Recall that sunk costs are never relevant for future decisions. Memorize the four core perspectives of the Balanced Scorecard.'
  },

  // Marketing Management
  'Principles of Marketing': {
    topics: ['Marketing Mix 4 Ps details', 'Niche vs Differentiated strategies', 'Product Life Cycle (PLC) growth stage', 'Human Needs vs Cultural Wants', 'Selling vs Marketing Concepts differences'],
    aiTip: 'Review the 4 Ps of marketing and make sure you understand the difference between the selling concept and the marketing concept.'
  },
  'Consumer Behavior': {
    topics: ['Consumer Decision-Making stages', 'Psychological motivation factors', 'Cognitive Dissonance triggers', 'Maslow\'s Hierarchy of Needs esteem levels', 'Reference Group comparative impact'],
    aiTip: 'Recall how reference groups influence customer choices. Study the primary causes and cures for post-purchase cognitive dissonance.'
  },
  'Brand Management': {
    topics: ['Brand Equity customer value details', 'Line vs Brand Extensions mapping', 'Brand Marks visual identities', 'Brand Positioning strategies', 'Brand Loyalty development cycles'],
    aiTip: 'Focus on differentiation techniques for brand positioning. Understand when to leverage brand extensions versus multi-branding.'
  },
  'Services Marketing': {
    topics: ['Service Intangibility characteristics', 'Service Heterogeneity variability sources', 'Interactive Marketing definitions', 'SERVQUAL model evaluation dimensions', 'Service Perishability inventory limits'],
    aiTip: 'Recall the 4 unique characteristics of services (IHIP). Memorize the 5 dimensions measured by the SERVQUAL model.'
  },
  'Digital Marketing': {
    topics: ['Organic vs Paid search mechanics', 'Click-Through Rate (CTR) calculations', 'Retargeting cookie tracking setups', 'Conversion Rate optimization targets', 'Email Marketing automated lists'],
    aiTip: 'Understand SEO ranking factors and retargeting mechanics. Remember that Click-Through Rate is clicks divided by impressions.'
  },

  // Tourism & Hospitality
  'Tourism Management': {
    topics: ['Tourism Product components', 'Inbound vs Outbound tourism definitions', 'Carrying Capacity caps', 'Ecotourism conservation rules', 'UNWTO UN standard agencies'],
    aiTip: 'Study the difference between inbound and outbound tourists. Master carrying capacity calculations for fragile ecotourism zones.'
  },
  'Hospitality Operations': {
    topics: ['Overbooking calculations', 'Revenue Per Available Room (RevPAR) indices', 'Housekeeping sanitation processes', 'Mise en Place kitchen guidelines', 'Early Arrival reception guidelines'],
    aiTip: 'Practice calculating RevPAR using room occupancy and average daily rates. Memorize the steps for handling premature guest check-ins.'
  },
  'Event Management': {
    topics: ['Meetings, Incentives, Conferences, Exhibitions (MICE) sector', 'Site Inspections assessments', 'Request for Proposal (RFP) structures', 'Gantt Chart critical paths', 'Run Sheet day-of-event schedules'],
    aiTip: 'Learn how to use Gantt charts for event timelines. Remember that run sheets are highly granular, minute-by-minute schedules.'
  },
  'Travel Agency Operations': {
    topics: ['Online Travel Agencies (OTAs) systems', 'Global Distribution Systems (GDS) networks', 'Familiarization (FAM) Trip educational guides', 'Travel Vouchers documents', 'IATA flight ticketers'],
    aiTip: 'Review how Global Distribution Systems (like Amadeus or Sabre) power travel agencies. Study travel voucher ticketing paths.'
  },
  'Sustainable Tourism': {
    topics: ['Sustainable Tourism core goals', 'Cultural Commercialization impacts', 'Carbon Offsetting options', 'Economic Leakage calculations', 'Triple Bottom Line (People, Planet, Profit) pillars'],
    aiTip: 'Focus on the economic leakage formula in local tourism markets. Memorize the three pillars of the Triple Bottom Line framework.'
  }
};

const departmentSubjects = {
  'Computer Science': ['Programming', 'Database', 'Networking', 'Software Engineering', 'Operating Systems'],
  'Accounting': ['Financial Accounting', 'Cost Accounting', 'Auditing', 'Taxation', 'Management Accounting'],
  'Marketing Management': ['Principles of Marketing', 'Consumer Behavior', 'Brand Management', 'Services Marketing', 'Digital Marketing'],
  'Tourism & Hospitality': ['Tourism Management', 'Hospitality Operations', 'Event Management', 'Travel Agency Operations', 'Sustainable Tourism']
};

// @route   GET /api/dashboard/stats
// @desc    Get aggregated stats, recommendations, gamification, and predictions
// @access  Private
router.get('/stats', auth, async (req, res) => {
  const userId = req.user.id;
  const userName = req.user.full_name;
  const userDept = req.user.department || 'Computer Science';

  try {
    // 1. Get recent comprehensive exams
    const recentExamsRes = await db.query(
      "SELECT id, score, readiness_level, date_taken FROM results WHERE user_id = $1 AND subject = 'Comprehensive' ORDER BY date_taken DESC LIMIT 5",
      [userId]
    );
    const recentExams = recentExamsRes.rows;

    // 2. Calculate Readiness Score
    let readinessScore = 0;
    let readinessLevel = 'Needs Improvement';
    
    if (recentExams.length > 0) {
      // If they have taken exams: Weighted average of the last 3 exams (60% historic avg, 40% most recent)
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

    // 3. Get subject averages
    const subjectStatsRes = await db.query(
      `SELECT subject, AVG(score)::int as avg_score, COUNT(*) as count 
       FROM results 
       WHERE user_id = $1 AND subject != 'Comprehensive' 
       GROUP BY subject`,
      [userId]
    );
    
    const subjectStats = subjectStatsRes.rows;
    
    // Make sure we have entries for all 5 subjects of the student's department, default to 0 if no tests yet
    const subjects = departmentSubjects[userDept] || departmentSubjects['Computer Science'];
    const subjectAverages = subjects.map(subj => {
      const match = subjectStats.find(s => s.subject === subj);
      return {
        subject: subj,
        avg_score: match ? match.avg_score : 0,
        count: match ? match.count : 0
      };
    });

    // 4. Determine Weak and Strong Subjects
    let weakSubjects = [];
    let strongSubjects = [];
    
    if (subjectStats.length > 0) {
      // Sort subjects by average score
      const sortedSubjects = [...subjectAverages].sort((a, b) => a.avg_score - b.avg_score);
      
      weakSubjects = sortedSubjects.filter(s => s.avg_score < 65 && s.count > 0).map(s => s.subject);
      strongSubjects = sortedSubjects.filter(s => s.avg_score >= 75 && s.count > 0).map(s => s.subject);

      // Fallbacks if no subject scores meet the threshold but they have taken tests
      if (weakSubjects.length === 0 && sortedSubjects[0].avg_score > 0) {
        weakSubjects.push(sortedSubjects[0].subject);
      }
      if (strongSubjects.length === 0 && sortedSubjects[sortedSubjects.length - 1].avg_score > 0) {
        strongSubjects.push(sortedSubjects[sortedSubjects.length - 1].subject);
      }
    }

    // 5. Generate Recommended Topics
    let recommendedTopics = [];
    // If they have weak subjects, recommend topics from there
    if (weakSubjects.length > 0) {
      weakSubjects.forEach(sub => {
        if (SUBJECT_DETAILS[sub]) {
          recommendedTopics = recommendedTopics.concat(SUBJECT_DETAILS[sub].topics.slice(0, 2));
        }
      });
    } else {
      // Default general recommendations if they haven't taken exams or have no weak subjects
      if (userDept === 'Accounting') {
        recommendedTopics = ['Basic Accounting Equation', 'Balance Sheets', 'Taxation vs Evasion'];
      } else if (userDept === 'Marketing Management') {
        recommendedTopics = ['Marketing Mix 4 Ps', 'Consumer Motivation', 'Brand Equity'];
      } else if (userDept === 'Tourism & Hospitality') {
        recommendedTopics = ['Tourism Products', 'Hotel Overbooking', 'Triple Bottom Line'];
      } else {
        recommendedTopics = ['SQL Joins & Indexes', 'OS Scheduling Algorithms', 'TCP/UDP Protocols'];
      }
    }

    // 6. Calculate Streak Count (Consecutive days of taking mock exams)
    const datesRes = await db.query(
      `SELECT DISTINCT date_trunc('day', date_taken) as day 
       FROM results 
       WHERE user_id = $1 
       ORDER BY day DESC`,
      [userId]
    );

    let streak = 0;
    if (datesRes.rows.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const examDates = datesRes.rows.map(r => new Date(r.day).getTime());
      
      const checkDate = new Date(datesRes.rows[0].day);
      checkDate.setHours(0, 0, 0, 0);

      // The streak is active if the most recent exam is today or yesterday
      if (checkDate.getTime() === today.getTime() || checkDate.getTime() === yesterday.getTime()) {
        streak = 1;
        let expectedTime = checkDate.getTime();

        for (let i = 1; i < examDates.length; i++) {
          expectedTime -= 24 * 60 * 60 * 1000; // subtract 1 day in ms
          const actualTime = new Date(examDates[i]).getTime();

          if (actualTime === expectedTime) {
            streak++;
          } else {
            break;
          }
        }
      }
    }

    // 7. Check Badges/Gamification Achievements
    const badges = [];
    const totalExams = recentExams.length;

    if (totalExams > 0) {
      badges.push({
        id: 'starter',
        name: 'First Step',
        description: 'Completed your first comprehensive mock exam.',
        icon: '🚀',
        unlocked: true
      });
    } else {
      badges.push({
        id: 'starter',
        name: 'First Step',
        description: 'Complete your first comprehensive mock exam.',
        icon: '🚀',
        unlocked: false
      });
    }

    // Subject mastery badges (score >= 85% on any subject exam)
    const hasMasteryRes = await db.query(
      "SELECT EXISTS(SELECT 1 FROM results WHERE user_id = $1 AND score >= 85 AND subject != 'Comprehensive')",
      [userId]
    );
    const hasMastery = hasMasteryRes.rows[0].exists;
    badges.push({
      id: 'mastery',
      name: 'Subject Master',
      description: 'Score 85% or higher on any subject topic.',
      icon: '🏆',
      unlocked: hasMastery
    });

    // Streak badge (3+ days)
    badges.push({
      id: 'streak_warrior',
      name: 'Consistent Scholar',
      description: 'Maintain a study streak of 3 or more consecutive days.',
      icon: '🔥',
      unlocked: streak >= 3
    });

    // Readiness milestone (Readiness Score >= 80)
    badges.push({
      id: 'ready_to_conquer',
      name: 'Exit Exam Ready',
      description: 'Attain a calculated Readiness Score of 80% or more.',
      icon: '👑',
      unlocked: readinessScore >= 80
    });

    // 8. Generate Dynamic AI recommendations & Assistant Text
    let aiSpeech = '';
    if (totalExams === 0) {
      aiSpeech = `Welcome, ${userName}! I am your AI Study Assistant. To get started and generate your personalized readiness prediction, please take your first diagnostic Mock Exit Exam.`;
    } else {
      const weakestSubjectName = weakSubjects[0] || 'none';
      const strongestSubjectName = strongSubjects[0] || 'none';
      
      let subjectAdvice = '';
      if (weakestSubjectName !== 'none') {
        subjectAdvice = ` I noticed that ${weakestSubjectName} is your lowest performing area. ${SUBJECT_DETAILS[weakestSubjectName]?.aiTip || ''}`;
      } else {
        subjectAdvice = ` Incredible work! You do not have any weak subjects below 65%. Continue reviewing to maintain your high performance.`;
      }

      let strengthCongrat = '';
      if (strongestSubjectName !== 'none') {
        strengthCongrat = ` You are demonstrating excellent grasp of ${strongestSubjectName} concepts.`;
      }

      aiSpeech = `Hello ${userName}, based on your performance over ${totalExams} mock exam(s), your current Readiness Score is ${readinessScore}%. This indicates a **${readinessLevel}** status.${strengthCongrat}${subjectAdvice}`;
    }

    // 9. Simulated Time Spent Analysis (weekly chart values)
    const baseTime = 10; // base reading time
    const examTime = 30; // 30 mins per exam
    const mockWeeklyTime = [
      baseTime + (totalExams > 4 ? examTime : 0), // Mon
      baseTime + (totalExams > 3 ? examTime : 0) + 5, // Tue
      baseTime + (totalExams > 2 ? examTime : 0) + 15, // Wed
      baseTime + (totalExams > 1 ? examTime : 0) + 10, // Thu
      baseTime + (totalExams > 0 ? examTime : 0) + 20, // Fri
      baseTime + 5, // Sat
      baseTime // Sun
    ];

    res.json({
      readiness_score: readinessScore,
      readiness_level: readinessLevel,
      weak_subjects: weakSubjects,
      strong_subjects: strongSubjects,
      recommended_topics: recommendedTopics,
      recent_exams: recentExams,
      subject_averages: subjectAverages,
      streak_count: streak,
      badges: badges,
      ai_assistant_text: aiSpeech,
      weekly_time_spent: mockWeeklyTime
    });

  } catch (err) {
    console.error('Error generating dashboard stats:', err.message);
    res.status(500).json({ error: 'Server error while compiling dashboard analytics.' });
  }
});

module.exports = router;
