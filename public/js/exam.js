/**
 * EXAM CONSOLE MANAGEMENT
 * St. Mary's University Exit Exam AI-Prep System
 */

let examQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let timerInterval = null;
let secondsLeft = 600; // Default 10 minutes for 5 questions (2 mins/question)
let selectedQuestionsCount = 5; // Default chosen size

// Page Initialization
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Verify User Session
  const user = await checkSession();
  if (!user) {
    showToast('Session expired. Please login to take the exam.', 'error');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
    return;
  }

  // 2. Check for active/cached exam session to restore state
  const cachedQuestions = localStorage.getItem('exit_exam_questions');
  if (cachedQuestions) {
    console.log('[Exam] Active exam session found. Restoring state...');
    document.getElementById('setup-panel').style.display = 'none';
    document.getElementById('exam-active-panel').style.display = 'flex';
    document.getElementById('results-panel').style.display = 'none';
    await initExam();
  } else {
    console.log('[Exam] No active session. Showing configuration panel.');
    document.getElementById('setup-panel').style.display = 'block';
    document.getElementById('exam-active-panel').style.display = 'none';
    document.getElementById('results-panel').style.display = 'none';
  }
});

// Logout Handler
async function handleLogout() {
  clearInterval(timerInterval);
  clearExamSession();
  await logoutUser();
}

// Select exam configuration size from setup cards
function selectExamSize(size, element) {
  selectedQuestionsCount = size;
  
  // Manage visual active classes
  const options = document.querySelectorAll('.setup-option');
  options.forEach(opt => opt.classList.remove('active'));
  element.classList.add('active');
}

// Trigger start of fresh exam session
async function triggerStartExam() {
  document.getElementById('setup-panel').style.display = 'none';
  document.getElementById('exam-active-panel').style.display = 'flex';
  document.getElementById('results-panel').style.display = 'none';
  
  // Set duration: 2 minutes per question
  secondsLeft = selectedQuestionsCount * 120;
  localStorage.setItem('exit_exam_time_left', secondsLeft);
  
  // Clear any residual cached answers from previous exams
  localStorage.removeItem('exit_exam_answers');
  userAnswers = {};
  currentQuestionIndex = 0;

  // Show loading spinner
  document.getElementById('loading-questions').style.display = 'block';
  document.getElementById('question-content').style.display = 'none';
  
  await initExam();
}

// Initialize Exam Console Data
async function initExam() {
  try {
    const cachedQuestions = localStorage.getItem('exit_exam_questions');
    const cachedAnswers = localStorage.getItem('exit_exam_answers');
    const cachedTime = localStorage.getItem('exit_exam_time_left');

    if (cachedQuestions) {
      examQuestions = JSON.parse(cachedQuestions);
      userAnswers = cachedAnswers ? JSON.parse(cachedAnswers) : {};
      secondsLeft = cachedTime ? parseInt(cachedTime) : (examQuestions.length * 120);
      
      console.log('[Exam] Restored exam state from local cache.');
      startExamConsole();
    } else {
      // Fetch fresh mixed exam questions based on selected limit
      const res = await fetch(`/api/exam/questions?limit=${selectedQuestionsCount}`);
      if (!res.ok) {
        throw new Error('Failed to load questions from database.');
      }
      
      const data = await res.json();
      examQuestions = data.questions;
      
      // Cache questions in local storage
      localStorage.setItem('exit_exam_questions', JSON.stringify(examQuestions));
      
      startExamConsole();
    }
  } catch (err) {
    console.error('Error starting exam:', err);
    showToast('Failed to initialize exam console.', 'error');
    // Re-show setup panel if initialization fails
    document.getElementById('setup-panel').style.display = 'block';
    document.getElementById('exam-active-panel').style.display = 'none';
  }
}

// Start exam flow
function startExamConsole() {
  // Hide loading spinner
  document.getElementById('loading-questions').style.display = 'none';
  document.getElementById('question-content').style.display = 'block';

  // Setup tracker nodes
  buildProgressTracker();

  // Draw first question
  renderQuestion();

  // Run Countdown Timer
  startTimer();
}

// Start ticking timer
function startTimer() {
  // Clear any existing intervals first
  if (timerInterval) clearInterval(timerInterval);

  updateTimerUI();

  timerInterval = setInterval(() => {
    secondsLeft--;
    localStorage.setItem('exit_exam_time_left', secondsLeft);

    updateTimerUI();

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      showToast('Time is up! Auto-submitting your exam...', 'info');
      submitExam(true); // force submit
    }
  }, 1000);
}

// Update countdown text
function updateTimerUI() {
  const timerBox = document.getElementById('exam-timer');
  const timerText = document.getElementById('timer-text');
  if (!timerBox || !timerText) return;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  timerText.innerText = `${paddedMinutes}:${paddedSeconds}`;

  // Red pulse warning when < 2 mins (120 seconds) or 20% of exam time
  const warningThreshold = Math.max(120, examQuestions.length * 24); 
  if (secondsLeft < warningThreshold) {
    timerBox.classList.add('warning');
  } else {
    timerBox.classList.remove('warning');
  }
}

// Render active question details
function renderQuestion() {
  if (examQuestions.length === 0) return;

  const q = examQuestions[currentQuestionIndex];
  
  // Set category tag
  document.getElementById('current-subject-tag').innerText = q.subject;
  
  // Set question metadata info
  document.getElementById('question-number-text').innerText = `Question ${currentQuestionIndex + 1} of ${examQuestions.length}`;
  
  // Set body text
  document.getElementById('question-text-body').innerText = q.question;

  // Set option labels
  document.getElementById('option-a-text').innerText = q.option_a;
  document.getElementById('option-b-text').innerText = q.option_b;
  document.getElementById('option-c-text').innerText = q.option_c;
  document.getElementById('option-d-text').innerText = q.option_d;

  // Remove selection from all items
  const optionItems = document.querySelectorAll('.option-item');
  optionItems.forEach(item => item.classList.remove('selected'));

  // If already answered, set active class selection
  const savedAnswer = userAnswers[q.id];
  if (savedAnswer) {
    const letterIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    optionItems[letterIndex[savedAnswer]].classList.add('selected');
  }

  // Update navigation button visibility
  document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;

  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');

  if (currentQuestionIndex === examQuestions.length - 1) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-flex';
  } else {
    nextBtn.style.display = 'inline-flex';
    submitBtn.style.display = 'none';
  }

  // Set active node inside the tracker grid
  updateActiveTrackerNode();
}

// Build progress navigation tracker
function buildProgressTracker() {
  const container = document.getElementById('progress-grid-container');
  if (!container) return;

  container.innerHTML = examQuestions.map((q, idx) => {
    const isAnswered = userAnswers[q.id] ? 'answered' : '';
    const isActive = idx === currentQuestionIndex ? 'active' : '';
    return `
      <div class="progress-node ${isAnswered} ${isActive}" id="node-${idx}" onclick="jumpToQuestion(${idx})">
        ${idx + 1}
      </div>
    `;
  }).join('');
}

// Jump to a specific question directly
function jumpToQuestion(index) {
  if (index < 0 || index >= examQuestions.length) return;
  currentQuestionIndex = index;
  renderQuestion();
}

// Next button trigger
function nextQuestion() {
  if (currentQuestionIndex < examQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
}

// Previous button trigger
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}

// Option item selection
function selectOption(letter) {
  const q = examQuestions[currentQuestionIndex];
  userAnswers[q.id] = letter;

  // Cache selected option
  localStorage.setItem('exit_exam_answers', JSON.stringify(userAnswers));

  // Visual selection toggling
  const optionItems = document.querySelectorAll('.option-item');
  optionItems.forEach(item => item.classList.remove('selected'));

  const letterIndex = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
  optionItems[letterIndex[letter]].classList.add('selected');

  // Mark tracker node as answered
  const node = document.getElementById(`node-${currentQuestionIndex}`);
  if (node) {
    node.classList.add('answered');
  }
}

// Highlight current index progress circle
function updateActiveTrackerNode() {
  const nodes = document.querySelectorAll('.progress-node');
  nodes.forEach(node => node.classList.remove('active'));

  const currentNode = document.getElementById(`node-${currentQuestionIndex}`);
  if (currentNode) {
    currentNode.classList.add('active');
  }
}

// Show verification prompt
function showSubmitModal() {
  document.getElementById('confirm-modal').classList.add('show');
}

// Dismiss verification prompt
function hideSubmitModal() {
  document.getElementById('confirm-modal').classList.remove('show');
}

// Submit responses to Express backend
async function submitExam(force = false) {
  hideSubmitModal();
  if (timerInterval) clearInterval(timerInterval);

  // If not force, verify that they answered all questions, or issue a warning
  const answeredCount = Object.keys(userAnswers).length;
  const totalCount = examQuestions.length;

  if (!force && answeredCount < totalCount) {
    const confirmIncomplete = confirm(`You have only answered ${answeredCount} of ${totalCount} questions. Submit anyway?`);
    if (!confirmIncomplete) {
      startTimer(); // resume ticking
      return;
    }
  }

  try {
    const res = await fetch('/api/exam/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: userAnswers })
    });

    const data = await res.json();
    
    if (res.ok) {
      showToast('Exam submitted and graded successfully!', 'success');
      
      // Clear exam local storage session cache
      clearExamSession();

      // Show inline results view
      renderInlineResults(data);

    } else {
      showToast(data.error || 'Failed to submit exam.', 'error');
      startTimer();
    }
  } catch (err) {
    console.error('Submit API error:', err);
    showToast('Network error during exam submission.', 'error');
    startTimer();
  }
}

// Display graded exam results and start AI Coach recommendation pull inline
async function renderInlineResults(data) {
  // Hide active exam panel and show results panel
  document.getElementById('exam-active-panel').style.display = 'none';
  
  const resultsPanel = document.getElementById('results-panel');
  resultsPanel.style.display = 'flex';

  // Smooth scroll user to top of page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Update Core Metrics
  document.getElementById('result-score').innerText = `${data.overall_score}%`;
  
  const correctCount = data.details.filter(d => d.is_correct).length;
  document.getElementById('result-count').innerText = `${correctCount}/${data.details.length}`;
  
  const readinessEl = document.getElementById('result-readiness');
  readinessEl.innerText = data.readiness_level;
  
  // Style readiness levels dynamically
  if (data.overall_score >= 75) {
    readinessEl.style.color = 'var(--accent-green)';
    readinessEl.style.borderColor = 'rgba(0, 255, 135, 0.3)';
    readinessEl.style.background = 'rgba(0, 255, 135, 0.08)';
  } else if (data.overall_score >= 50) {
    readinessEl.style.color = '#ffc107'; // Moderate (Yellow)
    readinessEl.style.borderColor = 'rgba(255, 193, 7, 0.3)';
    readinessEl.style.background = 'rgba(255, 193, 7, 0.08)';
  } else {
    readinessEl.style.color = 'var(--accent-red)';
    readinessEl.style.borderColor = 'rgba(255, 51, 102, 0.3)';
    readinessEl.style.background = 'rgba(255, 51, 102, 0.08)';
  }

  // Populate Question Review Board
  const reviewContainer = document.getElementById('question-review-container');
  reviewContainer.innerHTML = '';

  examQuestions.forEach((q, idx) => {
    const gradedDetail = data.details.find(d => d.question_id === q.id) || {};
    const correctAnswer = gradedDetail.correct_answer;
    const userAnswer = gradedDetail.user_answer;
    const isCorrect = gradedDetail.is_correct;

    const statusIcon = isCorrect 
      ? `<i class="fa-solid fa-circle-check" style="color: var(--accent-green); margin-right: 0.5rem;"></i>` 
      : `<i class="fa-solid fa-circle-xmark" style="color: var(--accent-red); margin-right: 0.5rem;"></i>`;
      
    const statusLabel = isCorrect 
      ? `<span style="color: var(--accent-green); font-weight: 700;">CORRECT</span>` 
      : `<span style="color: var(--accent-red); font-weight: 700;">INCORRECT</span>`;

    // Comparative badge builder
    const optionLetters = ['A', 'B', 'C', 'D'];
    const optionTexts = {
      'A': q.option_a,
      'B': q.option_b,
      'C': q.option_c,
      'D': q.option_d
    };

    const optionsHtml = optionLetters.map(letter => {
      let badgeClass = 'review-option-badge';
      let badgeIcon = '<i class="fa-regular fa-circle"></i>';

      if (letter === correctAnswer) {
        badgeClass += ' correct-choice';
        badgeIcon = '<i class="fa-solid fa-circle-check"></i>';
      } else if (letter === userAnswer) {
        badgeClass += ' user-choice';
        badgeIcon = '<i class="fa-solid fa-circle-xmark"></i>';
      }

      // If user choice was correct, apply both
      if (letter === userAnswer && letter === correctAnswer) {
        badgeClass = 'review-option-badge user-choice correct';
        badgeIcon = '<i class="fa-solid fa-circle-check"></i>';
      }

      return `
        <div class="${badgeClass}">
          ${badgeIcon}
          <div><strong>${letter}:</strong> ${optionTexts[letter]}</div>
        </div>
      `;
    }).join('');

    const reviewItemHtml = `
      <div class="review-item animate-fade-in" style="animation-delay: ${idx * 0.05}s;">
        <div class="review-item-header">
          <div>
            <span class="exam-subject-tag">${q.subject}</span>
            <span style="color: var(--text-secondary); margin-left: 0.75rem;">Question ${idx + 1}</span>
          </div>
          <div style="display: flex; align-items: center;">
            ${statusIcon} ${statusLabel}
          </div>
        </div>
        <div class="review-question-text">
          ${q.question}
        </div>
        <div class="review-options-compare">
          ${optionsHtml}
        </div>
      </div>
    `;

    reviewContainer.insertAdjacentHTML('beforeend', reviewItemHtml);
  });

  // Pull AI recommendations
  await fetchAIRecommendation(data.overall_score, data.readiness_level, data.subject_breakdown);
}

// Query AI Recommendation Engine and render responses
async function fetchAIRecommendation(score, readinessLevel, subjectBreakdown) {
  const loadingEl = document.getElementById('ai-loading');
  const contentEl = document.getElementById('ai-recommendation-content');
  
  loadingEl.style.display = 'block';
  contentEl.style.display = 'none';

  try {
    const res = await fetch('/api/ai/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        score: score,
        readiness_level: readinessLevel,
        subject_breakdown: subjectBreakdown
      })
    });

    const data = await res.json();

    if (res.ok && data.recommendation) {
      // Convert response Markdown to premium responsive HTML
      contentEl.innerHTML = parseMarkdown(data.recommendation);
      loadingEl.style.display = 'none';
      contentEl.style.display = 'block';
    } else {
      throw new Error(data.error || 'Failed to fetch AI study guide.');
    }
  } catch (err) {
    console.error('Error fetching AI recommendation:', err);
    loadingEl.style.display = 'none';
    contentEl.innerHTML = `
      <div style="text-align: center; color: var(--accent-red); padding: 1rem 0;">
        <i class="fa-solid fa-triangle-exclamation" style="font-size: 2.5rem; margin-bottom: 0.75rem;"></i>
        <p>Your score metrics have been recorded. However, the AI study coach could not generate customized recommendations at this moment.</p>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">Tip: Open the AI Study Assistant chatbot on your main dashboard to interactively ask study questions regarding this exam.</p>
      </div>
    `;
    contentEl.style.display = 'block';
  }
}

// Premium Local Markdown-to-HTML parser using standard Regex operations
function parseMarkdown(text) {
  if (!text) return '';

  // Escape HTML tags to prevent custom XSS vectors
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert Bold patterns (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert Headings
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

  // Parse list structures and paragraphs by line analysis
  const lines = html.split('\n');
  let inUnorderedList = false;
  let inOrderedList = false;
  let formattedLines = [];

  for (let line of lines) {
    const trimmed = line.trim();

    // Check unordered lists
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const listContent = trimmed.substring(2);
      if (inOrderedList) {
        formattedLines.push('</ol>');
        inOrderedList = false;
      }
      if (!inUnorderedList) {
        formattedLines.push('<ul>');
        inUnorderedList = true;
      }
      formattedLines.push(`<li>${listContent}</li>`);
    }
    // Check ordered lists
    else if (/^\d+\.\s+(.*)$/.test(trimmed)) {
      const match = trimmed.match(/^\d+\.\s+(.*)$/);
      const listContent = match[1];
      if (inUnorderedList) {
        formattedLines.push('</ul>');
        inUnorderedList = false;
      }
      if (!inOrderedList) {
        formattedLines.push('<ol>');
        inOrderedList = true;
      }
      formattedLines.push(`<li>${listContent}</li>`);
    }
    // Check other text blocks
    else {
      // Close list tags if necessary
      if (inUnorderedList) {
        formattedLines.push('</ul>');
        inUnorderedList = false;
      }
      if (inOrderedList) {
        formattedLines.push('</ol>');
        inOrderedList = false;
      }

      if (trimmed !== '') {
        // If the line already starts with a custom tag structure, push it directly
        if (trimmed.startsWith('<h3') || trimmed.startsWith('<h2') || trimmed.startsWith('<h1')) {
          formattedLines.push(trimmed);
        } else {
          formattedLines.push(`<p>${trimmed}</p>`);
        }
      }
    }
  }

  // Handle trailing tags
  if (inUnorderedList) formattedLines.push('</ul>');
  if (inOrderedList) formattedLines.push('</ol>');

  return formattedLines.join('\n');
}

// Clean cached local storage keys
function clearExamSession() {
  localStorage.removeItem('exit_exam_questions');
  localStorage.removeItem('exit_exam_answers');
  localStorage.removeItem('exit_exam_time_left');
}
