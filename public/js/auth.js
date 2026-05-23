/**
 * CLIENT-SIDE AUTHENTICATION & SESSION MANAGEMENT
 * St. Mary's University Exit Exam AI-Prep System
 */

// Toast notifications helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '<i class="fa-solid fa-circle-check"></i>';
  if (type === 'error') {
    icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
  } else if (type === 'info') {
    icon = '<i class="fa-solid fa-circle-info"></i>';
  }

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 50);

  // Auto remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Check session / get current user status
async function checkSession() {
  try {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      return data.user;
    }
  } catch (err) {
    console.error('Session check failed:', err);
  }
  return null;
}

// Register user
async function registerUser(full_name, email, password, department) {
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name, email, password, department })
    });

    const data = await res.json();
    
    if (res.ok) {
      showToast('Registration successful! Redirecting...', 'success');
      return true;
    } else {
      showToast(data.error || 'Registration failed.', 'error');
      return false;
    }
  } catch (err) {
    console.error('Registration API error:', err);
    showToast('Network error during registration.', 'error');
    return false;
  }
}

// Login user
async function loginUser(email, password) {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      showToast('Welcome back! Redirecting...', 'success');
      return true;
    } else {
      showToast(data.error || 'Login failed. Check credentials.', 'error');
      return false;
    }
  } catch (err) {
    console.error('Login API error:', err);
    showToast('Network error during login.', 'error');
    return false;
  }
}

// Logout user
async function logoutUser() {
  try {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      showToast('Logged out successfully.', 'success');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      showToast('Logout failed.', 'error');
    }
  } catch (err) {
    console.error('Logout API error:', err);
  }
}
