const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const cursorGlow = document.querySelector(".cursor-glow");

// Theme
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") body.classList.add("light");

function updateThemeIcon() {
  const icon = themeToggle.querySelector(".material-symbols-rounded");
  icon.textContent = body.classList.contains("light") ? "light_mode" : "dark_mode";
}
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem("portfolio-theme", body.classList.contains("light") ? "light" : "dark");
  updateThemeIcon();
});

// Cursor glow
window.addEventListener("pointermove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index * 45, 300)}ms`;
  observer.observe(el);
});

// Magnetic buttons
document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("pointermove", (e) => {
    const r = item.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.18;
    item.style.transform = `translate(${x}px, ${y}px)`;
  });
  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

// Project visual parallax
document.querySelectorAll(".project-visual").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    const shape = card.querySelector(".visual-shape");
    if (shape) shape.style.margin = `${y}px 0 0 ${x}px`;
  });
  card.addEventListener("pointerleave", () => {
    const shape = card.querySelector(".visual-shape");
    if (shape) shape.style.margin = "";
  });
});

// Prevent placeholder social links from jumping
document.querySelectorAll('.socials a[href="#"]').forEach(a => {
  a.addEventListener("click", e => e.preventDefault());
});
