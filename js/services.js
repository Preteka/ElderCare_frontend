/**
 * ElderCare - Services Page Interactive Logic
 * Features:
 * 1. Dynamic Asymmetric Service Card Rendering & Category Filtering
 * 2. Interactive "A Day at ElderCare" Tabbed Preview
 * 3. Timeline Staggered Scroll Animation
 * 4. Booking Flow Triggering
 */

document.addEventListener('DOMContentLoaded', () => {
  initServicesCategoryFilter();
  initInteractiveServicePreview();
  initTimelineAnimations();
});

/**
 * 1. Category Filtering for All Services Section
 */
function initServicesCategoryFilter() {
  const filterPills = document.querySelectorAll('.js-svc-filter');
  const cards = document.querySelectorAll('.svc-card-item');

  if (!filterPills.length || !cards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active pill
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCategory = pill.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        
        if (selectedCategory === 'all' || cardCat.toLowerCase().includes(selectedCategory.toLowerCase())) {
          card.classList.remove('is-hidden');
          // Add smooth fade in
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'none';
          }, 40);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/**
 * 2. Interactive "Explore What a Day Can Look Like" Tabbed Preview
 */
const PREVIEW_DATA = {
  care: {
    badge: "CARE & COMPANIONSHIP",
    title: "Personal support & joyful companionship throughout the day.",
    desc: "From gentle morning arrival to afternoon departures, our dedicated team assists with mobility, comfort, daily routine pacing, and uplifting conversation.",
    bullets: [
      "Dedicated one-on-one attention & attentive caregivers",
      "Assisted hydration, rest intervals & comfort routines",
      "Welcoming social circles that build lasting friendships"
    ],
    image: "assets/images/service_daycare.jpg",
    alt: "Care & Companionship at ElderCare",
    serviceId: "day-care"
  },
  activities: {
    badge: "ENRICHMENT & MOVEMENT",
    title: "Creative, social and movement-based activities tailored for seniors.",
    desc: "Every day brings fresh stimulation — from morning gentle chair yoga and sensory art sessions to memory circles, board games, and musical storytelling.",
    bullets: [
      "Senior-friendly gentle yoga, balance & stretching",
      "Creative watercolor painting, craft & pottery workshops",
      "Cognitive games, quizzes & cheerful storytelling circles"
    ],
    image: "assets/images/service_activity.jpg",
    alt: "Senior Activity Programs",
    serviceId: "activity-programs"
  },
  wellness: {
    badge: "HOLISTIC WELLBEING",
    title: "Thoughtful daily wellbeing observations & gentle monitoring.",
    desc: "We observe energy levels, mood, hydration, and comfort with non-invasive daily check-ins, keeping families reassured with proactive daily updates.",
    bullets: [
      "Morning and afternoon mood & vitals observations",
      "Hydration tracking & medication schedule reminders",
      "Transparent daily digital care summary shared with family"
    ],
    image: "assets/images/service_wellness.jpg",
    alt: "Wellness & Daily Check-ins",
    serviceId: "wellness-checkins"
  },
  meals: {
    badge: "NUTRITION & DINING",
    title: "Freshly prepared, dietitian-approved meals and refreshments.",
    desc: "Good nutrition is the heart of vitality. Seniors enjoy warm herbal teas, wholesome traditional lunches, and afternoon snacks prepared to their dietary preferences.",
    bullets: [
      "Fresh morning herbal tea & nutritious warm breakfast",
      "Dietitian-curated balanced lunches (Diabetic & low-sodium options)",
      "Joyful communal dining that seniors genuinely look forward to"
    ],
    image: "assets/images/service_health.jpg",
    alt: "Meals & Nutrition Support",
    serviceId: "meals-nutrition"
  }
};

function initInteractiveServicePreview() {
  const tabBtns = document.querySelectorAll('.js-preview-tab');
  const badgeEl = document.getElementById('prevBadge');
  const titleEl = document.getElementById('prevTitle');
  const descEl = document.getElementById('prevDesc');
  const bulletsEl = document.getElementById('prevBullets');
  const imgEl = document.getElementById('prevImg');
  const ctaBtn = document.getElementById('prevCtaBtn');

  if (!tabBtns.length || !titleEl || !imgEl) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-tab');
      const data = PREVIEW_DATA[tabKey];
      if (!data) return;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Smooth transition
      imgEl.style.opacity = '0';
      titleEl.style.opacity = '0';

      setTimeout(() => {
        if (badgeEl) badgeEl.textContent = data.badge;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (imgEl) {
          imgEl.src = data.image;
          imgEl.alt = data.alt;
        }

        if (bulletsEl) {
          bulletsEl.innerHTML = data.bullets.map(b => `
            <div class="svc-preview-bullet-item">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="3 8.5 6.5 12 13 4"/></svg>
              <span>${b}</span>
            </div>
          `).join('');
        }

        if (ctaBtn) {
          ctaBtn.href = `service-details.html?id=${data.serviceId}`;
        }

        imgEl.style.transition = 'opacity 0.35s ease';
        titleEl.style.transition = 'opacity 0.35s ease';
        imgEl.style.opacity = '1';
        titleEl.style.opacity = '1';
      }, 150);
    });
  });
}

/**
 * 3. Timeline Staggered Scroll Animation
 */
function initTimelineAnimations() {
  const timelineNodes = document.querySelectorAll('.svc-timeline-node');
  if (!timelineNodes.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -30px 0px'
    });

    timelineNodes.forEach((node, idx) => {
      node.style.transitionDelay = `${idx * 0.08}s`;
      observer.observe(node);
    });
  } else {
    timelineNodes.forEach(n => n.classList.add('is-revealed'));
  }
}
