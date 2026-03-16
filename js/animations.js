// ================================
//  WAIT FOR GSAP + ScrollTrigger
// ================================
document.addEventListener("DOMContentLoaded", () => {

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);


  // ================================
  //  PAGE LOADER
  // ================================
  const loader = document.getElementById("pageLoader");

  window.addEventListener("load", () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        loader.classList.add("hidden");
        playHeroAnimations();
      }
    });
  });


  // ================================
  //  HERO ANIMATIONS
  //  (play after loader hides)
  // ================================
  function playHeroAnimations() {
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTl
      .to(".nav-logo", {
        opacity: 1,
        y: 0,
        duration: 0.6,
      })
      .to(".nav-links", {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, "-=0.4")
      .to(".nav-toggle", {
        opacity: 1,
        y: 0,
        duration: 0.4,
      }, "-=0.4")
      .to(".hero-tag", {
        opacity: 1,
        y: 0,
        duration: 0.7,
      }, "-=0.2")
      .to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.4")
      .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, "-=0.5")
      .to(".hero-desc", {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, "-=0.4")
      .to(".hero-btns", {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, "-=0.4");
  }


  // ================================
  //  SCROLL REVEAL — SECTIONS
  // ================================
  const fadeUpEls = document.querySelectorAll(
    ".section-label, .section-title, .section-sub, .divider"
  );

  fadeUpEls.forEach((el) => {
    el.classList.add("fade-up");

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  });


  // ================================
  //  SCROLL REVEAL — ABOUT
  // ================================
  gsap.to(".avatar-wrap", {
    scrollTrigger: {
      trigger: ".about-grid",
      start: "top 80%",
    },
    opacity: 1,
    x: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.to(".about-content", {
    scrollTrigger: {
      trigger: ".about-grid",
      start: "top 80%",
    },
    opacity: 1,
    x: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.to(".skill-tags .tag", {
    scrollTrigger: {
      trigger: ".skill-tags",
      start: "top 85%",
    },
    opacity: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.08,
    ease: "power2.out",
  });


  // ================================
  //  SCROLL REVEAL — PROJECT CARDS
  //  (called by sanity.js after
  //   cards are injected into DOM)
  // ================================
  window.animateCards = function (containerSelector) {
    const cards = document.querySelectorAll(
      `${containerSelector} .card`
    );

    cards.forEach((card) => {
      card.classList.add("scale-in");
    });

    gsap.to(`${containerSelector} .card`, {
      scrollTrigger: {
        trigger: containerSelector,
        start: "top 82%",
      },
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.12,
      ease: "power3.out",
    });
  };


  // ================================
  //  SCROLL REVEAL — CONTACT FORM
  // ================================
  gsap.to(".contact-form", {
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 85%",
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.to(".form-field", {
    scrollTrigger: {
      trigger: ".contact-form",
      start: "top 85%",
    },
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out",
  });


  // ================================
  //  NAVBAR — SCROLL EFFECT
  // ================================
  const navbar = document.getElementById("navbar");

  ScrollTrigger.create({
    start: "top -80px",
    onUpdate: (self) => {
      if (self.progress > 0) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
  });


  // ================================
  //  BACK TO TOP — SHOW/HIDE
  // ================================
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    ScrollTrigger.create({
      start: "top -400px",
      onEnter: () => backToTop.classList.add("visible"),
      onLeaveBack: () => backToTop.classList.remove("visible"),
    });
  }


  // ================================
  //  TYPING EFFECT — HERO SUBTITLE
  // ================================
  const typingEl = document.querySelector(".hero-subtitle");

  if (typingEl) {
    const phrases = [
      "Developer · Builder · AI Enthusiast",
      "HTML · CSS · JavaScript",
      "Building with AI tools",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    typingEl.classList.add("typing-cursor");

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 70;

      if (!isDeleting && charIndex === current.length) {
        speed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }

    // start typing after hero animates in
    setTimeout(type, 1800);
  }

});