/**
 * ElderCare - Master Application JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
  initScrollAnimations();
  initTestimonialSlider();
  initServiceCardsMobile();
});

/**
 * Loads Navbar and Footer dynamically and safely across all environments (file:// or http://)
 */
function loadComponents() {
  const navbarContainer = document.getElementById('navbar-container');
  const footerContainer = document.getElementById('footer-container');

  if (navbarContainer) {
    if (typeof renderNavbar === 'function') {
      renderNavbar(navbarContainer);
    } else if (typeof initNavbar === 'function') {
      initNavbar();
    }
  }

  if (footerContainer) {
    if (typeof renderFooter === 'function') {
      renderFooter(footerContainer);
    } else if (typeof initFooter === 'function') {
      initFooter();
    }
  }
}

/**
 * Scroll Reveal Animations via Intersection Observer
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback if observer not supported
    elements.forEach(el => el.classList.add('is-revealed'));
  }
}

/**
 * Interactive Testimonials Slider
 */
const testimonialData = [
  {
    quote: '"The team has created such a warm environment. Knowing my mother is comfortable and engaged every day gives our family great peace of mind."',
    name: 'Priya S.',
    role: 'Family Member',
    avatar: 'assets/images/testimonial_avatar.jpg',
    image: 'assets/images/testimonial_senior.jpg',
    tagline: 'Happier Seniors, Brighter Families'
  },
  {
    quote: '"ElderCare has been a second home for my father. The wellness programs and social activities have brought back his radiant smile and enthusiasm."',
    name: 'Rajesh Ramanathan',
    role: 'Son & Caregiver',
    avatar: 'assets/images/founder_avatar.jpg',
    image: 'assets/images/commitment_couple.jpg',
    tagline: 'Compassionate Care, Genuine Connection'
  },
  {
    quote: '"From morning yoga to engaging arts and daily wellness monitoring, the staff treats everyone like cherished family. Highly recommended!"',
    name: 'Ananya Deshmukh',
    role: 'Daughter of Resident',
    avatar: 'assets/images/testimonial_avatar.jpg',
    image: 'assets/images/about_senior_activity.jpg',
    tagline: 'Dignity, Joy & Peace of Mind'
  }
];

let currentTestimonialIndex = 0;

function initTestimonialSlider() {
  const prevBtn = document.getElementById('prevTestimonialBtn');
  const nextBtn = document.getElementById('nextTestimonialBtn');
  const quoteEl = document.getElementById('testimonialQuote');
  const nameEl = document.getElementById('testimonialAuthorName');
  const roleEl = document.getElementById('testimonialAuthorRole');
  const avatarEl = document.getElementById('testimonialAuthorAvatar');
  const imgEl = document.getElementById('testimonialSeniorImg');
  const badgeEl = document.getElementById('testimonialCursiveBadge');

  if (!prevBtn || !nextBtn || !quoteEl) return;

  function updateTestimonial(index) {
    const item = testimonialData[index];
    if (!item) return;

    // Smooth fade transition
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(8px)';

    setTimeout(() => {
      quoteEl.textContent = item.quote;
      if (nameEl) nameEl.textContent = item.name;
      if (roleEl) roleEl.textContent = item.role;
      if (avatarEl) avatarEl.src = item.avatar;
      if (imgEl) imgEl.src = item.image;
      if (badgeEl) badgeEl.textContent = item.tagline;

      quoteEl.style.transition = 'all 0.35s ease';
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
    }, 200);
  }

  prevBtn.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonialData.length) % testimonialData.length;
    updateTestimonial(currentTestimonialIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialData.length;
    updateTestimonial(currentTestimonialIndex);
  });
}

/**
 * Enable tap toggle for service cards on touch devices
 */
function initServiceCardsMobile() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (window.innerWidth <= 991) {
        const isCurrentlyActive = this.classList.contains('is-active-demo');
        cards.forEach(c => c.classList.remove('is-active-demo'));
        if (!isCurrentlyActive) {
          this.classList.add('is-active-demo');
        }
      }
    });
  });
}
