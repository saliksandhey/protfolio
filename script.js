// ===================================================
// CUSTOM CURSOR
// ===================================================
const cursor = document.querySelector(".cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .skill-card, .work-card, .icon").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
  });
}

// ===================================================
// EMAILJS
// ===================================================
(function () {
  emailjs.init("cR87XXicmQbNyiE13");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_eg4lgnu", "template_contact_us", this).then(
    function () {
      document.getElementById("status").innerText = "Message sent successfully ✔";
      document.getElementById("contact-form").reset();
    },
    function (error) {
      document.getElementById("status").innerText = "Error sending message ❌";
      console.log("EmailJS Error:", error);
    }
  );
});

// ===================================================
// MOBILE MENU
// ===================================================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

document.querySelectorAll("#navMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// ===================================================
// GSAP ANIMATIONS
// ===================================================
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
gsap.from(".hero-greeting", { opacity: 0, y: 20, duration: 0.8, delay: 0.4 });
gsap.from(".hero-name", { opacity: 0, y: 40, duration: 1, delay: 0.6 });
gsap.from(".hero-role", { opacity: 0, x: -30, duration: 0.8, delay: 0.9 });
gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, delay: 1.1 });
gsap.from(".hero-buttons", { opacity: 0, y: 20, duration: 0.8, delay: 1.3 });
gsap.from(".hero-social-row", { opacity: 0, y: 20, duration: 0.8, delay: 1.5 });
gsap.from(".hero-card", { opacity: 0, scale: 0.9, rotation: 5, duration: 1.2, delay: 0.8, ease: "back.out(1.7)" });
gsap.from(".float-element", { opacity: 0, scale: 0, duration: 0.6, delay: 1.5, stagger: 0.15, ease: "back.out(2)" });

// Typewriter effect
const roles = ["Content Creator & Designer", "YouTube Thumbnail Expert", "Brand Identity Designer", "UI/UX Developer"];
let roleIndex = 0;
const roleEl = document.getElementById("heroRoleText");

function typeRole() {
  if (!roleEl) return;
  const text = roles[roleIndex];
  roleEl.textContent = "";
  let i = 0;
  const typeInterval = setInterval(() => {
    roleEl.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        typeRole();
      }, 2500);
    }
  }, 50);
}
setTimeout(typeRole, 2000);

// Scroll-triggered reveal — using IntersectionObserver for 100% reliability
const revealElements = document.querySelectorAll(
  ".about-section .section-badge, .about-section .title, .about-content .text, " +
  ".section-title, .section-subtitle, .skill-card, " +
  ".work-section .section-badge, .work-section .title, .work-card, " +
  ".contact-left h2, .contact-left p, .local-info, .contact-form, " +
  ".social-title, .social-thought, .icon"
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
);

revealElements.forEach((el) => observer.observe(el));

// Refresh ScrollTrigger after everything loads
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
