/**
 * ElderCare - Core Booking Workflow & State Management
 * Handles step navigation, progress indicator, data validation, and localStorage persistence.
 */

const BOOKING_KEYS = {
  AUTH: 'eldercare_auth',
  BOOKING: 'eldercare_booking',
  FAMILY: 'eldercare_family',
  SENIOR: 'eldercare_senior',
  SCHEDULE: 'eldercare_schedule',
  PAYMENT: 'eldercare_payment',
  REVIEW_ACCEPTED: 'eldercare_review_accepted'
};

const BOOKING_STEPS = [
  { step: 1, id: 'service',  label: 'Service',  url: 'service-details.html' },
  { step: 2, id: 'family',   label: 'Family',   url: 'family-details.html' },
  { step: 3, id: 'senior',   label: 'Senior',   url: 'senior-details.html' },
  { step: 4, id: 'schedule', label: 'Schedule', url: 'schedule.html' },
  { step: 5, id: 'review',   label: 'Review',   url: 'review.html' },
  { step: 6, id: 'payment',  label: 'Payment',  url: 'payment.html' }
];

// ============================================================
// STORAGE GETTERS & SETTERS
// ============================================================

function getBookingAuth() {
  try {
    return JSON.parse(localStorage.getItem(BOOKING_KEYS.AUTH) || 'null');
  } catch (e) {
    return null;
  }
}

function isUserLoggedIn() {
  const auth = getBookingAuth();
  return !!(auth && auth.email);
}

function getBookingData() {
  try {
    return JSON.parse(localStorage.getItem(BOOKING_KEYS.BOOKING) || '{}') || {};
  } catch (e) {
    return {};
  }
}

function saveBookingData(data) {
  const current = getBookingData();
  const merged = Object.assign({}, current, data);
  localStorage.setItem(BOOKING_KEYS.BOOKING, JSON.stringify(merged));
  return merged;
}

function getFamilyData() {
  try {
    return JSON.parse(localStorage.getItem(BOOKING_KEYS.FAMILY) || 'null');
  } catch (e) {
    return null;
  }
}

function saveFamilyData(data) {
  localStorage.setItem(BOOKING_KEYS.FAMILY, JSON.stringify(data));
  saveBookingData({ family: data });
}

function getSeniorData() {
  try {
    return JSON.parse(localStorage.getItem(BOOKING_KEYS.SENIOR) || 'null');
  } catch (e) {
    return null;
  }
}

function saveSeniorData(data) {
  localStorage.setItem(BOOKING_KEYS.SENIOR, JSON.stringify(data));
  saveBookingData({ senior: data });
}

function getScheduleData() {
  try {
    return JSON.parse(localStorage.getItem(BOOKING_KEYS.SCHEDULE) || 'null');
  } catch (e) {
    return null;
  }
}

function saveScheduleData(data) {
  localStorage.setItem(BOOKING_KEYS.SCHEDULE, JSON.stringify(data));
  saveBookingData({ schedule: data });
}

function getPaymentData() {
  try {
    return JSON.parse(localStorage.getItem(BOOKING_KEYS.PAYMENT) || 'null');
  } catch (e) {
    return null;
  }
}

function savePaymentData(data) {
  localStorage.setItem(BOOKING_KEYS.PAYMENT, JSON.stringify(data));
  saveBookingData({ payment: data });
}

/**
 * Returns currently selected service object
 */
function getSelectedService() {
  const booking = getBookingData();
  const serviceId = booking.serviceId || 'day-care';
  if (typeof getServiceById === 'function') {
    return getServiceById(serviceId);
  }
  return {
    id: serviceId,
    title: booking.serviceName || 'Day Care & Companionship',
    price: booking.servicePrice || 12000,
    registrationFee: booking.registrationFee || 500
  };
}

/**
 * Sets selected service in booking draft
 */
function setSelectedService(serviceId) {
  let svc = null;
  if (typeof getServiceById === 'function') {
    svc = getServiceById(serviceId);
  }
  if (!svc) {
    svc = { id: serviceId, title: 'Day Care & Companionship', price: 12000, registrationFee: 500 };
  }
  saveBookingData({
    serviceId: svc.id,
    serviceName: svc.title,
    servicePrice: svc.price,
    registrationFee: svc.registrationFee || 500
  });
  return svc;
}

/**
 * Calculates dynamic pricing based on selected service and schedule
 */
function calculatePricing(customSchedule) {
  const service = getSelectedService();
  const schedule = customSchedule || getScheduleData();

  let basePrice = service.price || 12000;
  const registrationFee = service.registrationFee || 500;

  // If schedule specifies time slot multiplier (e.g., Half Day vs Full Day)
  if (schedule && schedule.timeSlot) {
    if (schedule.timeSlot === 'Morning' || schedule.timeSlot === 'Afternoon') {
      basePrice = Math.round(service.price * 0.75);
    }
  }

  // If schedule has specific days count
  if (schedule && Array.isArray(schedule.selectedDays) && schedule.selectedDays.length > 0) {
    const daysCount = schedule.selectedDays.length;
    if (daysCount <= 3) {
      basePrice = Math.round(basePrice * 0.7);
    } else if (daysCount <= 5) {
      basePrice = Math.round(basePrice * 0.9);
    }
  }

  const totalAmount = basePrice + registrationFee;

  const pricing = {
    serviceFee: basePrice,
    registrationFee: registrationFee,
    total: totalAmount,
    formattedServiceFee: formatCurrency(basePrice),
    formattedRegistrationFee: formatCurrency(registrationFee),
    formattedTotal: formatCurrency(totalAmount)
  };

  saveBookingData({ pricing: pricing });
  return pricing;
}

// ============================================================
// PROGRESS BAR COMPONENT
// ============================================================

function renderProgressBar(activeStepNumber) {
  const container = document.getElementById('bookingProgressContainer');
  if (!container) return;

  const stepsHtml = BOOKING_STEPS.map((s, idx) => {
    const isCompleted = s.step < activeStepNumber;
    const isActive = s.step === activeStepNumber;
    const isUpcoming = s.step > activeStepNumber;

    let stepClass = 'bk-step';
    if (isCompleted) stepClass += ' completed';
    if (isActive) stepClass += ' active';
    if (isUpcoming) stepClass += ' upcoming';

    const stepNumberFormatted = s.step < 10 ? '0' + s.step : s.step;

    const checkmarkSvg = `<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 8.5 6.5 12 13 4"/></svg>`;

    return `
      <div class="${stepClass}" id="stepIndicator_${s.id}">
        <div class="bk-step-bubble">
          <div class="bk-step-circle" aria-label="Step ${s.step}: ${s.label}">
            ${isCompleted ? checkmarkSvg : stepNumberFormatted}
          </div>
          <span class="bk-step-label">${s.label}</span>
        </div>
        ${idx < BOOKING_STEPS.length - 1 ? `<div class="bk-step-line" aria-hidden="true"></div>` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="booking-progress" role="progressbar" aria-valuenow="${activeStepNumber}" aria-valuemin="1" aria-valuemax="6" aria-label="Booking Progress">
      <div class="booking-progress-inner">
        <div class="booking-steps">
          ${stepsHtml}
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// STEP GUARDS (REDIRECT IF REQUIRED PREVIOUS STEP MISSING)
// ============================================================

function enforceBookingGuard(currentStepNumber) {
  // Check if service is selected; default to 'day-care' if not
  const booking = getBookingData();
  if (!booking.serviceId) {
    setSelectedService('day-care');
  }

  // Step 2: Family Details
  // Needs service selection (already guaranteed)

  // Step 3: Senior Details
  if (currentStepNumber >= 3) {
    const family = getFamilyData();
    if (!family || !family.fullName || !family.email || !family.phone) {
      window.location.replace('family-details.html?notice=missing_family');
      return false;
    }
  }

  // Step 4: Schedule
  if (currentStepNumber >= 4) {
    const senior = getSeniorData();
    if (!senior || !senior.fullName) {
      window.location.replace('senior-details.html?notice=missing_senior');
      return false;
    }
  }

  // Step 5: Review
  if (currentStepNumber >= 5) {
    const schedule = getScheduleData();
    if (!schedule || !schedule.startDate || !schedule.selectedDays || schedule.selectedDays.length === 0) {
      window.location.replace('schedule.html?notice=missing_schedule');
      return false;
    }
  }

  // Step 6: Payment
  if (currentStepNumber >= 6) {
    const termsAccepted = localStorage.getItem(BOOKING_KEYS.REVIEW_ACCEPTED);
    if (!termsAccepted) {
      window.location.replace('review.html?notice=confirm_review');
      return false;
    }
  }

  return true;
}

// ============================================================
// FORM VALIDATION HELPERS
// ============================================================

function setInputError(fieldId, errorMessage) {
  const field = document.getElementById(fieldId);
  const group = field ? field.closest('.form-group') : null;
  const errorEl = document.getElementById(fieldId + 'Error');

  if (field) {
    field.classList.add('is-error');
  }
  if (group) {
    group.classList.add('has-error');
  }
  if (errorEl) {
    errorEl.textContent = errorMessage;
    errorEl.style.display = 'block';
  }
}

function clearInputError(fieldId) {
  const field = document.getElementById(fieldId);
  const group = field ? field.closest('.form-group') : null;
  const errorEl = document.getElementById(fieldId + 'Error');

  if (field) {
    field.classList.remove('is-error');
  }
  if (group) {
    group.classList.remove('has-error');
  }
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
}

function clearAllErrors(formElement) {
  if (!formElement) return;
  formElement.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'));
  formElement.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
  formElement.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

function isValidPhone(phone) {
  const cleaned = String(phone).replace(/[\s\-\(\)\+]/g, '');
  return cleaned.length >= 8 && cleaned.length <= 15;
}
