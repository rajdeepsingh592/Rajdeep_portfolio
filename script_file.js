/* =====================================================
   1. SCROLL FADE-UP ANIMATION
   ===================================================== */
function downloadCV() {
  const files = [
    "Rajdeep_Singh.pdf",
    "Rajdeep_Singh.docx"
  ];

  files.forEach((file, index) => {
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = file;
      a.download = file;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, index * 500); // delay important hai
  });
}
// ===== GET AUDIO ELEMENT =====
const clickSound = document.getElementById("clickSound");

document.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
});
// ===== DOWNLOAD CV FILES ON BUTTON CLICK =====
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
    downloadBtn.addEventListener("click", (event) => {
        event.stopPropagation(); // prevent double sound

        const files = ["Rajdeep_Singh.pdf", "Rajdeep_Singh.docx"];
        files.forEach((file, index) => {
            setTimeout(() => {
                const a = document.createElement("a");
                a.href = file;
                a.download = file;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }, index * 500); // 500ms delay between downloads
        });
    });
}

const faders = document.querySelectorAll(".fade-up");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

faders.forEach(el => fadeObserver.observe(el));

/* =====================================================
   2. UI CLICK SOUND (AUTOPLAY SAFE)
   ===================================================== */
(() => {
  const sound = document.getElementById("uiClickSound");
  if (!sound) return;

  let unlocked = false;

  // Unlock audio on first user interaction
  const unlockAudio = () => {
    sound.play()
      .then(() => {
        sound.pause();
        sound.currentTime = 0;
        unlocked = true;
      })
      .catch(() => {});

    document.removeEventListener("click", unlockAudio);
  };

  document.addEventListener("click", unlockAudio, { once: true });

  // Play sound on UI elements
  document.addEventListener("click", (e) => {
    if (!unlocked) return;

    if (e.target.closest("a, button, i, .glass-card, .skill-item")) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  });
})();

/* =====================================================
   3. CANVAS BACKGROUND (SNOW / PARTICLES)
   ===================================================== */
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Particle generation
const particles = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2 + 1,
  s: Math.random() * 0.6 + 0.3
}));

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.8)";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.y += p.s * 2;
    p.x += Math.sin(p.y * 0.01);

    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =====================================================
   4. THEME TOGGLE (DARK / LIGHT)
   ===================================================== */
const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeBtn.textContent =
      document.body.classList.contains("light") ? "☀️" : "🌙";
  });
}
