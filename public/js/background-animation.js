// Create animated background canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Style and append canvas
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-2';
canvas.style.pointerEvents = 'none';
document.body.insertBefore(canvas, document.body.firstChild);

// Particle system
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;

    // Theme-aware colors
    const isDark = !document.documentElement.hasAttribute('data-theme') ||
                   document.documentElement.getAttribute('data-theme') !== 'light';
    if (isDark) {
      const colors = ['rgba(0, 242, 254, ', 'rgba(79, 172, 254, ', 'rgba(161, 140, 209, ', 'rgba(0, 255, 135, '];
      this.color = colors[Math.floor(Math.random() * colors.length)] + this.opacity + ')';
    } else {
      const colors = ['rgba(37, 99, 235, ', 'rgba(124, 58, 237, ', 'rgba(5, 150, 105, '];
      this.color = colors[Math.floor(Math.random() * colors.length)] + (this.opacity * 0.6) + ')';
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around screen
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Create particles
const particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Draw connecting lines between nearby particles
function drawConnections() {
  const maxDistance = 150;

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const isDark = !document.documentElement.hasAttribute('data-theme') ||
                       document.documentElement.getAttribute('data-theme') !== 'light';
        const opacity = (1 - distance / maxDistance) * 0.2;
        ctx.strokeStyle = isDark
          ? `rgba(0, 242, 254, ${opacity})`
          : `rgba(37, 99, 235, ${opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

// Animation loop
function animate() {
  // Clear canvas with slight trail effect instead of full clear
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-dark');
  ctx.globalAlpha = 0.02;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;

  // Update and draw particles
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });

  // Draw connections
  drawConnections();

  requestAnimationFrame(animate);
}

// Start animation
animate();

// Recreate particles when theme changes
function handleThemeChange() {
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// Listen for theme changes
document.addEventListener('themeChanged', handleThemeChange);
