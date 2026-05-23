# AI-Based Exit Exam Preparation & Performance Prediction System
### 🚀 A Premium Full-Stack Hackathon Solution for St. Mary's University, Ethiopia

[![Platform Status](https://img.shields.io/badge/Platform-Active-success?style=for-the-badge&logo=node.js&color=00f2fe)](http://localhost:3000)
[![Tech Stack](https://img.shields.io/badge/Tech_Stack-Node_/_Express_/_PostgreSQL-blue?style=for-the-badge&logo=postgresql&color=4facfe)](https://www.postgresql.org)
[![Aesthetic](https://img.shields.io/badge/Design-Glassmorphism_/_Dark_Futuristic-purple?style=for-the-badge&logo=css3&color=a18cd1)](#)

---

## 🌟 The Pitch & Main Problem Statement

In Ethiopia, national exit exams are high-stakes gates: failing them blocks a student's graduation. Yet, students at **St. Mary's University** face major roadblocks:
1. **Low student engagement** during exhausting preparation.
2. **Lack of data-driven academic support** or milestone metrics.
3. **No performance tracking**—students study blindly without knowing their core weaknesses.
4. **Communication and resource fragmentation** across different channels.
5. **No intelligent prediction or recommendation engine** to map study routes.

This platform completely solves these challenges by combining a **premium, dark cyber, glassmorphic student dashboard** with a **ticking mock exam console**, **dynamic Chart.js visual analytics**, a **rules-based AI predictor** matching MoE guidelines, and a **gamification streak & achievement badge system** to keep students addicted to learning.

---

## 🛠️ Technology Stack (Strict Hackathon Criteria)

* **Frontend**: Vanilla HTML5, premium responsive CSS3 (Glassmorphism, custom linear gradients, neon accents, scale animations), and modular Vanilla JavaScript.
* **Backend**: Node.js & Express.js server mapping clean friendly URLs (no `.html` exposed to client).
* **Database**: PostgreSQL (relational storage with automated self-healing schema creation and query seeding).
* **Analytics**: Chart.js (animated Radar and Area line charts tailored for dark themes).
* **Authentication**: JWT session tokens saved securely in `httpOnly` secure cookies.
* **Gamification**: Consecutive day exam tracking, streak markers, and unlockable badge states.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js** and **PostgreSQL** installed and running on your local machine.

### 2. Configure Environment `.env`
Verify that your database configuration matches your local instance. Create or inspect the `.env` file in the root directory:
```env
PORT=3000
JWT_SECRET=stmarys_university_exit_exam_prep_secret_key_2026
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=admin_secure_password
DB_NAME=stmary_exit_exam
```

### 3. Install Dependencies
Run the following command to download core node modules:
```bash
npm install
```

### 4. Boot the Platform
Run the main server bootloader. On start, the system connects, checks if the database `stmary_exit_exam` exists, automatically creates it if missing, loads the schemas, and seeds 25 comprehensive Computer Science mock exam questions:
```bash
node server.js
```

### 5. Access the SaaS
Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)** to experience the full end-to-end flow!

---

## 📂 Project Architecture

```
AI-Exit-exam/
├── config/
│   └── db.js            # Self-healing database connection pool & seeder
├── database/
│   └── setup.sql        # Tables schema and 25 seeded CS multiple-choice questions
├── middleware/
│   └── auth.js          # JWT cookie validation middleware
├── routes/
│   ├── auth.js          # Registration, Login, and Logout API endpoints
│   ├── exam.js          # Random mixed question loader & secure backend grader
│   └── dashboard.js     # Analytics, streak logic, badge processing & AI Advisor
├── public/
│   ├── index.html       # Landing page showing problem cards & testimonials
│   ├── login.html       # Translucent auth screen
│   ├── register.html    # Signup screen with department mappings
│   ├── dashboard.html   # Student analytics portal (Radar/Line charts, Badges, Recommendations)
│   ├── exam.html        # Clean, distraction-free mock exam console with 30-min timer
│   ├── css/
│   │   ├── style.css    # Core cyber styles, layouts, landing and buttons
│   │   ├── dashboard.css# Widgets, charts layout, metrics, and badges UI styling
│   │   └── exam.css     # Question console, options selection, progress node lists
│   └── js/
│       ├── auth.js      # Session controls & standard toast notifications
│       ├── dashboard.js # Chart.js integrations & stats fetching
│       └── exam.js      # Ticking countdown timer, answer selection & local storage caching
├── server.js            # Express application bootloader
├── package.json         # Dependency manifest
└── README.md            # Startup-style documentation
```

---

## 💎 Core Innovation & Simulated AI Features

### 1. The Readiness Scoring Engine
Calculates a weighted average combining general past performance with the single most recent mock score to mirror a student's instant preparedness:
$$\text{Readiness Score} = (\text{Historical Average} \times 0.6) + (\text{Most Recent Mock Score} \times 0.4)$$

The calculated index yields 3 levels of preparedness:
*   🟢 **High Chance of Passing** (Score $\ge 75\%$)
*   🟡 **Moderate Readiness** ($50\% \le \text{Score} < 75\%$)
*   🔴 **Needs Improvement** (Score $< 50\%$)

### 2. Smart Recommendations & Topics Checklist
When a student's average in any core subject (*Programming, Database, Operating Systems, Software Engineering, or Networking*) falls below **65%**, the platform:
1. Dynamically maps the weak subjects.
2. Appends specific focus sub-topics (e.g., *SQL outer joins, LRU page replacements, OSI Layer functions*) to the **Target Study Checklist**.
3. Prompts the **AI Performance Prediction Advisor** to output targeted suggestions addressing the student by name.

### 3. Gamification Loop
*   **Daily Streaks**: Analyzes consecutive mock exam timestamps. If the student completes mock exams on subsequent calendar days, their study streak increments!
*   **Badge Board**: Gamified achievements unlock in real time:
    - 🚀 **First Step**: Unlocks upon submitting the first diagnostic exam.
    - 🏆 **Subject Master**: Unlocks when a student scores $\ge 85\%$ in any individual subject exam.
    - 🔥 **Consistent Scholar**: Unlocks when maintaining a consecutive study streak of 3+ days.
    - 👑 **Exit Exam Ready**: Unlocks when reaching an overall calculated Readiness Score of $\ge 80\%$.

---

## 🎓 St. Mary's University Context & Social Impact

By providing a unified hub, students no longer navigate fragmented study guides. The gamified loop lowers test anxiety, and the automated prediction lets academic advisors step in to support struggling students *before* the national exam occurs, ensuring St. Mary's University continues to lead in national graduation success rate metrics.
