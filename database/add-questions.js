const db = require('../config/db');

const moreQuestions = [
  // Software Engineering Questions
  { q: 'What is version control?', a: 'System for tracking and managing changes to code over time', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'Define continuous integration', a: 'Automatically testing and merging code changes frequently', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'What is a code review?', a: 'Systematic examination of code by other developers', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'Explain the waterfall development model', a: 'Sequential software development with distinct phases', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'What is technical debt?', a: 'Implied cost of future rework caused by choosing quick solutions', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'Define a software requirement specification', a: 'Detailed document describing system requirements', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'What is refactoring?', a: 'Improving code structure without changing functionality', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'Explain integration testing', a: 'Testing how multiple modules work together', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'What is regression testing?', a: 'Testing to ensure new changes do not break existing functionality', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'Define API in software development', a: 'Application Programming Interface for software communication', s: 'Software Engineering', d: 'Computer Science' },

  // Operating Systems
  { q: 'What is a process in an operating system?', a: 'A program in execution with its own memory and resources', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'What is virtual memory?', a: 'Using disk space as extension of RAM', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'Explain deadlock in OS', a: 'Situation where processes wait for each other indefinitely', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'What is a thread?', a: 'Lightweight unit of execution within a process', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'Define scheduling in operating systems', a: 'Allocating CPU time to different processes', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'What is a semaphore?', a: 'Synchronization mechanism for controlling resource access', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'Explain paging in memory management', a: 'Dividing memory into fixed-size blocks called pages', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'What is a context switch?', a: 'Switching CPU execution from one process to another', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'Define interrupt handling', a: 'OS response to signals requiring immediate attention', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'What is a file system?', a: 'Method for organizing and storing files on storage media', s: 'Operating Systems', d: 'Computer Science' },

  // Accounting Questions
  { q: 'What is double-entry bookkeeping?', a: 'Recording transactions with equal debits and credits', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Define assets in accounting', a: 'Resources owned by a company with economic value', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'What is a balance sheet?', a: 'Financial statement showing assets, liabilities, and equity', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Explain depreciation', a: 'Allocation of asset cost over its useful life', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'What is cash flow?', a: 'Movement of money in and out of a business', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Define revenue recognition', a: 'Accounting principle for recording income when earned', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'What is inventory valuation?', a: 'Method of assigning value to inventory items', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Explain accrual accounting', a: 'Recording transactions when they occur, not when paid', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'What is GAAP?', a: 'Generally Accepted Accounting Principles', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Define audit', a: 'Systematic review of financial records for accuracy', s: 'Financial Accounting', d: 'Accounting' },

  // Cost Accounting
  { q: 'What is cost accounting?', a: 'Accounting system for analyzing production costs', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Define fixed costs', a: 'Costs that do not vary with production volume', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'What are variable costs?', a: 'Costs that change with production volume', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Explain break-even analysis', a: 'Calculating point where revenue equals total costs', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'What is overhead allocation?', a: 'Distributing indirect costs to cost centers', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Define standard costing', a: 'Using predetermined costs for comparison with actual costs', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'What is activity-based costing?', a: 'Allocating costs based on activities consumed', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Explain job costing', a: 'Tracking costs for specific projects or jobs', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'What is process costing?', a: 'Tracking costs through production processes', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Define contribution margin', a: 'Revenue minus variable costs', s: 'Cost Accounting', d: 'Accounting' },

  // Marketing Questions
  { q: 'What is market segmentation?', a: 'Dividing market into distinct groups with similar needs', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'Define brand positioning', a: 'Creating unique brand identity in consumer minds', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'What is the marketing mix?', a: 'Four Ps: Product, Price, Place, Promotion', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'Explain SWOT analysis', a: 'Analyzing Strengths, Weaknesses, Opportunities, Threats', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'What is market penetration?', a: 'Increasing market share in existing markets', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'Define customer lifetime value', a: 'Total profit from a customer over their lifetime', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'What is market research?', a: 'Gathering information about market and customers', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'Explain value proposition', a: 'Promise of value delivered to customers', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'What is brand loyalty?', a: 'Customers repeatedly buying same brand', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'Define elasticity of demand', a: 'Sensitivity of quantity demanded to price changes', s: 'Principles of Marketing', d: 'Marketing Management' },

  // Tourism Questions
  { q: 'What is tourism management?', a: 'Managing tourism operations and business', s: 'Tourism Management', d: 'Tourism & Hospitality' },
  { q: 'Define sustainable tourism', a: 'Tourism that minimizes environmental and cultural impact', s: 'Sustainable Tourism', d: 'Tourism & Hospitality' },
  { q: 'What is event management?', a: 'Planning and organizing events', s: 'Event Management', d: 'Tourism & Hospitality' },
  { q: 'Explain hospitality operations', a: 'Management of hotels, restaurants, and service delivery', s: 'Hospitality Operations', d: 'Tourism & Hospitality' },
  { q: 'What is travel and tourism?', a: 'Service industry providing travel and accommodation', s: 'Travel Agency Operations', d: 'Tourism & Hospitality' },
  { q: 'Define customer service in hospitality', a: 'Providing excellent service to guests', s: 'Hospitality Operations', d: 'Tourism & Hospitality' },
  { q: 'What is tourism seasonality?', a: 'Variation in tourism demand by season', s: 'Tourism Management', d: 'Tourism & Hospitality' },
  { q: 'Explain destination management', a: 'Managing tourism destination development', s: 'Tourism Management', d: 'Tourism & Hospitality' },
  { q: 'What is revenue management in hospitality?', a: 'Optimizing pricing and occupancy', s: 'Hospitality Operations', d: 'Tourism & Hospitality' },
  { q: 'Define stakeholder management', a: 'Managing relationships with all interested parties', s: 'Event Management', d: 'Tourism & Hospitality' },
];

(async () => {
  try {
    for (const q of moreQuestions) {
      await db.query(
        'INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject, department) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [q.q, q.a, 'Option B', 'Option C', 'Option D', 'A', q.s, q.d]
      );
    }
    console.log('Added ' + moreQuestions.length + ' more questions');

    const result = await db.query('SELECT COUNT(*) as total FROM questions');
    console.log('Total questions now:', result.rows[0].total);
    const byDept = await db.query('SELECT department, COUNT(*) as count FROM questions GROUP BY department');
    console.log('By department:', byDept.rows);
    process.exit(0);
  } catch(err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
