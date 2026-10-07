/**
 * ElderCare - Review Step Logic
 * Displays comprehensive summary of Family, Senior, Service, and Schedule.
 * Dynamically computes price summary, enforces terms checkbox validation, and routes to Payment.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReviewPage();
});

function initReviewPage() {
  // Enforce step guard
  if (typeof enforceBookingGuard === 'function') {
    if (!enforceBookingGuard(5)) return;
  }

  // Render Step 5 in progress bar
  if (typeof renderProgressBar === 'function') {
    renderProgressBar(5);
  }

  // Populate all sections from localStorage
  populateReviewDetails();

  // Setup Terms & Conditions toggle to enable/disable payment button
  initTermsCheckbox();

  // Setup continue button
  const form = document.getElementById('reviewForm');
  if (form) {
    form.addEventListener('submit', handleReviewSubmit);
  }
}

function populateReviewDetails() {
  const family = typeof getFamilyData === 'function' ? getFamilyData() : null;
  const senior = typeof getSeniorData === 'function' ? getSeniorData() : null;
  const service = typeof getSelectedService === 'function' ? getSelectedService() : null;
  const schedule = typeof getScheduleData === 'function' ? getScheduleData() : null;
  const pricing = typeof calculatePricing === 'function' ? calculatePricing(schedule) : { serviceFee: 12000, registrationFee: 500, total: 12500 };

  // 1. Family Section
  if (family) {
    setText('revFamilyName', family.fullName || '—');
    setText('revFamilyRel', family.relationship || 'Family Member');
    setText('revFamilyEmail', family.email || '—');
    setText('revFamilyPhone', family.phone || '—');
    setText('revFamilyAddress', `${family.address || ''}, ${family.city || ''} ${family.state || ''}`.trim() || '—');
    setText('revFamilyContactMethod', family.preferredContact || 'Phone');
    setText('revFamilyEmergency', `${family.emergencyName || '—'} (${family.emergencyPhone || '—'})`);
  }

  // 2. Senior Section
  if (senior) {
    setText('revSeniorName', senior.fullName || '—');
    setText('revSeniorAgeGender', `${senior.age || '—'} Years • ${senior.gender || 'Senior'}`);
    setText('revSeniorPrefName', senior.preferredName || senior.fullName || '—');
    setText('revSeniorMobility', senior.mobilitySupport || 'Independent');
    setText('revSeniorDiet', senior.dietaryPreference || 'Standard');
    setText('revSeniorInterests', Array.isArray(senior.interests) ? senior.interests.join(', ') : (senior.activityPreferences || 'General Care'));
    setText('revSeniorNotes', senior.additionalNotes || 'None specified');
  }

  // 3. Service Section
  if (service) {
    setText('revServiceName', service.title || 'Day Care & Companionship');
    setText('revServiceCategory', service.category || 'Specialized Care');
    setText('revServiceDuration', service.duration || 'Monthly Enrollment');
    setText('revServiceAvailability', service.availability || '8:00 AM – 6:00 PM');
    setText('revServicePrice', `${formatCurrency(service.price)} / month`);
  }

  // 4. Schedule Section
  if (schedule) {
    const formattedDate = formatDateDisplay(schedule.startDate);
    setText('revScheduleStartDate', formattedDate);
    setText('revScheduleDays', schedule.daysSummary || (Array.isArray(schedule.selectedDays) ? schedule.selectedDays.join(', ') : 'Monday – Friday'));
    setText('revScheduleTime', `${schedule.timeSlot || 'Full Day'} (Arrival: ${schedule.arrivalTime || '8:30 AM'})`);
  }

  // 5. Price Breakdown
  setText('revPriceServiceFee', formatCurrency(pricing.serviceFee));
  setText('revPriceRegFee', formatCurrency(pricing.registrationFee));
  setText('revPriceTotal', formatCurrency(pricing.total));
}

function initTermsCheckbox() {
  const termsCheckbox = document.getElementById('reviewTermsCheckbox');
  const payBtn = document.getElementById('reviewContinueToPaymentBtn');

  if (termsCheckbox && payBtn) {
    // Check if previously accepted
    if (localStorage.getItem(BOOKING_KEYS.REVIEW_ACCEPTED) === 'true') {
      termsCheckbox.checked = true;
      payBtn.disabled = false;
    } else {
      payBtn.disabled = true;
    }

    termsCheckbox.addEventListener('change', () => {
      payBtn.disabled = !termsCheckbox.checked;
      clearInputError('reviewTermsCheckbox');
      if (termsCheckbox.checked) {
        localStorage.setItem(BOOKING_KEYS.REVIEW_ACCEPTED, 'true');
      } else {
        localStorage.removeItem(BOOKING_KEYS.REVIEW_ACCEPTED);
      }
    });
  }
}

function handleReviewSubmit(e) {
  e.preventDefault();
  clearAllErrors(e.target);

  const termsCheckbox = document.getElementById('reviewTermsCheckbox');
  if (!termsCheckbox || !termsCheckbox.checked) {
    setInputError('reviewTermsCheckbox', 'Please accept the terms and conditions to proceed to payment.');
    const termsRow = document.getElementById('reviewTermsRow');
    if (termsRow) termsRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  localStorage.setItem(BOOKING_KEYS.REVIEW_ACCEPTED, 'true');

  const payBtn = document.getElementById('reviewContinueToPaymentBtn');
  if (payBtn) {
    payBtn.disabled = true;
    payBtn.innerHTML = `<span>Proceeding to Payment...</span>`;
  }

  setTimeout(() => {
    window.location.href = 'payment.html';
  }, 300);
}

function setText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = text;
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return 'Flexible';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}
