/**
 * ULTRA-PREMIUM MOTION & AESTHETIC CONTROLLER
 * AI-Based Exit Exam Prep System - St. Mary's University
 * 
 * Implements 3D card tilt, parallax layers, magnetic buttons, scroll reveals,
 * and high-fidelity micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all animation components
  initScrollReveal();
  initThreeDTilt();
  initMagneticButtons();
  initParallaxEffects();
});

/**
 * 1. SCROLL REVEAL ENGINE
 * Monitors viewport entries using IntersectionObserver and triggers smooth CSS entry animations
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up, .reveal-scale');
  
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Unobserve once revealed to maintain system performance
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * 2. INTERACTIVE 3D TILT ENGINE
 * Calculates cursor vectors on element boundaries and maps them to 3D perspective transforms
 */
function initThreeDTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    // Skip chatbot and exam question cards - keep them stable
    if (card.id === 'question-card-wrapper' || card.closest('#ai-recommendation-card') || card.closest('.ai-recommendation-card')) {
      return;
    }

    // Add internal reflection shine overlay dynamically if not already present
    if (!card.querySelector('.tilt-shine')) {
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      card.appendChild(shine);
    }

    const shine = card.querySelector('.tilt-shine');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation angles (max 15deg)
      const rotateX = ((centerY - y) / centerY) * 12;
      const rotateY = ((x - centerX) / centerX) * 12;

      // Update transform styles
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Calculate reflection gradient position
      if (shine) {
        const shineX = (x / rect.width) * 100;
        const shineY = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      // Smooth reset transition
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (shine) {
        shine.style.background = 'transparent';
      }
    });
  });
}

/**
 * 3. MAGNETIC CONTROLS ENGINE
 * Creates a magnetic hover effect where elements gently offset to track the cursor
 */
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic-btn');

  magneticButtons.forEach(btn => {
    // Skip buttons inside chatbot and exam card - keep them stable
    if (btn.closest('#question-card-wrapper') || btn.closest('.ai-recommendation-card') || btn.closest('#ai-recommendation-card')) {
      return;
    }

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Translate by a ratio of cursor displacement (max 15px)
      const moveX = x * 0.35;
      const moveY = y * 0.35;

      btn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;
      btn.style.transition = 'transform 0.05s ease-out';
    });

    btn.addEventListener('mouseleave', () => {
      // Smooth return transition
      btn.style.transform = 'translate(0px, 0px) scale(1)';
      btn.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });
}

/**
 * 4. PARALLAX LAYERS
 * Shifts decorative background elements relative to mouse cursor movements or scrolling
 */
function initParallaxEffects() {
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  // 3D Mouse Parallax
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    parallaxLayers.forEach(layer => {
      const depth = layer.getAttribute('data-depth') || 0.1;
      const moveX = mouseX * (depth * 50);
      const moveY = mouseY * (depth * 50);

      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
    });
  });
}
