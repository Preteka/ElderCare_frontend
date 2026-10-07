/**
 * ElderCare - Dynamic Service Details Page Logic
 * Reads service ID from URL, populates page content, and initiates booking flow.
 */

document.addEventListener('DOMContentLoaded', () => {
  initServiceDetailsPage();
});

function initServiceDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id') || urlParams.get('service') || 'day-care';

  const service = typeof getServiceById === 'function' ? getServiceById(serviceId) : null;
  if (!service) return;

  // Update Page Meta & Header
  document.title = `${service.title} – ElderCare | Specialized Senior Care`;

  const headerEyebrow = document.getElementById('svcHeaderEyebrow');
  const headerTitle = document.getElementById('svcHeaderTitle');
  const headerDesc = document.getElementById('svcHeaderDesc');

  if (headerEyebrow) headerEyebrow.textContent = 'OUR SERVICES';
  if (headerTitle) headerTitle.innerHTML = `${service.title}`;
  if (headerDesc) headerDesc.textContent = service.shortDescription;

  // Hero Section
  const heroTitle = document.getElementById('svcHeroTitle');
  const heroDesc = document.getElementById('svcHeroDesc');
  const heroImg = document.getElementById('svcHeroImg');
  const heroCategory = document.getElementById('svcHeroCategory');
  const heroPrice = document.getElementById('svcHeroPrice');

  if (heroCategory) heroCategory.textContent = service.category || 'Specialized Care';
  if (heroTitle) heroTitle.textContent = service.title;
  if (heroDesc) heroDesc.textContent = service.shortDescription;
  if (heroPrice) heroPrice.textContent = `Starting from ${formatCurrency(service.price)} / month`;

  if (heroImg) {
    heroImg.src = service.image;
    heroImg.alt = service.title;
    heroImg.onerror = function() {
      this.src = 'assets/images/service_daycare.jpg';
    };
  }

  // Hero Highlights
  const heroHighlightsContainer = document.getElementById('svcHeroHighlights');
  if (heroHighlightsContainer && service.features) {
    heroHighlightsContainer.innerHTML = service.features.slice(0, 4).map(feat => `
      <div class="svc-hero-highlight-item">
        <span class="svc-highlight-check" aria-hidden="true">
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8.5 6.5 12 13 4"/></svg>
        </span>
        <span>${feat}</span>
      </div>
    `).join('');
  }

  // About Detailed Description
  const aboutDesc = document.getElementById('svcAboutDescription');
  if (aboutDesc) {
    aboutDesc.textContent = service.fullDescription;
  }

  // What's Included Cards
  const includedContainer = document.getElementById('svcIncludedGrid');
  if (includedContainer) {
    const items = service.included || [
      { title: "Personal Attention", desc: "Dedicated caregivers attending to comfort and daily routines." },
      { title: "Daily Companionship", desc: "Meaningful conversations, peer bonding and social circles." },
      { title: "Activity Participation", desc: "Gentle exercises, arts, crafts and cognitive games." },
      { title: "Meal Support", desc: "Fresh, nutritious meals and hydration support throughout the day." },
      { title: "Family Communication", desc: "Regular daily updates, photo highlights and progress summaries." },
      { title: "Daily Routine Support", desc: "Assistance with hydration, rest intervals and medication reminders." }
    ];

    includedContainer.innerHTML = items.map((item, idx) => `
      <div class="svc-included-card reveal-up" style="transition-delay:${idx * 0.06}s">
        <div class="svc-included-icon-wrap" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h3 class="svc-included-title">${item.title}</h3>
        <p class="svc-included-desc">${item.desc}</p>
      </div>
    `).join('');
  }

  // Why Families Choose This Service (Benefits)
  const benefitsContainer = document.getElementById('svcBenefitsGrid');
  if (benefitsContainer && service.benefits) {
    benefitsContainer.innerHTML = service.benefits.map((b, idx) => `
      <div class="svc-benefit-card reveal-up" style="transition-delay:${idx * 0.08}s">
        <div class="svc-benefit-num">0${idx + 1}</div>
        <h3 class="svc-benefit-title">${b.title}</h3>
        <p class="svc-benefit-desc">${b.description}</p>
      </div>
    `).join('');
  }

  // Service Info Summary Box
  const infoDuration = document.getElementById('svcInfoDuration');
  const infoAvailability = document.getElementById('svcInfoAvailability');
  const infoSchedule = document.getElementById('svcInfoSchedule');
  const infoPrice = document.getElementById('svcInfoPrice');
  const infoRegFee = document.getElementById('svcInfoRegFee');

  if (infoDuration) infoDuration.textContent = service.duration || 'Monthly Enrollment';
  if (infoAvailability) infoAvailability.textContent = service.availability || '8:00 AM – 6:00 PM';
  if (infoSchedule) infoSchedule.textContent = service.schedule || 'Monday – Saturday';
  if (infoPrice) infoPrice.textContent = `${formatCurrency(service.price)} / month`;
  if (infoRegFee) infoRegFee.textContent = formatCurrency(service.registrationFee || 500);

  // Hook Up "Book This Service" Action Buttons
  const bookButtons = document.querySelectorAll('.js-book-service-btn');
  bookButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      startBookingFlow(service.id);
    });
  });

  // Re-run scroll animations
  if (typeof initScrollAnimations === 'function') {
    initScrollAnimations();
  }
}

/**
 * Initiates the booking flow with the selected service
 */
function startBookingFlow(serviceId) {
  if (typeof setSelectedService === 'function') {
    setSelectedService(serviceId);
  } else {
    try {
      const current = JSON.parse(localStorage.getItem('eldercare_booking') || '{}');
      current.serviceId = serviceId;
      localStorage.setItem('eldercare_booking', JSON.stringify(current));
    } catch(e) {}
  }

  // Check login status
  const auth = (function() {
    try { return JSON.parse(localStorage.getItem('eldercare_auth') || 'null'); }
    catch(e) { return null; }
  })();

  if (auth && auth.email) {
    window.location.href = 'family-details.html';
  } else {
    // Direct user to login/signup before continuing
    window.location.href = 'login.html?redirect=family-details.html';
  }
}
