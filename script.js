
// Contact form: fake submit
document.addEventListener('submit', (e) => {
  const f = e.target;
  if (f.matches('form.contact-form')) {
    e.preventDefault();
    const btn = f.querySelector('button');
    const orig = btn.textContent;
    btn.textContent = 'Message sent ✓';
    setTimeout(() => { btn.textContent = orig; f.reset(); }, 2200);
  }
});
// Year in footer
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
// Nav shadow on scroll
const nav = document.querySelector('.nav');
if (nav) {
  const on = () => nav.style.boxShadow = window.scrollY > 8 ? '0 1px 0 rgba(0,0,0,.04)' : 'none';
  on(); window.addEventListener('scroll', on, { passive:true });
}

// Duplicate work cards for seamless infinite marquee scroll
const workList = document.querySelector('.work-list');
if (workList) {
  const cards = Array.from(workList.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    workList.appendChild(clone);
  });
}

// ADDED: Duplicate "why me" cards for a seamless infinite auto-slide loop
const whyGrid = document.querySelector('.why-grid');
if (whyGrid) {
  const whyCards = Array.from(whyGrid.children);
  whyCards.forEach(card => {
    const clone = card.cloneNode(true);
    whyGrid.appendChild(clone);
  });
}

// ======================================================
// Always open the website at the Home section on refresh
// ======================================================

// Prevent browser from restoring previous scroll position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {

  // Remove URL hash (#about, #projects, etc.)
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
  }

  // Scroll to the very top instantly
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });

  // Scroll to Home section
  const homeSection = document.getElementById('top');

  if (homeSection) {
    homeSection.scrollIntoView({
      behavior: 'instant',
      block: 'start'
    });
  }
});

// =====================================================================
// PREMIUM SCROLL-REVEAL ANIMATIONS — ADDED
// Targets only card / box / grid / timeline / table sections:
// work projects, skill cards, process (timeline) items, experience
// (timeline) cards, education/certification/achievement boxes, and
// "why me" + services cards. Adds a reveal class + a staggered delay
// index via a CSS custom property, then reveals each element once via
// IntersectionObserver as it scrolls into view. Purely additive —
// does not alter existing markup, layout, or functionality.
// =====================================================================
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Adds a reveal class to every matched element and stamps a
  // --reveal-i custom property (used by CSS for staggered delays)
  function prepare(selector, className) {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
      el.classList.add(className);
      el.style.setProperty('--reveal-i', i);
    });
    return Array.from(els);
  }

  const revealTargets = [
    ...prepare('.work-list-wrapper', 'reveal'),     // Project/work cards (marquee)
    ...prepare('.skills-grid > div', 'reveal'),     // Skill cards
    ...prepare('.process-list .process-item', 'reveal-right'), // Process timeline cards — slide in from right, then fix in place
    ...prepare('.exp .exp-item', 'reveal'),         // Experience timeline cards
    ...prepare('.cols3 > div', 'reveal'),           // Education / certification / achievement boxes
    ...prepare('.why-grid-wrapper', 'reveal'),      // "Why me" auto-slide block (whole block, cards auto-rotate)
    ...prepare('.services .service', 'reveal'),     // Service cards
  ];

  // If motion is reduced or IntersectionObserver isn't supported,
  // just show everything immediately (no animation, no broken layout)
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // animate once per element
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));
})();