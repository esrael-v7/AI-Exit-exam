// AGGRESSIVE: Completely disable all animations and movements on exam/dashboard pages
const pathname = window.location.pathname;

if (pathname.startsWith('/exam') || pathname.startsWith('/dashboard')) {
  // Run immediately before anything loads
  const style = document.createElement('style');
  style.innerHTML = `
    /* Force disable ALL animations */
    * {
      animation: none !important;
      -webkit-animation: none !important;
      transition: none !important;
      -webkit-transition: none !important;
      transform: none !important;
      -webkit-transform: none !important;
    }

    /* Hide all animated background elements */
    .animated-gradient-bg,
    .glass-bg-blobs,
    .glowing-blob,
    .blob-cyan,
    .blob-purple,
    .blob-blue,
    .blob-green {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }

    /* Disable hover effects */
    *:hover {
      transform: none !important;
      -webkit-transform: none !important;
    }

    /* Stop all movement */
    @keyframes driftBlob1 { from { } to { } }
    @keyframes driftBlob2 { from { } to { } }
    @keyframes driftBlob3 { from { } to { } }
    @keyframes driftBlob4 { from { } to { } }
    @keyframes gradientShift { from { } to { } }
    @keyframes pulseGlow { from { } to { } }
    @keyframes fadeIn { from { opacity: 1; } to { opacity: 1; } }
    @keyframes tiltEffect { from { } to { } }
    @keyframes magneticPull { from { } to { } }

    /* Solid appearance */
    .tilt-card {
      perspective: none !important;
    }

    .magnetic-btn {
      cursor: pointer !important;
    }

    /* Remove any CSS that could cause movement */
    button, input, textarea, a {
      transition: none !important;
      animation: none !important;
    }
  `;
  document.head.insertBefore(style, document.head.firstChild);

  // Also hide the animated elements directly
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.glass-bg-blobs, .animated-gradient-bg').forEach(el => {
      el.style.display = 'none';
      el.style.visibility = 'hidden';
    });
  });

  // Hide before page renders
  const hideElements = document.querySelectorAll('.glass-bg-blobs, .animated-gradient-bg');
  hideElements.forEach(el => {
    el.style.display = 'none';
    el.style.visibility = 'hidden';
  });
}

