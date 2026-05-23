-- AI-Based Exit Exam Database Schema & Seed Data
-- Designed for St. Mary's University CS/SE Students

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) NOT NULL, -- 'A', 'B', 'C', or 'D'
    subject VARCHAR(50) NOT NULL,    -- 'Programming', 'Database', 'Networking', 'Software Engineering', 'Operating Systems'
    department VARCHAR(100) NOT NULL DEFAULT 'Computer Science'
);

-- 3. Results Table
CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    score INT NOT NULL,              -- Percentage (0 to 100)
    subject VARCHAR(50) NOT NULL,    -- 'Comprehensive' or specific subjects
    readiness_level VARCHAR(50) NOT NULL, -- 'High Chance of Passing', 'Moderate Readiness', 'Needs Improvement'
    date_taken TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clear existing questions to avoid duplication on re-run
TRUNCATE TABLE questions CASCADE;

-- Insert Mock Questions (25 Questions: 5 per subject)

-- ============================================================================
-- SUBJECT: Programming
-- ============================================================================
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject) VALUES
('What is the main characteristic of Object-Oriented Programming (OOP) that allows a subclass to provide a specific implementation of a method that is already defined in its superclass?',
 'Encapsulation',
 'Method Overriding (Polymorphism)',
 'Method Overloading',
 'Inheritance',
 'B',
 'Programming'),

('Which of the following data structures operates on a Last-In, First-Out (LIFO) basis?',
 'Queue',
 'Stack',
 'Singly Linked List',
 'Binary Search Tree',
 'B',
 'Programming'),

('What will be the output of a recursive function that calculates the factorial of a number if the base case is missing?',
 'It will return 0.',
 'It will return 1.',
 'It will cause a stack overflow error (infinite recursion).',
 'It will terminate immediately with a compiler warning.',
 'C',
 'Programming'),

('What is the time complexity of searching for an element in a balanced Binary Search Tree (BST) in the worst-case scenario?',
 'O(1)',
 'O(n)',
 'O(log n)',
 'O(n log n)',
 'C',
 'Programming'),

('In Java or C++, what does the "static" keyword indicate when applied to a class member (method or variable)?',
 'The member is immutable and cannot be changed.',
 'The member belongs to the class itself rather than instances of the class.',
 'The member is stored in the CPU cache for faster execution.',
 'The member can only be accessed within the same package/file.',
 'B',
 'Programming');

-- ============================================================================
-- SUBJECT: Database
-- ============================================================================
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject) VALUES
('Which SQL join returns all records from the left table, and the matched records from the right table, filling with NULL values if there is no match?',
 'INNER JOIN',
 'RIGHT OUTER JOIN',
 'LEFT OUTER JOIN',
 'FULL OUTER JOIN',
 'C',
 'Database'),

('A relation is in which normal form if it is in 1NF and all non-key attributes are fully functionally dependent on the primary key (no partial dependencies)?',
 'Second Normal Form (2NF)',
 'Third Normal Form (3NF)',
 'Boyce-Codd Normal Form (BCNF)',
 'Fourth Normal Form (4NF)',
 'A',
 'Database'),

('Which of the following database ACID properties ensures that database transactions are fully completed or rolled back completely (all-or-nothing)?',
 'Atomicity',
 'Consistency',
 'Isolation',
 'Durability',
 'A',
 'Database'),

('What is the primary benefit of creating an index on a database table column?',
 'It reduces the physical disk space occupied by the database.',
 'It speeds up search queries (SELECT statements) at the cost of slower writes (INSERT/UPDATE).',
 'It automatically prevents duplicate entries from being written.',
 'It encrypts the data stored in that column for security purposes.',
 'B',
 'Database'),

('Which SQL clause is used to filter records after they have been aggregated using a GROUP BY statement?',
 'WHERE',
 'ORDER BY',
 'HAVING',
 'DISTINCT',
 'C',
 'Database');

-- ============================================================================
-- SUBJECT: Networking
-- ============================================================================
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject) VALUES
('Which layer of the OSI model is responsible for routing packets across different networks and path determination?',
 'Data Link Layer (Layer 2)',
 'Network Layer (Layer 3)',
 'Transport Layer (Layer 4)',
 'Application Layer (Layer 7)',
 'B',
 'Networking'),

('What is the main difference between TCP (Transmission Control Protocol) and UDP (User Datagram Protocol)?',
 'TCP is connectionless and faster, while UDP is connection-oriented and reliable.',
 'TCP is connection-oriented and reliable, while UDP is connectionless and faster.',
 'TCP operates at the Network Layer, while UDP operates at the Transport Layer.',
 'TCP is only used for local area networks, while UDP is used for wide area networks.',
 'B',
 'Networking'),

('If a host has an IP address of 192.168.1.50 and a subnet mask of 255.255.255.240, what is the network address of this subnet?',
 '192.168.1.0',
 '192.168.1.32',
 '192.168.1.48',
 '192.168.1.64',
 'C',
 'Networking'),

('What protocol is used to dynamically assign IP addresses, subnet masks, gateways, and DNS servers to client devices on a network?',
 'DNS',
 'DHCP',
 'ARP',
 'ICMP',
 'B',
 'Networking'),

('Which port number is standard and default for secure web traffic using HTTPS (Hypertext Transfer Protocol Secure)?',
 '80',
 '443',
 '22',
 '8080',
 'B',
 'Networking');

-- ============================================================================
-- SUBJECT: Software Engineering
-- ============================================================================
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject) VALUES
('In Agile software development, what is the purpose of the daily stand-up (scrum) meeting?',
 'To demonstrate working software to stakeholders and get their feedback.',
 'To plan the overall project budget and timeline.',
 'A brief 15-minute alignment meeting to discuss what was done, what will be done, and any blockers.',
 'To conduct code reviews and write tests.',
 'C',
 'Software Engineering'),

('Which software design pattern restricts the instantiation of a class to one single instance and provides a global point of access to it?',
 'Observer Pattern',
 'Factory Pattern',
 'Singleton Pattern',
 'Strategy Pattern',
 'C',
 'Software Engineering'),

('What is the primary objective of "Black-Box" testing in software verification?',
 'To test the internal logical structure and paths of the source code.',
 'To test the system functionalities without knowledge of the internal code structures.',
 'To verify database constraints and performance under load.',
 'To test the software by reviewing only documentation and comments.',
 'B',
 'Software Engineering'),

('In UML (Unified Modeling Language) diagrams, which diagram represents the static structure of a system by showing its classes, attributes, methods, and relationships?',
 'Use Case Diagram',
 'Sequence Diagram',
 'Class Diagram',
 'State Machine Diagram',
 'C',
 'Software Engineering'),

('What does the term "Continuous Integration" (CI) refer to in modern software engineering?',
 'Directly releasing code to production without testing to speed up deployment.',
 'The practice of frequently merging code changes into a central repository, where automated builds and tests are run.',
 'Using a single database server for all microservices in a system.',
 'Writing all code in a single file to prevent integration issues.',
 'B',
 'Software Engineering');

-- ============================================================================
-- SUBJECT: Operating Systems
-- ============================================================================
INSERT INTO questions (question, option_a, option_b, option_c, option_d, correct_answer, subject) VALUES
('What is a deadlock in an operating system?',
 'A situation where a process crashes due to a segmentation fault.',
 'A state where two or more processes are unable to proceed because each is waiting for a resource held by the other.',
 'A hardware failure that causes the operating system to blue-screen (BSOD).',
 'When the CPU speed is throttled to prevent overheating.',
 'B',
 'Operating Systems'),

('Which CPU scheduling algorithm is non-preemptive and selects the process that has the smallest execution time remaining?',
 'Round Robin',
 'First-Come, First-Served (FCFS)',
 'Shortest Job First (SJF)',
 'Priority Scheduling',
 'C',
 'Operating Systems'),

('What is the main function of Virtual Memory in operating systems?',
 'To increase the physical size of RAM on the motherboard using software.',
 'To allow the execution of processes that are larger than the physical memory (RAM) by using disk space as an extension.',
 'To speed up web browsing by caching HTML files in memory.',
 'To run 32-bit applications on a 64-bit CPU architecture.',
 'B',
 'Operating Systems'),

('What is the difference between a process and a thread?',
 'A process is a light-weight thread, while a thread is a heavy-weight process.',
 'A process is an executing program with its own memory space, while a thread is a path of execution within a process that shares its memory.',
 'Processes share the same memory space automatically, while threads require IPC (Inter-Process Communication).',
 'Processes are managed by the hardware, while threads are managed strictly by user libraries.',
 'B',
 'Operating Systems'),

('Which page replacement algorithm replaces the page that has not been used for the longest period of time?',
 'First-In, First-Out (FIFO)',
 'Least Recently Used (LRU)',
 'Optimal Page Replacement',
 'Least Frequently Used (LFU)',
 'B',
 'Operating Systems');
