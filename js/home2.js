/**
 * ElderCare – Home 2 (Family Care Experience) JavaScript
 * Features: Interactive Feature Tabs, Testimonial Slider, Animated Counters, FAQ Accordion, Timeline Steps
 */

'use strict';

/* --------------------------------------------------------------------------
   1. INTERACTIVE FEATURE TABS
   -------------------------------------------------------------------------- */
function initFeatureTabs() {
  const tabBtns = document.querySelectorAll('.h2-tab-btn');
  const tabPanels = document.querySelectorAll('.h2-tab-panel');

  if (!tabBtns.length || !tabPanels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button states
      tabBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility
      tabPanels.forEach(panel => {
        if (panel.id === `tab-panel-${targetTab}`) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   2. TESTIMONIAL SLIDER
   -------------------------------------------------------------------------- */
function initHome2Testimonials() {
  const slides = document.querySelectorAll('.h2-testi-slide');
  const prevBtn = document.getElementById('h2TestiPrev');
  const nextBtn = document.getElementById('h2TestiNext');

  if (!slides.length) return;

  let current = 0;
  let autoTimer = null;

  function showSlide(index) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === index);
    });
    current = index;
  }

  function nextSlide() {
    const next = (current + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (current - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

  function startTimer() {
    autoTimer = setInterval(nextSlide, 6000);
  }

  function resetTimer() {
    clearInterval(autoTimer);
    startTimer();
  }

  const sliderBox = document.querySelector('.h2-testi-slider');
  if (sliderBox) {
    sliderBox.addEventListener('mouseenter', () => clearInterval(autoTimer));
    sliderBox.addEventListener('mouseleave', () => startTimer());
  }

  showSlide(0);
  startTimer();
}

/* --------------------------------------------------------------------------
   3. ANIMATED STATISTICS COUNTER
   -------------------------------------------------------------------------- */
function initHome2Counters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const targetStr = el.getAttribute('data-count');
      const isPercent = targetStr.includes('%');
      const isPlus = targetStr.includes('+');
      const num = parseFloat(targetStr.replace('%', '').replace('+', ''));
      const duration = 1600;
      let start = null;

      function step(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(eased * num);
        el.textContent = currentVal + (isPlus ? '+' : '') + (isPercent ? '%' : '');

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = targetStr;
        }
      }

      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   4. FAQ ACCORDION (SMOOTH MAX-HEIGHT & ACCESSIBLE)
   -------------------------------------------------------------------------- */
function initHome2Faq() {
  const faqItems = document.querySelectorAll('.h2-faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.h2-faq-question');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all items
      faqItems.forEach(i => {
        i.classList.remove('is-open');
        const b = i.querySelector('.h2-faq-question');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. TIMELINE STEP INTERACTION ON SCROLL
   -------------------------------------------------------------------------- */
function initHome2Timeline() {
  const steps = document.querySelectorAll('.h2-step');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
      }
    });
  }, { threshold: 0.5 });

  steps.forEach(s => observer.observe(s));
}

/* --------------------------------------------------------------------------
   INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initFeatureTabs();
  initHome2Testimonials();
  initHome2Counters();
  initHome2Faq();
  initHome2Timeline();
});
