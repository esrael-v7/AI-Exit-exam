/**
 * DASHBOARD ANALYTICS & VISUALIZATION
 * St. Mary's University Exit Exam AI-Prep System
 */

let subjectChartInstance = null;
let hoursChartInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Verify User Authentication
  const user = await checkSession();
  if (!user) {
    showToast('Unauthorized access. Redirecting to login...', 'error');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1500);
    return;
  }

  // 2. Update Header Greetings
  document.getElementById('user-greeting').innerText = `Welcome back, ${user.full_name}!`;
  document.getElementById('user-subtext').innerHTML = `Department of ${user.department} &bull; St. Mary's University`;

  // 3. Load Stats & Render Dashboard
  await loadDashboardStats();
});

// Logout Handler
async function handleLogout() {
  await logoutUser();
}

// Fetch dashboard stats from Express API
async function loadDashboardStats() {
  try {
    const res = await fetch('/api/dashboard/stats');
    if (!res.ok) {
      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }
      throw new Error('Failed to load dashboard statistics.');
    }

    const data = await res.json();
    
    // Update Metrics Dashboard Counters
    document.getElementById('metric-readiness').innerText = `${data.readiness_score}%`;
    document.getElementById('metric-streak').innerText = `${data.streak_count} ${data.streak_count === 1 ? 'Day' : 'Days'}`;
    
    // Total Comprehensive exams completed
    const compExamsCount = data.recent_exams.length;
    document.getElementById('metric-completed').innerText = compExamsCount;

    // Weak Subjects
    const weakBox = document.getElementById('metric-weak');
    if (data.weak_subjects.length > 0) {
      weakBox.innerText = data.weak_subjects.join(', ');
      weakBox.style.color = 'var(--accent-red)';
    } else {
      weakBox.innerText = compExamsCount > 0 ? 'None!' : 'No Data';
      weakBox.style.color = compExamsCount > 0 ? 'var(--accent-green)' : 'var(--text-muted)';
    }

    // Update AI Advisor Box
    document.getElementById('ai-advisor-speech').innerHTML = data.ai_assistant_text;

    // Render Recent Exams Log
    renderExamsLog(data.recent_exams);

    // Render Recommended Topics
    renderRecommendedTopics(data.recommended_topics);

    // Render Badges Panel
    renderBadges(data.badges);

    // Draw Chart.js Graphs
    renderCharts(data.subject_averages, data.weekly_time_spent);

  } catch (err) {
    console.error('Error rendering dashboard:', err);
    showToast('Failed to sync student dashboard analytics.', 'error');
  }
}

// Render Recent Mock Exams
function renderExamsLog(exams) {
  const logBody = document.getElementById('exam-log-body');
  if (!logBody) return;

  if (exams.length === 0) {
    logBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">
          No mock exams logged yet. Click "Take Mock Exam" to establish your baseline.
        </td>
      </tr>
    `;
    return;
  }

  logBody.innerHTML = exams.map(exam => {
    const formattedDate = new Date(exam.date_taken).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    let badgeClass = 'danger';
    if (exam.readiness_level === 'High Chance of Passing') {
      badgeClass = 'success';
    } else if (exam.readiness_level === 'Moderate Readiness') {
      badgeClass = 'warning';
    }

    return `
      <tr>
        <td>${formattedDate}</td>
        <td>Comprehensive Mock Exam</td>
        <td style="font-weight: 700; color: var(--primary-neon);">${exam.score}%</td>
        <td><span class="status-pill ${badgeClass}">${exam.readiness_level}</span></td>
      </tr>
    `;
  }).join('');
}

// Render Study Topics Checklist
function renderRecommendedTopics(topics) {
  const container = document.getElementById('recommended-topics-list');
  if (!container) return;

  if (topics.length === 0) {
    container.innerHTML = `
      <div class="topic-tag">
        <i class="fa-solid fa-circle-question"></i>
        <span>No recommendations generated yet. Take an exam to diagnostic.</span>
      </div>
    `;
    return;
  }

  container.innerHTML = topics.map(topic => `
    <div class="topic-tag">
      <i class="fa-solid fa-graduation-cap"></i>
      <span>${topic}</span>
    </div>
  `).join('');
}

// Render Gamification Badges
function renderBadges(badges) {
  const container = document.getElementById('badges-list-container');
  if (!container) return;

  container.innerHTML = badges.map(badge => `
    <div class="badge-item ${badge.unlocked ? 'unlocked' : 'locked'}">
      <div class="badge-icon-box">${badge.icon}</div>
      <div class="badge-info">
        <h4>${badge.name} ${badge.unlocked ? '<span style="color: var(--accent-green); font-size: 0.75rem;">(Unlocked)</span>' : ''}</h4>
        <p>${badge.description}</p>
      </div>
    </div>
  `).join('');
}

// Render Charts utilizing Chart.js
function renderCharts(subjectAverages, weeklyTimeSpent) {
  // Destructure canvas contexts
  const ctxSubject = document.getElementById('subjectChart').getContext('2d');
  const ctxHours = document.getElementById('hoursChart').getContext('2d');

  // Chart Global Defaults Override for Dark Theme
  Chart.defaults.color = '#9ca3af';
  Chart.defaults.font.family = "'Outfit', sans-serif";

  // 1. Draw Subject Mastery Radar Chart
  const subjects = subjectAverages.map(s => s.subject);
  const scores = subjectAverages.map(s => s.avg_score);

  if (subjectChartInstance) subjectChartInstance.destroy();
  
  subjectChartInstance = new Chart(ctxSubject, {
    type: 'radar',
    data: {
      labels: subjects,
      datasets: [{
        label: 'Average Score (%)',
        data: scores,
        backgroundColor: 'rgba(0, 242, 254, 0.15)',
        borderColor: '#00f2fe',
        borderWidth: 2,
        pointBackgroundColor: '#4facfe',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00f2fe'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          angleLines: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            backdropColor: 'transparent',
            color: '#6b7280'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });

  // 2. Draw Weekly Study Hours Line Chart
  if (hoursChartInstance) hoursChartInstance.destroy();

  hoursChartInstance = new Chart(ctxHours, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Minutes Spent',
        data: weeklyTimeSpent,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(161, 140, 209, 0.25)');
          gradient.addColorStop(1, 'rgba(161, 140, 209, 0)');
          return gradient;
        },
        borderColor: '#a18cd1',
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: '#a18cd1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          suggestedMin: 0
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// ============================================================================
// INTERACTIVE GEMINI AI CHATBOT LOGIC
// ============================================================================

// Toggle Chatbot Window visibility
function toggleChatbot() {
  const windowEl = document.getElementById('chatbot-window');
  if (!windowEl) return;
  
  windowEl.classList.toggle('show');
  
  if (windowEl.classList.contains('show')) {
    const inputEl = document.getElementById('chatbot-input');
    if (inputEl) inputEl.focus();
    
    // Parse the initial hardcoded message if it hasn't been parsed yet
    const initialBubble = document.querySelector('#chatbot-messages .chat-message.ai .chat-bubble');
    if (initialBubble && !initialBubble.dataset.parsed) {
      initialBubble.innerHTML = parseMarkdown(initialBubble.textContent.trim());
      initialBubble.dataset.parsed = "true";
    }
    
    scrollToBottom();
  }
}

// Send Suggested Prompt from quick action pills
function sendSuggestedPrompt(text) {
  const inputEl = document.getElementById('chatbot-input');
  if (!inputEl) return;
  inputEl.value = text;
  
  // Create and dispatch form submit event
  const formEl = document.getElementById('chatbot-form');
  if (formEl) {
    const event = new Event('submit', { cancelable: true });
    formEl.dispatchEvent(event);
  }
}

// Handle chatbot form submission
async function handleChatSubmit(event) {
  if (event) event.preventDefault();
  
  const inputEl = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const formEl = document.getElementById('chatbot-form');
  
  if (!inputEl || !messagesContainer) return;
  
  const userMessage = inputEl.value.trim();
  if (!userMessage) return;
  
  // 1. Render user message in UI
  appendMessage('user', userMessage);
  inputEl.value = '';
  scrollToBottom();
  
  // 2. Show typing indicator
  const typingIndicator = showTypingIndicator();
  scrollToBottom();
  
  // Disable input & button to prevent double submit
  const sendBtn = formEl ? formEl.querySelector('.chatbot-send-btn') : null;
  if (inputEl) inputEl.disabled = true;
  if (sendBtn) sendBtn.disabled = true;
  
  try {
    // 3. Make POST request to live context-aware AI route
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });
    
    // Remove typing indicator
    if (typingIndicator) typingIndicator.remove();
    
    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      appendMessage('ai', `❌ **Error:** ${data.error}`);
    } else {
      appendMessage('ai', data.reply);
    }
    
  } catch (err) {
    console.error('Chatbot API request error:', err);
    if (typingIndicator) typingIndicator.remove();
    appendMessage('ai', `⚠️ **Service Interruption**\n\nI was unable to establish a connection with the St. Mary's University AI engine. Please verify the server logs and check that your database and environment settings are correct.`);
  } finally {
    // Re-enable input & button
    if (inputEl) {
      inputEl.disabled = false;
      inputEl.focus();
    }
    if (sendBtn) sendBtn.disabled = false;
    scrollToBottom();
  }
}

// Append a message bubble to the messages log
function appendMessage(sender, text) {
  const container = document.getElementById('chatbot-messages');
  if (!container) return;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}`;
  
  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'chat-bubble';
  
  // If it's AI, parse markdown. If it's user, escape html but keep simple formatting if needed (usually plain text is fine)
  if (sender === 'ai') {
    bubbleDiv.innerHTML = parseMarkdown(text);
  } else {
    // Escape HTML to prevent XSS
    bubbleDiv.textContent = text;
  }
  
  msgDiv.appendChild(bubbleDiv);
  container.appendChild(msgDiv);
  return msgDiv;
}

// Show animated typing indicator
function showTypingIndicator() {
  const container = document.getElementById('chatbot-messages');
  if (!container) return null;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message ai';
  
  const bubbleDiv = document.createElement('div');
  bubbleDiv.className = 'chat-bubble';
  
  const indicatorDiv = document.createElement('div');
  indicatorDiv.className = 'typing-indicator';
  indicatorDiv.innerHTML = '<span></span><span></span><span></span>';
  
  bubbleDiv.appendChild(indicatorDiv);
  msgDiv.appendChild(bubbleDiv);
  container.appendChild(msgDiv);
  return msgDiv;
}

// Scroll chat window to the bottom
function scrollToBottom() {
  const container = document.getElementById('chatbot-messages');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

// Markdown-to-HTML parser function (Regex based, lightweight, secure)
function parseMarkdown(text) {
  if (!text) return '';
  
  // Escape raw HTML tags to prevent XSS
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  // Match fenced code blocks: ```lang ... ```
  html = html.replace(/```(?:[a-zA-Z0-9]+)?\n([\s\S]*?)```/g, (match, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });
  
  // Match inline code: `code`
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Match bold text: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Match markdown links: [link text](url) -> target="_blank"
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Handle line by line splits for lists
  const lines = html.split('\n');
  let inList = false;
  let inOList = false;
  let processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const bulletMatch = line.match(/^(\s*)([*-])\s+(.+)$/);
    const numMatch = line.match(/^(\s*)(\d+)\.\s+(.+)$/);
    
    if (bulletMatch) {
      if (inOList) {
        processedLines.push('</ol>');
        inOList = false;
      }
      if (!inList) {
        processedLines.push('<ul style="margin: 0.5rem 0; padding-left: 1.2rem; list-style-type: disc;">');
        inList = true;
      }
      processedLines.push(`<li style="margin-bottom: 0.25rem;">${bulletMatch[3]}</li>`);
    } else if (numMatch) {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      if (!inOList) {
        processedLines.push('<ol style="margin: 0.5rem 0; padding-left: 1.2rem; list-style-type: decimal;">');
        inOList = true;
      }
      processedLines.push(`<li style="margin-bottom: 0.25rem;">${numMatch[3]}</li>`);
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      if (inOList) {
        processedLines.push('</ol>');
        inOList = false;
      }
      processedLines.push(line);
    }
  }
  
  if (inList) processedLines.push('</ul>');
  if (inOList) processedLines.push('</ol>');
  
  html = processedLines.join('\n');
  
  // Double line breaks to paragraphs, single to breaks
  const paragraphs = html.split('\n\n');
  return paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    // If it's a block element, don't wrap in <p>
    if (p.startsWith('<pre>') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<li')) {
      return p;
    }
    return `<p style="margin-bottom: 0.5rem; line-height: 1.5;">${p.replace(/\n/g, '<br>')}</p>`;
  }).filter(p => p).join('');
}

