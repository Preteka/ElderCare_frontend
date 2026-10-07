/**
 * ElderCare - Schedule Step Logic
 * Handles day selection, time slots, start date, dynamic price updates, and transition to Review.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSchedulePage();
});

function initSchedulePage() {
  // Enforce step guard
  if (typeof enforceBookingGuard === 'function') {
    if (!enforceBookingGuard(4)) return;
  }

  // Render Step 4 in progress bar
  if (typeof renderProgressBar === 'function') {
    renderProgressBar(4);
  }

  // Setup start date constraints (min tomorrow)
  initStartDateInput();

  // Populate selected service badge
  renderSelectedServiceBadge();

  // Setup day selection pills
  initDaySelectors();

  // Setup time slot selectors
  initTimeSlotSelectors();

  // Setup arrival time listener
  const arrivalSelect = document.getElementById('arrivalTime');
  if (arrivalSelect) {
    arrivalSelect.addEventListener('change', updateLiveScheduleSummary);
  }

  // Pre-fill from saved data
  prefillScheduleData();

  // Initial calculation & live summary display
  updateLiveScheduleSummary();

  // Form submit handler
  const form = document.getElementById('scheduleForm');
  if (form) {
    form.addEventListener('submit', handleScheduleSubmit);
  }
}

function initStartDateInput() {
  const dateInput = document.getElementById('startDate');
  if (!dateInput) return;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  dateInput.min = minDate;
  if (!dateInput.value) {
    dateInput.value = minDate;
  }

  dateInput.addEventListener('change', () => {
    clearInputError('startDate');
    updateLiveScheduleSummary();
  });
}

function renderSelectedServiceBadge() {
  const badgeEl = document.getElementById('scheduleServiceBadge');
  const service = typeof getSelectedService === 'function' ? getSelectedService() : null;

  if (badgeEl && service) {
    badgeEl.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span>Selected Service: <strong>${service.title}</strong> (${formatCurrency(service.price)}/mo)</span>
    `;
  }
}

function initDaySelectors() {
  const dayPills = document.querySelectorAll('.js-day-pill');
  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
      const input = pill.querySelector('input[type="checkbox"]');
      if (input) {
        input.checked = pill.classList.contains('selected');
      }
      clearInputError('preferredDaysContainer');
      updateLiveScheduleSummary();
    });
  });
}

function initTimeSlotSelectors() {
  const timeSlots = document.querySelectorAll('.js-time-slot-card');
  timeSlots.forEach(card => {
    card.addEventListener('click', () => {
      timeSlots.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
      clearInputError('timeSlotsContainer');
      updateLiveScheduleSummary();
    });
  });
}

function prefillScheduleData() {
  const saved = typeof getScheduleData === 'function' ? getScheduleData() : null;
  if (!saved) return;

  if (saved.startDate) {
    const d = document.getElementById('startDate');
    if (d) d.value = saved.startDate;
  }

  if (saved.arrivalTime) {
    const arr = document.getElementById('arrivalTime');
    if (arr) arr.value = saved.arrivalTime;
  }

  if (Array.isArray(saved.selectedDays)) {
    document.querySelectorAll('.js-day-pill').forEach(pill => {
      const val = pill.getAttribute('data-day');
      if (saved.selectedDays.includes(val)) {
        pill.classList.add('selected');
        const chk = pill.querySelector('input');
        if (chk) chk.checked = true;
      } else {
        pill.classList.remove('selected');
        const chk = pill.querySelector('input');
        if (chk) chk.checked = false;
      }
    });
  }

  if (saved.timeSlot) {
    document.querySelectorAll('.js-time-slot-card').forEach(card => {
      const val = card.getAttribute('data-slot');
      if (val === saved.timeSlot) {
        card.classList.add('selected');
        const r = card.querySelector('input');
        if (r) r.checked = true;
      } else {
        card.classList.remove('selected');
      }
    });
  }
}

function getSelectedScheduleState() {
  const dateInput = document.getElementById('startDate');
  const arrivalSelect = document.getElementById('arrivalTime');

  const selectedDayPills = document.querySelectorAll('.js-day-pill.selected');
  const selectedDays = Array.from(selectedDayPills).map(p => p.getAttribute('data-day'));

  const activeTimeCard = document.querySelector('.js-time-slot-card.selected');
  const timeSlot = activeTimeCard ? activeTimeCard.getAttribute('data-slot') : 'Full Day';
  const timeSlotLabel = activeTimeCard ? (activeTimeCard.querySelector('.slot-name') ? activeTimeCard.querySelector('.slot-name').textContent.trim() : timeSlot) : 'Full Day (8:00 AM – 6:00 PM)';

  return {
    startDate: dateInput ? dateInput.value : '',
    selectedDays: selectedDays,
    timeSlot: timeSlot,
    timeSlotLabel: timeSlotLabel,
    arrivalTime: arrivalSelect ? arrivalSelect.value : '8:30 AM'
  };
}

function updateLiveScheduleSummary() {
  const schedule = getSelectedScheduleState();
  const service = typeof getSelectedService === 'function' ? getSelectedService() : { title: 'Day Care & Companionship', price: 12000, registrationFee: 500 };
  const pricing = typeof calculatePricing === 'function' ? calculatePricing(schedule) : { serviceFee: 12000, registrationFee: 500, total: 12500, formattedTotal: '₹12,500' };

  // Update UI Elements
  const sumService = document.getElementById('summaryServiceName');
  const sumDays = document.getElementById('summarySelectedDays');
  const sumTime = document.getElementById('summarySelectedTime');
  const sumServiceFee = document.getElementById('summaryServiceFee');
  const sumRegFee = document.getElementById('summaryRegFee');
  const sumTotal = document.getElementById('summaryTotalFee');

  if (sumService) sumService.textContent = service.title;

  if (sumDays) {
    if (schedule.selectedDays.length === 0) {
      sumDays.textContent = 'None selected';
      sumDays.style.color = '#C0392B';
    } else if (schedule.selectedDays.length === 6) {
      sumDays.textContent = 'Monday – Saturday (6 days / week)';
      sumDays.style.color = '';
    } else if (schedule.selectedDays.length === 5 && !schedule.selectedDays.includes('Saturday')) {
      sumDays.textContent = 'Monday – Friday (5 days / week)';
      sumDays.style.color = '';
    } else {
      sumDays.textContent = `${schedule.selectedDays.join(', ')} (${schedule.selectedDays.length} days / week)`;
      sumDays.style.color = '';
    }
  }

  if (sumTime) {
    sumTime.textContent = `${schedule.timeSlot} (Arrival: ${schedule.arrivalTime})`;
  }

  if (sumServiceFee) sumServiceFee.textContent = formatCurrency(pricing.serviceFee);
  if (sumRegFee) sumRegFee.textContent = formatCurrency(pricing.registrationFee);
  if (sumTotal) sumTotal.textContent = formatCurrency(pricing.total);
}

function handleScheduleSubmit(e) {
  e.preventDefault();
  clearAllErrors(e.target);

  const schedule = getSelectedScheduleState();
  let hasError = false;

  if (!schedule.startDate) {
    setInputError('startDate', 'Please choose your preferred starting date.');
    hasError = true;
  }

  if (!schedule.selectedDays || schedule.selectedDays.length === 0) {
    const container = document.getElementById('preferredDaysContainer');
    if (container) {
      container.classList.add('has-error');
      const err = document.getElementById('preferredDaysError');
      if (err) {
        err.textContent = 'Please select at least one preferred day of the week.';
        err.style.display = 'block';
      }
    }
    hasError = true;
  }

  if (!schedule.timeSlot) {
    const container = document.getElementById('timeSlotsContainer');
    if (container) {
      container.classList.add('has-error');
      const err = document.getElementById('timeSlotsError');
      if (err) {
        err.textContent = 'Please choose a preferred time slot.';
        err.style.display = 'block';
      }
    }
    hasError = true;
  }

  if (hasError) {
    const firstErr = document.querySelector('.has-error, .is-error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Calculate and store dynamic pricing
  const pricing = calculatePricing(schedule);

  const fullScheduleData = {
    startDate: schedule.startDate,
    selectedDays: schedule.selectedDays,
    daysSummary: schedule.selectedDays.length === 5 && !schedule.selectedDays.includes('Saturday')
      ? 'Monday – Friday'
      : (schedule.selectedDays.length === 6 ? 'Monday – Saturday' : schedule.selectedDays.join(', ')),
    daysCount: schedule.selectedDays.length,
    timeSlot: schedule.timeSlot,
    timeSlotLabel: schedule.timeSlotLabel,
    arrivalTime: schedule.arrivalTime,
    pricing: pricing,
    updatedAt: new Date().toISOString()
  };

  saveScheduleData(fullScheduleData);

  const submitBtn = document.getElementById('scheduleSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Saving &amp; Continuing...</span>`;
  }

  setTimeout(() => {
    window.location.href = 'review.html';
  }, 350);
}
