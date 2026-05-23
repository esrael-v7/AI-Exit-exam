const db = require('../config/db');

const questions = [
  // ==========================================
  // COMPUTER SCIENCE (25 questions)
  // ==========================================
  // Programming (5)
  {
    question: "What is the main characteristic of Object-Oriented Programming (OOP) that allows a subclass to provide a specific implementation of a method that is already defined in its superclass?",
    option_a: "Encapsulation",
    option_b: "Method Overriding (Polymorphism)",
    option_c: "Method Overloading",
    option_d: "Inheritance",
    correct_answer: "B",
    subject: "Programming",
    department: "Computer Science"
  },
  {
    question: "Which of the following data structures operates on a Last-In, First-Out (LIFO) basis?",
    option_a: "Queue",
    option_b: "Stack",
    option_c: "Singly Linked List",
    option_d: "Binary Search Tree",
    correct_answer: "B",
    subject: "Programming",
    department: "Computer Science"
  },
  {
    question: "What will be the output of a recursive function that calculates the factorial of a number if the base case is missing?",
    option_a: "It will return 0.",
    option_b: "It will return 1.",
    option_c: "It will cause a stack overflow error (infinite recursion).",
    option_d: "It will terminate immediately with a compiler warning.",
    correct_answer: "C",
    subject: "Programming",
    department: "Computer Science"
  },
  {
    question: "What is the time complexity of searching for an element in a balanced Binary Search Tree (BST) in the worst-case scenario?",
    option_a: "O(1)",
    option_b: "O(n)",
    option_c: "O(log n)",
    option_d: "O(n log n)",
    correct_answer: "C",
    subject: "Programming",
    department: "Computer Science"
  },
  {
    question: "In Java or C++, what does the 'static' keyword indicate when applied to a class member (method or variable)?",
    option_a: "The member is immutable and cannot be changed.",
    option_b: "The member belongs to the class itself rather than instances of the class.",
    option_c: "The member is stored in the CPU cache for faster execution.",
    option_d: "The member can only be accessed within the same package/file.",
    correct_answer: "B",
    subject: "Programming",
    department: "Computer Science"
  },
  // Database (5)
  {
    question: "Which SQL join returns all records from the left table, and the matched records from the right table, filling with NULL values if there is no match?",
    option_a: "INNER JOIN",
    option_b: "RIGHT OUTER JOIN",
    option_c: "LEFT OUTER JOIN",
    option_d: "FULL OUTER JOIN",
    correct_answer: "C",
    subject: "Database",
    department: "Computer Science"
  },
  {
    question: "A relation is in which normal form if it is in 1NF and all non-key attributes are fully functionally dependent on the primary key (no partial dependencies)?",
    option_a: "Second Normal Form (2NF)",
    option_b: "Third Normal Form (3NF)",
    option_c: "Boyce-Codd Normal Form (BCNF)",
    option_d: "Fourth Normal Form (4NF)",
    correct_answer: "A",
    subject: "Database",
    department: "Computer Science"
  },
  {
    question: "Which of the following database ACID properties ensures that database transactions are fully completed or rolled back completely (all-or-nothing)?",
    option_a: "Atomicity",
    option_b: "Consistency",
    option_c: "Isolation",
    option_d: "Durability",
    correct_answer: "A",
    subject: "Database",
    department: "Computer Science"
  },
  {
    question: "What is the primary benefit of creating an index on a database table column?",
    option_a: "It reduces the physical disk space occupied by the database.",
    option_b: "It speeds up search queries (SELECT statements) at the cost of slower writes (INSERT/UPDATE).",
    option_c: "It automatically prevents duplicate entries from being written.",
    option_d: "It encrypts the data stored in that column for security purposes.",
    correct_answer: "B",
    subject: "Database",
    department: "Computer Science"
  },
  {
    question: "Which SQL clause is used to filter records after they have been aggregated using a GROUP BY statement?",
    option_a: "WHERE",
    option_b: "ORDER BY",
    option_c: "HAVING",
    option_d: "DISTINCT",
    correct_answer: "C",
    subject: "Database",
    department: "Computer Science"
  },
  // Networking (5)
  {
    question: "Which layer of the OSI model is responsible for routing packets across different networks and path determination?",
    option_a: "Data Link Layer (Layer 2)",
    option_b: "Network Layer (Layer 3)",
    option_c: "Transport Layer (Layer 4)",
    option_d: "Application Layer (Layer 7)",
    correct_answer: "B",
    subject: "Networking",
    department: "Computer Science"
  },
  {
    question: "What is the main difference between TCP (Transmission Control Protocol) and UDP (User Datagram Protocol)?",
    option_a: "TCP is connectionless and faster, while UDP is connection-oriented and reliable.",
    option_b: "TCP is connection-oriented and reliable, while UDP is connectionless and faster.",
    option_c: "TCP operates at the Network Layer, while UDP operates at the Transport Layer.",
    option_d: "TCP is only used for local area networks, while UDP is used for wide area networks.",
    correct_answer: "B",
    subject: "Networking",
    department: "Computer Science"
  },
  {
    question: "If a host has an IP address of 192.168.1.50 and a subnet mask of 255.255.255.240, what is the network address of this subnet?",
    option_a: "192.168.1.0",
    option_b: "192.168.1.32",
    option_c: "192.168.1.48",
    option_d: "192.168.1.64",
    correct_answer: "C",
    subject: "Networking",
    department: "Computer Science"
  },
  {
    question: "What protocol is used to dynamically assign IP addresses, subnet masks, gateways, and DNS servers to client devices on a network?",
    option_a: "DNS",
    option_b: "DHCP",
    option_c: "ARP",
    option_d: "ICMP",
    correct_answer: "B",
    subject: "Networking",
    department: "Computer Science"
  },
  {
    question: "Which port number is standard and default for secure web traffic using HTTPS (Hypertext Transfer Protocol Secure)?",
    option_a: "80",
    option_b: "443",
    option_c: "22",
    option_d: "8080",
    correct_answer: "B",
    subject: "Networking",
    department: "Computer Science"
  },
  // Software Engineering (5)
  {
    question: "In Agile software development, what is the purpose of the daily stand-up (scrum) meeting?",
    option_a: "To demonstrate working software to stakeholders and get their feedback.",
    option_b: "To plan the overall project budget and timeline.",
    option_c: "A brief 15-minute alignment meeting to discuss what was done, what will be done, and any blockers.",
    option_d: "To conduct code reviews and write tests.",
    correct_answer: "C",
    subject: "Software Engineering",
    department: "Computer Science"
  },
  {
    question: "Which software design pattern restricts the instantiation of a class to one single instance and provides a global point of access to it?",
    option_a: "Observer Pattern",
    option_b: "Factory Pattern",
    option_c: "Singleton Pattern",
    option_d: "Strategy Pattern",
    correct_answer: "C",
    subject: "Software Engineering",
    department: "Computer Science"
  },
  {
    question: "What is the primary objective of 'Black-Box' testing in software verification?",
    option_a: "To test the internal logical structure and paths of the source code.",
    option_b: "To test the system functionalities without knowledge of the internal code structures.",
    option_c: "To verify database constraints and performance under load.",
    option_d: "To test the software by reviewing only documentation and comments.",
    correct_answer: "B",
    subject: "Software Engineering",
    department: "Computer Science"
  },
  {
    question: "In UML (Unified Modeling Language) diagrams, which diagram represents the static structure of a system by showing its classes, attributes, methods, and relationships?",
    option_a: "Use Case Diagram",
    option_b: "Sequence Diagram",
    option_c: "Class Diagram",
    option_d: "State Machine Diagram",
    correct_answer: "C",
    subject: "Software Engineering",
    department: "Computer Science"
  },
  {
    question: "What does the term 'Continuous Integration' (CI) refer to in modern software engineering?",
    option_a: "Directly releasing code to production without testing to speed up deployment.",
    option_b: "The practice of frequently merging code changes into a central repository, where automated builds and tests are run.",
    option_c: "Using a single database server for all microservices in a system.",
    option_d: "Writing all code in a single file to prevent integration issues.",
    correct_answer: "B",
    subject: "Software Engineering",
    department: "Computer Science"
  },
  // Operating Systems (5)
  {
    question: "What is a deadlock in an operating system?",
    option_a: "A situation where a process crashes due to a segmentation fault.",
    option_b: "A state where two or more processes are unable to proceed because each is waiting for a resource held by the other.",
    option_c: "A hardware failure that causes the operating system to blue-screen (BSOD).",
    option_d: "When the CPU speed is throttled to prevent overheating.",
    correct_answer: "B",
    subject: "Operating Systems",
    department: "Computer Science"
  },
  {
    question: "Which CPU scheduling algorithm is non-preemptive and selects the process that has the smallest execution time remaining?",
    option_a: "Round Robin",
    option_b: "First-Come, First-Served (FCFS)",
    option_c: "Shortest Job First (SJF)",
    option_d: "Priority Scheduling",
    correct_answer: "C",
    subject: "Operating Systems",
    department: "Computer Science"
  },
  {
    question: "What is the main function of Virtual Memory in operating systems?",
    option_a: "To increase the physical size of RAM on the motherboard using software.",
    option_b: "To allow the execution of processes that are larger than the physical memory (RAM) by using disk space as an extension.",
    option_c: "To speed up web browsing by caching HTML files in memory.",
    option_d: "To run 32-bit applications on a 64-bit CPU architecture.",
    correct_answer: "B",
    subject: "Operating Systems",
    department: "Computer Science"
  },
  {
    question: "What is the difference between a process and a thread?",
    option_a: "A process is a light-weight thread, while a thread is a heavy-weight process.",
    option_b: "A process is an executing program with its own memory space, while a thread is a path of execution within a process that shares its memory.",
    option_c: "Processes share the same memory space automatically, while threads require IPC (Inter-Process Communication).",
    option_d: "Processes are managed by the hardware, while threads are managed strictly by user libraries.",
    correct_answer: "B",
    subject: "Operating Systems",
    department: "Computer Science"
  },
  {
    question: "Which page replacement algorithm replaces the page that has not been used for the longest period of time?",
    option_a: "First-In, First-Out (FIFO)",
    option_b: "Least Recently Used (LRU)",
    option_c: "Optimal Page Replacement",
    option_d: "Least Frequently Used (LFU)",
    correct_answer: "B",
    subject: "Operating Systems",
    department: "Computer Science"
  },

  // ==========================================
  // ACCOUNTING (25 questions)
  // ==========================================
  // Financial Accounting (5)
  {
    question: "Which of the following equations represents the basic Accounting Equation?",
    option_a: "Assets = Liabilities - Owner's Equity",
    option_b: "Assets = Liabilities + Owner's Equity",
    option_c: "Liabilities = Assets + Owner's Equity",
    option_d: "Owner's Equity = Assets + Liabilities",
    correct_answer: "B",
    subject: "Financial Accounting",
    department: "Accounting"
  },
  {
    question: "Under the accrual basis of accounting, when is revenue generally recognized?",
    option_a: "When cash is received from the customer.",
    option_b: "When the contract is signed by both parties.",
    option_c: "When services are performed or goods are delivered, regardless of cash timing.",
    option_d: "At the end of the fiscal year.",
    correct_answer: "C",
    subject: "Financial Accounting",
    department: "Accounting"
  },
  {
    question: "Which financial statement reports a company's financial position at a specific point in time?",
    option_a: "Income Statement",
    option_b: "Statement of Cash Flows",
    option_c: "Balance Sheet",
    option_d: "Retained Earnings Statement",
    correct_answer: "C",
    subject: "Financial Accounting",
    department: "Accounting"
  },
  {
    question: "What is the primary purpose of adjusting entries at the end of an accounting period?",
    option_a: "To correct errors made during the journalizing process.",
    option_b: "To align revenues and expenses with the periods in which they occurred (matching principle).",
    option_c: "To close out temporary accounts to retained earnings.",
    option_d: "To calculate the tax liability of the firm.",
    correct_answer: "B",
    subject: "Financial Accounting",
    department: "Accounting"
  },
  {
    question: "If a company purchases equipment on account, what is the effect on the accounting equation?",
    option_a: "Assets increase, Liabilities decrease.",
    option_b: "Assets decrease, Owner's equity increases.",
    option_c: "Assets increase, Liabilities increase.",
    option_d: "No effect on the accounting equation.",
    correct_answer: "C",
    subject: "Financial Accounting",
    department: "Accounting"
  },
  // Cost Accounting (5)
  {
    question: "Which of the following is classified as a prime cost in manufacturing?",
    option_a: "Direct Materials and Factory Rent",
    option_b: "Direct Labor and Factory Utilities",
    option_c: "Direct Materials and Direct Labor",
    option_d: "Factory Overhead and Indirect Labor",
    correct_answer: "C",
    subject: "Cost Accounting",
    department: "Accounting"
  },
  {
    question: "What type of cost remains constant in total but decreases per unit as production volume increases?",
    option_a: "Variable Cost",
    option_b: "Fixed Cost",
    option_c: "Semi-variable Cost",
    option_d: "Opportunity Cost",
    correct_answer: "B",
    subject: "Cost Accounting",
    department: "Accounting"
  },
  {
    question: "In cost accounting, what does the term 'Break-Even Point' represent?",
    option_a: "The level of sales where net income is maximized.",
    option_b: "The point where total revenue equals total variable cost.",
    option_c: "The volume of activity where total revenues equal total expenses (zero profit).",
    option_d: "The point where the direct labor rate equals the overhead rate.",
    correct_answer: "C",
    subject: "Cost Accounting",
    department: "Accounting"
  },
  {
    question: "Which cost accumulation system is best suited for a custom yacht builder?",
    option_a: "Process Costing",
    option_b: "Standard Costing",
    option_c: "Job-Order Costing",
    option_d: "Operational Costing",
    correct_answer: "C",
    subject: "Cost Accounting",
    department: "Accounting"
  },
  {
    question: "What is the formula to calculate the Contribution Margin Ratio?",
    option_a: "(Sales - Variable Expenses) / Sales",
    option_b: "(Sales - Fixed Expenses) / Sales",
    option_c: "Net Operating Income / Sales",
    option_d: "Variable Expenses / Sales",
    correct_answer: "A",
    subject: "Cost Accounting",
    department: "Accounting"
  },
  // Auditing (5)
  {
    question: "What is the primary objective of an independent external audit of financial statements?",
    option_a: "To detect and prevent all cases of employee fraud.",
    option_b: "To express an opinion on whether financial statements are presented fairly, in all material respects.",
    option_c: "To guarantee that the company will remain profitable for the next fiscal year.",
    option_d: "To prepare tax returns on behalf of management.",
    correct_answer: "B",
    subject: "Auditing",
    department: "Accounting"
  },
  {
    question: "Which type of audit opinion indicates that the financial statements are presented fairly and conform to GAAP in all respects?",
    option_a: "Qualified Opinion",
    option_b: "Adverse Opinion",
    option_c: "Disclaimer of Opinion",
    option_d: "Unqualified (Clean) Opinion",
    correct_answer: "D",
    subject: "Auditing",
    department: "Accounting"
  },
  {
    question: "Auditing standards require auditors to maintain which attitude throughout an engagement?",
    option_a: "Blind Trust",
    option_b: "Professional Skepticism",
    option_c: "Hostility toward Management",
    option_d: "Unreasonable Cynicism",
    correct_answer: "B",
    subject: "Auditing",
    department: "Accounting"
  },
  {
    question: "Which of the following best describes 'Audit Risk'?",
    option_a: "The risk that the client will go bankrupt during the audit.",
    option_b: "The risk that the auditor will express an inappropriate audit opinion when financial statements are materially misstated.",
    option_c: "The risk that the auditor will lose the client to another CPA firm.",
    option_d: "The risk that the client will sue the auditor for breach of contract.",
    correct_answer: "B",
    subject: "Auditing",
    department: "Accounting"
  },
  {
    question: "What auditing procedure involves checking mathematical calculations of transactions or account balances?",
    option_a: "Inquiry",
    option_b: "Observation",
    option_c: "Recalculation",
    option_d: "Confirmation",
    correct_answer: "C",
    subject: "Auditing",
    department: "Accounting"
  },
  // Taxation (5)
  {
    question: "Which taxation principle asserts that individuals with higher incomes should pay a larger percentage of tax?",
    option_a: "Benefit Principle",
    option_b: "Ability-to-Pay Principle",
    option_c: "Horizontal Equity Principle",
    option_d: "Simplicity Principle",
    correct_answer: "B",
    subject: "Taxation",
    department: "Accounting"
  },
  {
    question: "What is the difference between tax evasion and tax avoidance?",
    option_a: "Tax evasion is legal optimization, while tax avoidance is illegal fraud.",
    option_b: "Tax evasion is illegal fraud, while tax avoidance is legal planning to minimize tax liability.",
    option_c: "There is no difference; both carry criminal penalties.",
    option_d: "Tax evasion relates to corporations, while tax avoidance relates to individuals.",
    correct_answer: "B",
    subject: "Taxation",
    department: "Accounting"
  },
  {
    question: "Which of the following is classified as a regressive tax?",
    option_a: "Federal Progressive Income Tax",
    option_b: "Sales Tax (VAT)",
    option_c: "Corporate Net Profits Tax",
    option_d: "Inheritance Tax",
    correct_answer: "B",
    subject: "Taxation",
    department: "Accounting"
  },
  {
    question: "What document must employers provide to employees summarizing their annual earnings and tax withholdings?",
    option_a: "Form 1040",
    option_b: "Form W-2",
    option_c: "Form 1099",
    option_d: "Schedule C",
    correct_answer: "B",
    subject: "Taxation",
    department: "Accounting"
  },
  {
    question: "In corporate taxation, what is 'Double Taxation'?",
    option_a: "Taxing both sales and profits at the state level.",
    option_b: "Taxing corporate profits at the corporate level and then taxing dividends received by shareholders.",
    option_c: "Paying corporate income tax to two different nations on local profits.",
    option_d: "Charging VAT and income tax simultaneously on employees.",
    correct_answer: "B",
    subject: "Taxation",
    department: "Accounting"
  },
  // Management Accounting (5)
  {
    question: "What is the primary focus of Management Accounting compared to Financial Accounting?",
    option_a: "Reporting financial history to external regulators.",
    option_b: "Providing financial and non-financial information to internal managers for planning and decision-making.",
    option_c: "Ensuring compliance with external taxation laws.",
    option_d: "Auditing internal bookkeeping processes.",
    correct_answer: "B",
    subject: "Management Accounting",
    department: "Accounting"
  },
  {
    question: "Which budgeting method starts from scratch every period, requiring managers to justify all budgeted expenditures?",
    option_a: "Incremental Budgeting",
    option_b: "Continuous Budgeting",
    option_c: "Zero-Based Budgeting",
    option_d: "Rolling Budgeting",
    correct_answer: "C",
    subject: "Management Accounting",
    department: "Accounting"
  },
  {
    question: "What is a 'Sunk Cost'?",
    option_a: "A future variable cost that will change based on decisions.",
    option_b: "A cost that has already been incurred and cannot be recovered or changed by any future decision.",
    option_c: "An opportunity cost of selecting an alternate path.",
    option_d: "The cost of transporting inventory via sea vessels.",
    correct_answer: "B",
    subject: "Management Accounting",
    department: "Accounting"
  },
  {
    question: "In variance analysis, what does an 'Unfavorable Material Price Variance' indicate?",
    option_a: "The standard price was higher than budgeted.",
    option_b: "The actual price paid for materials was higher than the standard price set.",
    option_c: "Workers wasted more materials than allowed by standards.",
    option_d: "The company purchased poor quality materials.",
    correct_answer: "B",
    subject: "Management Accounting",
    department: "Accounting"
  },
  {
    question: "Which tool tracks performance indicators across financial, customer, internal business process, and learning/growth perspectives?",
    option_a: "Master Budget",
    option_b: "Cost-Volume-Profit analysis",
    option_c: "Balanced Scorecard",
    option_d: "Variance Report",
    correct_answer: "C",
    subject: "Management Accounting",
    department: "Accounting"
  },

  // ==========================================
  // MARKETING MANAGEMENT (25 questions)
  // ==========================================
  // Principles of Marketing (5)
  {
    question: "What are the traditional '4 Ps' of the Marketing Mix?",
    option_a: "People, Process, Physical Evidence, Performance",
    option_b: "Product, Price, Place, Promotion",
    option_c: "Planning, Positioning, Production, Profit",
    option_d: "Public Relations, Purchasing, Packaging, Placement",
    correct_answer: "B",
    subject: "Principles of Marketing",
    department: "Marketing Management"
  },
  {
    question: "Which market coverage strategy involves directing a marketing mix to a single specialized niche segment?",
    option_a: "Undifferentiated Marketing",
    option_b: "Concentrated (Niche) Marketing",
    option_c: "Differentiated Marketing",
    option_d: "Mass Customization",
    correct_answer: "B",
    subject: "Principles of Marketing",
    department: "Marketing Management"
  },
  {
    question: "During which stage of the Product Life Cycle (PLC) do sales grow rapidly while profits peak and start to decline due to competition?",
    option_a: "Introduction",
    option_b: "Growth",
    option_c: "Maturity",
    option_d: "Decline",
    correct_answer: "B",
    subject: "Principles of Marketing",
    department: "Marketing Management"
  },
  {
    question: "What is the primary difference between a 'Need' and a 'Want' in marketing?",
    option_a: "Needs are luxury items, while wants are basic necessities.",
    option_b: "Needs are basic human requirements, while wants are shaped by culture and individual personality.",
    option_c: "Needs are created by marketers, while wants are biological.",
    option_d: "There is no difference; the terms are synonymous.",
    correct_answer: "B",
    subject: "Principles of Marketing",
    department: "Marketing Management"
  },
  {
    question: "Which orientation focuses on aggressive sales and promotional campaigns rather than building long-term customer relationships?",
    option_a: "Production Concept",
    option_b: "Marketing Concept",
    option_c: "Selling Concept",
    option_d: "Societal Marketing Concept",
    correct_answer: "C",
    subject: "Principles of Marketing",
    department: "Marketing Management"
  },
  // Consumer Behavior (5)
  {
    question: "What is the first step in the typical Consumer Decision-Making Process?",
    option_a: "Information Search",
    option_b: "Evaluation of Alternatives",
    option_c: "Problem (Need) Recognition",
    option_d: "Purchase Decision",
    correct_answer: "C",
    subject: "Consumer Behavior",
    department: "Marketing Management"
  },
  {
    question: "In psychology, what represents the internal state that activates, guides, and maintains consumer behavior toward goals?",
    option_a: "Perception",
    option_b: "Motivation",
    option_c: "Attitude",
    option_d: "Culture",
    correct_answer: "B",
    subject: "Consumer Behavior",
    department: "Marketing Management"
  },
  {
    question: "What occurs when a consumer experiences post-purchase anxiety or doubt about whether they made the right choice?",
    option_a: "Cognitive Dissonance",
    option_b: "Selective Distortion",
    option_c: "Perceptual Vigilance",
    option_d: "Subliminal Arousal",
    correct_answer: "A",
    subject: "Consumer Behavior",
    department: "Marketing Management"
  },
  {
    question: "Which level of Maslow's Hierarchy of Needs represents the desire for status, recognition, and self-respect?",
    option_a: "Safety Needs",
    option_b: "Social Needs",
    option_c: "Esteem Needs",
    option_d: "Self-Actualization Needs",
    correct_answer: "C",
    subject: "Consumer Behavior",
    department: "Marketing Management"
  },
  {
    question: "What group serves as a point of comparison or point of reference for an individual's beliefs, attitudes, and behaviors?",
    option_a: "Focus Group",
    option_b: "Demographic Segment",
    option_c: "Reference Group",
    option_d: "Target Market",
    correct_answer: "C",
    subject: "Consumer Behavior",
    department: "Marketing Management"
  },
  // Brand Management (5)
  {
    question: "What term describes the added value endowed to products and services, reflected in how consumers think, feel, and act toward the brand?",
    option_a: "Brand Valuation",
    option_b: "Brand Equity",
    option_c: "Brand Extension",
    option_d: "Brand Architecture",
    correct_answer: "B",
    subject: "Brand Management",
    department: "Marketing Management"
  },
  {
    question: "If a company uses an existing brand name to introduce a new product in a completely different category, it is called a:",
    option_a: "Line Extension",
    option_b: "Co-Branding",
    option_c: "Brand Extension",
    option_d: "Multi-branding",
    correct_answer: "C",
    subject: "Brand Management",
    department: "Marketing Management"
  },
  {
    question: "What is a 'Brand Mark'?",
    option_a: "The legally registered trademark name.",
    option_b: "The element of a brand that can be recognized visually but cannot be spoken (like a symbol or design).",
    option_c: "The score showing how well a brand is recognized.",
    option_d: "The barcode printed on the packaging.",
    correct_answer: "B",
    subject: "Brand Management",
    department: "Marketing Management"
  },
  {
    question: "What is the primary purpose of 'Brand Positioning'?",
    option_a: "To place products on the top shelves of supermarkets.",
    option_b: "To design a unique image and value in the target customer's mind relative to competitors.",
    option_c: "To expand sales into global geographic territories.",
    option_d: "To register trademarks with federal authorities.",
    correct_answer: "B",
    subject: "Brand Management",
    department: "Marketing Management"
  },
  {
    question: "Which concept refers to the degree to which a customer consistently purchases the same brand over time?",
    option_a: "Brand Awareness",
    option_b: "Brand Relevance",
    option_c: "Brand Loyalty",
    option_d: "Brand Association",
    correct_answer: "C",
    subject: "Brand Management",
    department: "Marketing Management"
  },
  // Services Marketing (5)
  {
    question: "Which core service characteristic dictates that services cannot be seen, tasted, felt, or heard before purchase?",
    option_a: "Inseparability",
    option_b: "Perishability",
    option_c: "Intangibility",
    option_d: "Heterogeneity (Variability)",
    correct_answer: "C",
    subject: "Services Marketing",
    department: "Marketing Management"
  },
  {
    question: "Why is service quality often characterized by Heterogeneity (Variability)?",
    option_a: "Services cannot be stored for future use.",
    option_b: "Services are produced and consumed simultaneously.",
    option_c: "Services depend heavily on who provides them, when, and where they are provided.",
    option_d: "Services lack physical attributes.",
    correct_answer: "C",
    subject: "Services Marketing",
    department: "Marketing Management"
  },
  {
    question: "In the context of the Services Marketing Triangle, what does 'Interactive Marketing' represent?",
    option_a: "Marketing between the company and external customers.",
    option_b: "Marketing between the company and its employees (internal training).",
    option_c: "Marketing transactions between the employees and the customers.",
    option_d: "Digital marketing on social networks.",
    correct_answer: "C",
    subject: "Services Marketing",
    department: "Marketing Management"
  },
  {
    question: "What model is widely used to measure service quality across dimensions like Reliability, Responsiveness, Assurance, Empathy, and Tangibles?",
    option_a: "BCG Matrix",
    option_b: "SERVQUAL",
    option_c: "Ansoff Matrix",
    option_d: "Porter's Five Forces",
    correct_answer: "B",
    subject: "Services Marketing",
    department: "Marketing Management"
  },
  {
    question: "What characteristic of services prevents them from being inventoried or stored for future sale?",
    option_a: "Intangibility",
    option_b: "Inseparability",
    option_c: "Perishability",
    option_d: "Variability",
    correct_answer: "C",
    subject: "Services Marketing",
    department: "Marketing Management"
  },
  // Digital Marketing (5)
  {
    question: "In search engine optimization (SEO), what is the difference between organic and paid search results?",
    option_a: "Organic results are generated automatically via algorithm rankings, while paid results are sponsored ads.",
    option_b: "Organic search requires direct payment to Google, while paid search is free.",
    option_c: "Organic search only index images, while paid search maps text.",
    option_d: "There is no functional difference between them.",
    correct_answer: "A",
    subject: "Digital Marketing",
    department: "Marketing Management"
  },
  {
    question: "What does the metric 'CTR' stand for in digital advertising campaign reports?",
    option_a: "Cost-to-Revenue Ratio",
    option_b: "Click-Through Rate",
    option_c: "Customer Transformation Rate",
    option_d: "Campaign Timing Range",
    correct_answer: "B",
    subject: "Digital Marketing",
    department: "Marketing Management"
  },
  {
    question: "Which of the following describes the digital marketing strategy of placing cookies on visitors' browsers to show them ads for products they viewed previously?",
    option_a: "Content Syndication",
    option_b: "Retargeting (Remarketing)",
    option_c: "Affiliate Marketing",
    option_d: "Viral Marketing",
    correct_answer: "B",
    subject: "Digital Marketing",
    department: "Marketing Management"
  },
  {
    question: "What metrics measure the percentage of website visitors who complete a desired goal (such as filling a form or buying a product)?",
    option_a: "Bounce Rate",
    option_b: "Conversion Rate",
    option_c: "Churn Rate",
    option_d: "Abandonment Rate",
    correct_answer: "B",
    subject: "Digital Marketing",
    department: "Marketing Management"
  },
  {
    question: "What digital channel relies on automating newsletters, promotional announcements, and transaction receipts to opt-in subscriber lists?",
    option_a: "SMS Marketing",
    option_b: "Email Marketing",
    option_c: "Social Media Optimization",
    option_d: "Display Networks",
    correct_answer: "B",
    subject: "Digital Marketing",
    department: "Marketing Management"
  },

  // ==========================================
  // TOURISM & HOSPITALITY (25 questions)
  // ==========================================
  // Tourism Management (5)
  {
    question: "What term describes the complete bundle of services, activities, and experiences offered to a tourist, including transport, accommodation, and attractions?",
    option_a: "Tourism Sector",
    option_b: "Tourism Product",
    option_c: "Tourism Market",
    option_d: "Tourism Geography",
    correct_answer: "B",
    subject: "Tourism Management",
    department: "Tourism & Hospitality"
  },
  {
    question: "Which of the following is classified as an 'Inbound Tourist'?",
    option_a: "A resident of Ethiopia traveling to Kenya for holiday.",
    option_b: "A citizen of the United States traveling to Ethiopia to tour the Lalibela churches.",
    option_c: "A resident of Addis Ababa traveling to Hawassa for a weekend conference.",
    option_d: "A business traveler commuting within their native province.",
    correct_answer: "B",
    subject: "Tourism Management",
    department: "Tourism & Hospitality"
  },
  {
    question: "What concept measures the maximum number of tourists that a destination can accommodate without causing severe environmental or cultural degradation?",
    option_a: "Market Capacity",
    option_b: "Carrying Capacity",
    option_c: "Saturation Quotient",
    option_d: "Visitor Index",
    correct_answer: "B",
    subject: "Tourism Management",
    department: "Tourism & Hospitality"
  },
  {
    question: "What type of tourism involves traveling to fragile, undisturbed natural areas, focusing on conservation and local community benefit?",
    option_a: "Adventure Tourism",
    option_b: "Ecotourism",
    option_c: "Mass Tourism",
    option_d: "Medical Tourism",
    correct_answer: "B",
    subject: "Tourism Management",
    department: "Tourism & Hospitality"
  },
  {
    question: "Which international organization acts as the global forum for tourism policies and standardizations under the United Nations?",
    option_a: "UNESCO",
    option_b: "UNWTO (UN Tourism)",
    option_c: "IATA",
    option_d: "WHO",
    correct_answer: "B",
    subject: "Tourism Management",
    department: "Tourism & Hospitality"
  },
  // Hospitality Operations (5)
  {
    question: "In hotel front office operations, what does the term 'Overbooking' refer to?",
    option_a: "Booking tours for guests beyond hotel hours.",
    option_b: "Selling more rooms than are physically available in anticipation of cancellations and no-shows.",
    option_c: "Upgrading a guest to a suite for free.",
    option_d: "Reserving banquet halls for multiple corporate conferences.",
    correct_answer: "B",
    subject: "Hospitality Operations",
    department: "Tourism & Hospitality"
  },
  {
    question: "Which metric represents the average revenue generated per available room in a hotel over a specific period?",
    option_a: "ADR (Average Daily Rate)",
    option_b: "RevPAR (Revenue Per Available Room)",
    option_c: "GOPPAR (Gross Operating Profit Per Available Room)",
    option_d: "Occ Ratio",
    correct_answer: "B",
    subject: "Hospitality Operations",
    department: "Tourism & Hospitality"
  },
  {
    question: "Which department is primarily responsible for cleaning, sanitizing, and maintaining guest rooms and public areas in a lodging facility?",
    option_a: "Front Office",
    option_b: "Housekeeping",
    option_c: "Maintenance & Engineering",
    option_d: "Food & Beverage",
    correct_answer: "B",
    subject: "Hospitality Operations",
    department: "Tourism & Hospitality"
  },
  {
    question: "In food service operations, what does the culinary term 'Mise en Place' mean?",
    option_a: "A detailed service menu style.",
    option_b: "Having all ingredients and tools measured, chopped, and ready before cooking begins.",
    option_c: "The dining table arrangement layout.",
    option_d: "Evaluating food costs daily.",
    correct_answer: "B",
    subject: "Hospitality Operations",
    department: "Tourism & Hospitality"
  },
  {
    question: "What is the standard procedure when a hotel guest arrives before check-in time and their room is not ready?",
    option_a: "Refusing service and asking them to return.",
    option_b: "Offering to store their luggage and welcoming them to use public amenities.",
    option_c: "Charging an automatic penalty fee.",
    option_d: "Canceling their reservation.",
    correct_answer: "B",
    subject: "Hospitality Operations",
    department: "Tourism & Hospitality"
  },
  // Event Management (5)
  {
    question: "What abbreviation represents the business sector focusing on Meetings, Incentives, Conferences, and Exhibitions?",
    option_a: "MICE",
    option_b: "B2B",
    option_c: "F&B",
    option_d: "OTA",
    correct_answer: "A",
    subject: "Event Management",
    department: "Tourism & Hospitality"
  },
  {
    question: "In event planning, what is the purpose of a 'Site Inspection'?",
    option_a: "Auditing financial invoices of suppliers.",
    option_b: "Visiting and assessing a potential venue to verify its capacity, layout, and suitability for the event.",
    option_c: "Evaluating the performance of event coordinators.",
    option_d: "Testing audio-visual systems post-setup.",
    correct_answer: "B",
    subject: "Event Management",
    department: "Tourism & Hospitality"
  },
  {
    question: "What is a 'RFP' in event management context?",
    option_a: "Return on Focus Plan",
    option_b: "Request for Proposal",
    option_c: "Registration Fees Protocol",
    option_d: "Resident Flight Pass",
    correct_answer: "B",
    subject: "Event Management",
    department: "Tourism & Hospitality"
  },
  {
    question: "Which of the following is classified as a critical path tool in event scheduling?",
    option_a: "Survey Questionnaire",
    option_b: "Gantt Chart",
    option_c: "Guest Registry",
    option_d: "Seating Chart",
    correct_answer: "B",
    subject: "Event Management",
    department: "Tourism & Hospitality"
  },
  {
    question: "What event document details the minute-by-minute scheduling of operations on the actual day of the event?",
    option_a: "Event Contract",
    option_b: "Run Sheet (Timeline of Events)",
    option_c: "Marketing Plan",
    option_d: "Floor Layout Plan",
    correct_answer: "B",
    subject: "Event Management",
    department: "Tourism & Hospitality"
  },
  // Travel Agency Operations (5)
  {
    question: "What does 'OTA' stand for in the travel and ticket booking industry?",
    option_a: "Operational Ticket Agency",
    option_b: "Online Travel Agent / Agency",
    option_c: "Official Tourist Association",
    option_d: "Overseas Transport Authority",
    correct_answer: "B",
    subject: "Travel Agency Operations",
    department: "Tourism & Hospitality"
  },
  {
    question: "Which global system is used by travel agencies to search and book airline seats, hotel rooms, and car rentals in real-time?",
    option_a: "GDS (Global Distribution System)",
    option_b: "CMS (Content Management System)",
    option_c: "CRM (Customer Relationship Management)",
    option_d: "PMS (Property Management System)",
    correct_answer: "A",
    subject: "Travel Agency Operations",
    department: "Tourism & Hospitality"
  },
  {
    question: "What is a 'FAM Trip' (Familiarization Trip) in the tourism industry?",
    option_a: "A vacation taken by a family.",
    option_b: "A low-cost or free educational trip offered to travel agents to familiarize them with a destination and promote it.",
    option_c: "A scientific expedition exploring wilderness areas.",
    option_d: "A mandatory training seminar in travel software.",
    correct_answer: "B",
    subject: "Travel Agency Operations",
    department: "Tourism & Hospitality"
  },
  {
    question: "What represents the standard document issued by a travel agency to confirm prepayments for hotel accommodation or ground tours?",
    option_a: "Boarding Pass",
    option_b: "Travel Voucher",
    option_c: "Visa Stamp",
    option_d: "Itinerary Draft",
    correct_answer: "B",
    subject: "Travel Agency Operations",
    department: "Tourism & Hospitality"
  },
  {
    question: "Which organization regulates global airline ticketing standards, commissions, and agent accreditations?",
    option_a: "UNWTO",
    option_b: "IATA (International Air Transport Association)",
    option_c: "ICAO",
    option_d: "PATA",
    correct_answer: "B",
    subject: "Travel Agency Operations",
    department: "Tourism & Hospitality"
  },
  // Sustainable Tourism (5)
  {
    question: "What is the primary goal of Sustainable Tourism?",
    option_a: "To maximize short-term financial returns for large hotel chains.",
    option_b: "To meet the needs of current tourists and host regions while protecting and enhancing opportunities for the future.",
    option_c: "To limit all tourism travel to local destinations to reduce carbon footprints completely.",
    option_d: "To subsidize public transport fares for all international visitors.",
    correct_answer: "B",
    subject: "Sustainable Tourism",
    department: "Tourism & Hospitality"
  },
  {
    question: "What term describes the negative social impact when local cultures are commodified or altered to fit tourist expectations?",
    option_a: "Cultural Adaptation",
    option_b: "Cultural Commercialization (Commodification)",
    option_c: "Cultural Diffusion",
    option_d: "Cultural Preservation",
    correct_answer: "B",
    subject: "Sustainable Tourism",
    department: "Tourism & Hospitality"
  },
  {
    question: "Which of the following is an example of carbon offsetting in tourism?",
    option_a: "Increasing the price of flight tickets during peak seasons.",
    option_b: "Investing in environmental projects like reforestation to balance out emissions from travel.",
    option_c: "Limiting the weight of luggage carried by passengers.",
    option_d: "Switching from standard meals to vegetarian choices on flights.",
    correct_answer: "B",
    subject: "Sustainable Tourism",
    department: "Tourism & Hospitality"
  },
  {
    question: "What is 'Leakage' in tourism economics?",
    option_a: "Wastage of fresh water resources in resort pools.",
    option_b: "The process where tourism revenue generated in a destination flows out to foreign countries due to imports and multinational ownership.",
    option_c: "Unreported tax revenues by travel agencies.",
    option_d: "Loss of tourist baggage during flight transit.",
    correct_answer: "B",
    subject: "Sustainable Tourism",
    department: "Tourism & Hospitality"
  },
  {
    question: "What is the core pillar of the 'Triple Bottom Line' framework in sustainable tourism?",
    option_a: "Revenues, Assets, Dividends",
    option_b: "People, Planet, Profit",
    option_c: "Transport, Lodging, Guiding",
    option_d: "Guests, Host, Regulators",
    correct_answer: "B",
    subject: "Sustainable Tourism",
    department: "Tourism & Hospitality"
  }
];

async function seedDatabase() {
  console.log('[Seeding] Dropping and recreating questions table...');
  
  try {
    await db.query(`DROP TABLE IF EXISTS questions CASCADE`);
    
    await db.query(`
      CREATE TABLE questions (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_answer CHAR(1) NOT NULL,
        subject VARCHAR(50) NOT NULL,
        department VARCHAR(100) NOT NULL DEFAULT 'Computer Science'
      )
    `);
    
    console.log('[Seeding] Inserting 100 questions...');
    
    for (const q of questions) {
      await db.query(`
        INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject, department)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [q.question, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer, q.subject, q.department]);
    }
    
    console.log(`[Seeding] Successfully seeded ${questions.length} questions into the database.`);
    process.exit(0);
  } catch (err) {
    console.error('[Seeding] Error seeding questions:', err.message);
    process.exit(1);
  }
}

seedDatabase();
