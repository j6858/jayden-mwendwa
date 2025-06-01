document.addEventListener("DOMContentLoaded", function () {
  // --- Section Navigation ---
  const sections = document.querySelectorAll(".info-section");
  const navBtns = document.querySelectorAll(".nav-btn");
  const footerLinks = document.querySelectorAll(".footer-nav a");

  // Show only the selected section, but keep all sections visible by default
  function showSection(sectionId) {
    sections.forEach(section => {
      if (section.id === sectionId) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Initial: All sections visible
  sections.forEach(section => {
    section.style.display = "block";
  });

  // Nav bar buttons
  navBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const onclickAttr = btn.getAttribute("onclick");
      let sectionId = null;
      if (onclickAttr && onclickAttr.includes("showSection")) {
        sectionId = onclickAttr.match(/showSection\('([^']+)'\)/);
        if (sectionId && sectionId[1]) {
          showSection(sectionId[1]);
        }
      }
    });
  });

  // Footer links
  footerLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        const sectionId = href.substring(1);
        showSection(sectionId);
      }
    });
  });

  // Expose showSection globally for inline onclick
  window.showSection = showSection;

  // --- FAQ Toggle ---
  // Hide all answers initially
  document.querySelectorAll('.faq-answer').forEach(ans => {
    ans.style.display = "none";
  });

  window.toggleFaq = function (btn) {
    const card = btn.closest('.faq-card');
    const answer = card.querySelector('.faq-answer');
    const isOpen = card.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-card').forEach(c => {
      c.classList.remove('open');
      const toggle = c.querySelector('.faq-toggle');
      if (toggle) toggle.classList.remove('active');
      const ans = c.querySelector('.faq-answer');
      if (ans) ans.style.display = "none";
    });
    // Open if not already open
    if (!isOpen) {
      card.classList.add('open');
      btn.classList.add('active');
      if (answer) answer.style.display = "block";
    }
  };

  // --- Testimonials Carousel ---
  let currentTestimonial = 0;
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      if (i === index) {
        card.style.opacity = "1";
        card.style.zIndex = "2";
        card.classList.add('active');
        card.style.transition = "opacity 0.5s";
        card.style.display = "block";
      } else {
        card.style.opacity = "0";
        card.style.zIndex = "1";
        card.classList.remove('active');
        card.style.transition = "opacity 0.5s";
        setTimeout(() => {
          card.style.display = "none";
        }, 500);
      }
    });
  }

  window.showPrevTestimonial = function () {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  };

  window.showNextTestimonial = function () {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  };

  // Initialize testimonials
  testimonialCards.forEach((card, i) => {
    card.style.opacity = i === 0 ? "1" : "0";
    card.style.transition = "opacity 0.5s";
    card.style.display = i === 0 ? "block" : "none";
  });
  showTestimonial(currentTestimonial);

  // --- Optional: Button Feedback ---
  document.querySelectorAll(".info-section button").forEach((button) => {
    if (!button.classList.contains("faq-toggle")) {
      button.addEventListener("click", function () {
        // You can customize this alert or remove it
        // alert("Feature coming soon!");
      });
    }
  });
});