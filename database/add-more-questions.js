const db = require('../config/db');

const additionalQuestions = [
  // Computer Science - Additional questions
  { q: 'What is encapsulation in OOP?', a: 'Bundling data and methods together while hiding internal details', s: 'Programming', d: 'Computer Science' },
  { q: 'Define abstraction in programming', a: 'Hiding complex implementation details behind simple interface', s: 'Programming', d: 'Computer Science' },
  { q: 'What is a linked list?', a: 'Data structure where elements are linked via pointers', s: 'Programming', d: 'Computer Science' },
  { q: 'Explain binary tree traversal', a: 'Methods to visit all nodes in a binary tree', s: 'Programming', d: 'Computer Science' },
  { q: 'What is hashing?', a: 'Converting input to fixed-size string using hash function', s: 'Programming', d: 'Computer Science' },
  { q: 'Define exception handling', a: 'Mechanism to handle runtime errors gracefully', s: 'Programming', d: 'Computer Science' },
  { q: 'What is a constructor?', a: 'Special method for initializing object properties', s: 'Programming', d: 'Computer Science' },
  { q: 'Explain garbage collection', a: 'Automatic memory management removing unused objects', s: 'Programming', d: 'Computer Science' },
  { q: 'What is type casting?', a: 'Converting one data type to another', s: 'Programming', d: 'Computer Science' },
  { q: 'Define a destructor', a: 'Method called when object is destroyed or deleted', s: 'Programming', d: 'Computer Science' },

  // Database - Additional questions
  { q: 'What is a primary key?', a: 'Unique identifier for each record in a table', s: 'Database', d: 'Computer Science' },
  { q: 'Define a trigger in database', a: 'Procedure that executes in response to specific events', s: 'Database', d: 'Computer Science' },
  { q: 'What is database sharding?', a: 'Horizontal partitioning of data across multiple servers', s: 'Database', d: 'Computer Science' },
  { q: 'Explain cardinality in databases', a: 'Number of distinct values in a column', s: 'Database', d: 'Computer Science' },
  { q: 'What is data integrity?', a: 'Ensuring data accuracy and consistency', s: 'Database', d: 'Computer Science' },
  { q: 'Define database clustering', a: 'Grouping similar data together for performance', s: 'Database', d: 'Computer Science' },
  { q: 'What is a cursor?', a: 'Mechanism to iterate through result set', s: 'Database', d: 'Computer Science' },
  { q: 'Explain normalization levels', a: 'Progressive standardization of database structure', s: 'Database', d: 'Computer Science' },
  { q: 'What is eventual consistency?', a: 'Data consistency achieved after propagation delay', s: 'Database', d: 'Computer Science' },
  { q: 'Define CRUD operations', a: 'Create, Read, Update, Delete operations', s: 'Database', d: 'Computer Science' },

  // Networking - Additional questions
  { q: 'What is a router?', a: 'Device that directs data packets between networks', s: 'Networking', d: 'Computer Science' },
  { q: 'Define packet fragmentation', a: 'Breaking packets into smaller units for transmission', s: 'Networking', d: 'Computer Science' },
  { q: 'What is network topology?', a: 'Physical or logical arrangement of network devices', s: 'Networking', d: 'Computer Science' },
  { q: 'Explain collision detection', a: 'Mechanism to identify simultaneous transmissions', s: 'Networking', d: 'Computer Science' },
  { q: 'What is a gateway?', a: 'Device connecting networks with different protocols', s: 'Networking', d: 'Computer Science' },
  { q: 'Define network bandwidth', a: 'Maximum data transfer rate of network connection', s: 'Networking', d: 'Computer Science' },
  { q: 'What is congestion control?', a: 'Techniques to manage network traffic flow', s: 'Networking', d: 'Computer Science' },
  { q: 'Explain QoS in networking', a: 'Quality of Service ensuring performance standards', s: 'Networking', d: 'Computer Science' },
  { q: 'What is IP spoofing?', a: 'Falsifying IP address to hide sender identity', s: 'Networking', d: 'Computer Science' },
  { q: 'Define MIME types', a: 'Standards for specifying file content types', s: 'Networking', d: 'Computer Science' },

  // Software Engineering - Additional
  { q: 'What is SOLID principles?', a: 'Five design principles for maintainable software', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'Define DevOps', a: 'Integration of development and operations practices', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'What is pair programming?', a: 'Two programmers working together at one workstation', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'Explain code smell', a: 'Surface-level symptom indicating deeper code problems', s: 'Software Engineering', d: 'Computer Science' },
  { q: 'What is API documentation?', a: 'Description of API functionality and usage', s: 'Software Engineering', d: 'Computer Science' },

  // Operating Systems - Additional
  { q: 'What is CPU scheduling?', a: 'Deciding which process gets CPU time', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'Define thrashing in OS', a: 'Excessive page swapping reducing performance', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'What is a mutex?', a: 'Synchronization object preventing simultaneous access', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'Explain demand paging', a: 'Loading pages into memory only when needed', s: 'Operating Systems', d: 'Computer Science' },
  { q: 'What is starvation in OS?', a: 'Process indefinitely denied required resources', s: 'Operating Systems', d: 'Computer Science' },

  // Accounting - Additional
  { q: 'What is an income statement?', a: 'Financial statement showing profit and loss', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Define working capital', a: 'Current assets minus current liabilities', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'What is accounts payable?', a: 'Amount owed to suppliers for goods/services', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Explain amortization', a: 'Gradual reduction of intangible asset value', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'What is equity?', a: 'Ownership stake or net worth of business', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Define liabilities', a: 'Obligations or debts owed by business', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'What is a trial balance?', a: 'List of accounts with debit and credit balances', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Explain journal entries', a: 'Recording transactions in accounting journal', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'What is reconciliation?', a: 'Comparing records to verify accuracy', s: 'Financial Accounting', d: 'Accounting' },
  { q: 'Define solvency', a: 'Ability to meet long-term financial obligations', s: 'Financial Accounting', d: 'Accounting' },

  // Cost Accounting - Additional
  { q: 'What is marginal cost?', a: 'Cost of producing one additional unit', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Define absorption costing', a: 'Allocating fixed and variable costs to products', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'What is relevant cost?', a: 'Future cost affected by decision', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Explain sunk cost', a: 'Past cost that cannot be changed by decisions', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'What is throughput accounting?', a: 'Emphasizing production constraints', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Define prime cost', a: 'Direct materials plus direct labor', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'What is conversion cost?', a: 'Direct labor plus manufacturing overhead', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Explain budget variance', a: 'Difference between budgeted and actual amounts', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'What is cost driver?', a: 'Factor causing changes in activity costs', s: 'Cost Accounting', d: 'Accounting' },
  { q: 'Define incremental cost', a: 'Additional cost from pursuing alternative action', s: 'Cost Accounting', d: 'Accounting' },

  // Marketing - Additional
  { q: 'What is consumer behavior?', a: 'Study of why and how people buy products', s: 'Consumer Behavior', d: 'Marketing Management' },
  { q: 'Define brand awareness', a: 'Extent to which consumers recognize brand', s: 'Brand Management', d: 'Marketing Management' },
  { q: 'What is digital marketing?', a: 'Marketing using digital channels and platforms', s: 'Digital Marketing', d: 'Marketing Management' },
  { q: 'Explain customer retention', a: 'Strategies to keep existing customers loyal', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'What is market research?', a: 'Systematic study of market and consumer needs', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'Define pricing strategy', a: 'Methods for setting product prices', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'What is distribution channel?', a: 'Path product takes from producer to consumer', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'Explain brand equity', a: 'Value added by brand name to product', s: 'Brand Management', d: 'Marketing Management' },
  { q: 'What is promotional pricing?', a: 'Temporary price reduction to increase sales', s: 'Principles of Marketing', d: 'Marketing Management' },
  { q: 'Define market share', a: 'Percentage of total market sales captured', s: 'Principles of Marketing', d: 'Marketing Management' },

  // Tourism - Additional
  { q: 'What is cultural tourism?', a: 'Travel motivated by cultural interests', s: 'Tourism Management', d: 'Tourism & Hospitality' },
  { q: 'Define ecotourism', a: 'Responsible travel to natural areas', s: 'Sustainable Tourism', d: 'Tourism & Hospitality' },
  { q: 'What is hotel management?', a: 'Operations of hotel facilities and services', s: 'Hospitality Operations', d: 'Tourism & Hospitality' },
  { q: 'Explain tour guiding', a: 'Leading tourists through destinations', s: 'Travel Agency Operations', d: 'Tourism & Hospitality' },
  { q: 'What is convention management?', a: 'Planning and organizing large meetings', s: 'Event Management', d: 'Tourism & Hospitality' },
  { q: 'Define front office', a: 'Guest-facing operations in hospitality', s: 'Hospitality Operations', d: 'Tourism & Hospitality' },
  { q: 'What is back office?', a: 'Administrative operations not visible to guests', s: 'Hospitality Operations', d: 'Tourism & Hospitality' },
  { q: 'Explain yield management', a: 'Optimizing revenue through pricing and inventory', s: 'Tourism Management', d: 'Tourism & Hospitality' },
  { q: 'What is tourism industry?', a: 'Sector providing travel and hospitality services', s: 'Tourism Management', d: 'Tourism & Hospitality' },
  { q: 'Define travel documentation', a: 'Passports, visas, and travel permits', s: 'Travel Agency Operations', d: 'Tourism & Hospitality' },
];

(async () => {
  try {
    for (const q of additionalQuestions) {
      await db.query(
        'INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject, department) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [q.q, q.a, 'Option B', 'Option C', 'Option D', 'A', q.s, q.d]
      );
    }
    console.log('Added ' + additionalQuestions.length + ' more questions');

    const result = await db.query('SELECT COUNT(*) as total FROM questions');
    console.log('Total questions now:', result.rows[0].total);
    const byDept = await db.query('SELECT department, COUNT(*) as count FROM questions GROUP BY department ORDER BY count DESC');
    console.log('By department:', byDept.rows);
    process.exit(0);
  } catch(err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
