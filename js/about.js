/**
 * ElderCare – About Us Page JavaScript
 * Features: testimonial slider, scroll reveal, counters
 */

'use strict';

/* --------------------------------------------------------------------------
   ABOUT TESTIMONIALS SLIDER
   -------------------------------------------------------------------------- */
function initAboutTestimonialSlider() {
  var slides = document.querySelectorAll('.about-testi-slide');
  var dots = document.querySelectorAll('.about-testi-dot');
  var prevBtn = document.getElementById('aboutTestiPrev');
  var nextBtn = document.getElementById('aboutTestiNext');

  if (!slides.length) return;

  var current = 0;

  function showSlide(index) {
    slides.forEach(function(s, i) {
      s.classList.toggle('is-active', i === index);
    });
    dots.forEach(function(d, i) {
      d.classList.toggle('is-active', i === index);
    });
    current = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      var prev = (current - 1 + slides.length) % slides.length;
      showSlide(prev);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      var next = (current + 1) % slides.length;
      showSlide(next);
    });
  }

  dots.forEach(function(dot, i) {
    dot.addEventListener('click', function() { showSlide(i); });
  });

  // Auto-advance every 6 seconds
  var autoInterval = setInterval(function() {
    showSlide((current + 1) % slides.length);
  }, 6000);

  // Pause on hover
  var container = document.querySelector('.about-testi-slider');
  if (container) {
    container.addEventListener('mouseenter', function() { clearInterval(autoInterval); });
  }

  showSlide(0);
}

/* --------------------------------------------------------------------------
   SCROLL REVEAL (Consistent with main.js and style.css .is-revealed)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(function(el) {
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
   COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initCounters() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = el.getAttribute('data-count');
        var isPercent = target.includes('%');
        var isPlus = target.includes('+');
        var numStr = target.replace('%', '').replace('+', '');
        var num = parseFloat(numStr);
        var duration = 1600;
        var start = null;

        function step(ts) {
          if (!start) start = ts;
          var progress = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.floor(eased * num);
          el.textContent = current + (isPlus ? '+' : '') + (isPercent ? '%' : '');
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }

        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function(c) { observer.observe(c); });
}

/* --------------------------------------------------------------------------
   INIT
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
  initAboutTestimonialSlider();
  initScrollReveal();
  initCounters();
});
