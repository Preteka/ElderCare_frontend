/**
 * ElderCare - Payment Step Logic
 * Handles payment method tabs (UPI, Card, Net Banking, Demo), validation, simulated processing,
 * generating transaction ID, and transitioning to payment success.
 * IMPORTANT: Scope ends at payment. Does NOT store sensitive card data.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPaymentPage();
});

function initPaymentPage() {
  // Enforce step guard
  if (typeof enforceBookingGuard === 'function') {
    if (!enforceBookingGuard(6)) return;
  }

  // Render Step 6 in progress bar
  if (typeof renderProgressBar === 'function') {
    renderProgressBar(6);
  }

  // Populate order summary
  populatePaymentSummary();

  // Setup tab switcher for payment methods
  initPaymentTabs();

  // Setup card input formatters
  initCardFormatters();

  // Setup form submit handlers
  initPaymentFormSubmissions();
}

function populatePaymentSummary() {
  const service = typeof getSelectedService === 'function' ? getSelectedService() : null;
  const senior = typeof getSeniorData === 'function' ? getSeniorData() : null;
  const schedule = typeof getScheduleData === 'function' ? getScheduleData() : null;
  const pricing = typeof calculatePricing === 'function' ? calculatePricing(schedule) : { serviceFee: 12000, registrationFee: 500, total: 12500 };

  if (service) {
    setText('paySumServiceName', service.title);
  }
  if (senior) {
    setText('paySumSeniorName', senior.fullName || 'Beloved Senior');
  }
  if (schedule) {
    setText('paySumScheduleDays', schedule.daysSummary || 'Monday – Friday');
    setText('paySumScheduleTime', `${schedule.timeSlot || 'Full Day'} (${schedule.arrivalTime || '8:30 AM'})`);
  }

  setText('paySumServiceFee', formatCurrency(pricing.serviceFee));
  setText('paySumRegFee', formatCurrency(pricing.registrationFee));
  setText('paySumTotal', formatCurrency(pricing.total));

  // Update dynamic amount in action buttons
  const dynamicTotalStr = formatCurrency(pricing.total);
  const upiBtnText = document.getElementById('payUpiBtnText');
  const cardBtnText = document.getElementById('payCardBtnText');
  const netBankingBtnText = document.getElementById('payNetBankingBtnText');

  if (upiBtnText) upiBtnText.textContent = `Pay ${dynamicTotalStr}`;
  if (cardBtnText) cardBtnText.textContent = `Pay ${dynamicTotalStr}`;
  if (netBankingBtnText) netBankingBtnText.textContent = `Pay ${dynamicTotalStr}`;
}

function initPaymentTabs() {
  const tabBtns = document.querySelectorAll('.js-payment-tab');
  const panels = document.querySelectorAll('.payment-method-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

function initCardFormatters() {
  const cardNum = document.getElementById('cardNumber');
  const cardExpiry = document.getElementById('cardExpiry');
  const cardCvv = document.getElementById('cardCvv');

  if (cardNum) {
    cardNum.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
      e.target.value = formatted;
      clearInputError('cardNumber');
    });
  }

  if (cardExpiry) {
    cardExpiry.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + ' / ' + val.substring(2);
      }
      e.target.value = val;
      clearInputError('cardExpiry');
    });
  }

  if (cardCvv) {
    cardCvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
      clearInputError('cardCvv');
    });
  }
}

function initPaymentFormSubmissions() {
  // 1. UPI Form
  const upiForm = document.getElementById('upiPaymentForm');
  if (upiForm) {
    upiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(upiForm);

      const upiId = document.getElementById('upiId');
      if (!upiId || !upiId.value.trim() || !upiId.value.includes('@')) {
        setInputError('upiId', 'Please enter a valid UPI ID (e.g. family@okaxis).');
        return;
      }
      processSimulatedPayment('UPI', document.getElementById('upiSubmitBtn'));
    });
  }

  // 2. Card Form
  const cardForm = document.getElementById('cardPaymentForm');
  if (cardForm) {
    cardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(cardForm);

      const cardNum = document.getElementById('cardNumber');
      const cardName = document.getElementById('cardName');
      const cardExpiry = document.getElementById('cardExpiry');
      const cardCvv = document.getElementById('cardCvv');

      let hasError = false;

      const rawNum = cardNum ? cardNum.value.replace(/\s/g, '') : '';
      if (!rawNum || rawNum.length < 15) {
        setInputError('cardNumber', 'Please enter a valid 16-digit card number.');
        hasError = true;
      }

      if (!cardName || !cardName.value.trim()) {
        setInputError('cardName', 'Please enter the name on your card.');
        hasError = true;
      }

      if (!cardExpiry || cardExpiry.value.trim().length < 5) {
        setInputError('cardExpiry', 'Enter MM/YY.');
        hasError = true;
      }

      if (!cardCvv || cardCvv.value.trim().length < 3) {
        setInputError('cardCvv', 'Enter 3-digit CVV.');
        hasError = true;
      }

      if (hasError) return;

      processSimulatedPayment('Card', document.getElementById('cardSubmitBtn'));
    });
  }

  // 3. Net Banking Form
  const netBankingForm = document.getElementById('netBankingPaymentForm');
  if (netBankingForm) {
    netBankingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearAllErrors(netBankingForm);

      const bankSelect = document.getElementById('bankSelect');
      if (!bankSelect || !bankSelect.value) {
        setInputError('bankSelect', 'Please select your bank.');
        return;
      }

      processSimulatedPayment(`Net Banking (${bankSelect.value})`, document.getElementById('netBankingSubmitBtn'));
    });
  }

  // 4. Demo Instant Payment Form
  const demoForm = document.getElementById('demoPaymentForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      processSimulatedPayment('Demo Simulation', document.getElementById('demoSubmitBtn'));
    });
  }
}

/**
 * Executes a realistic simulated payment with loading overlay
 */
function processSimulatedPayment(methodName, submitButton) {
  const schedule = typeof getScheduleData === 'function' ? getScheduleData() : null;
  const pricing = typeof calculatePricing === 'function' ? calculatePricing(schedule) : { total: 12500 };
  const service = typeof getSelectedService === 'function' ? getSelectedService() : { title: 'Day Care & Companionship' };
  const senior = typeof getSeniorData === 'function' ? getSeniorData() : { fullName: 'Senior' };
  const family = typeof getFamilyData === 'function' ? getFamilyData() : { fullName: 'Family' };

  // Disable buttons and show processing state
  if (submitButton) {
    submitButton.disabled = true;
  }

  showPaymentProcessingModal();

  // Generate Transaction ID: EC + YYYYMMDD + Random
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const rand = Math.floor(100 + Math.random() * 900);
  const transactionId = `EC${yyyy}${mm}${dd}${hh}${min}${rand}`;

  const paymentRecord = {
    transactionId: transactionId,
    amount: pricing.total,
    formattedAmount: formatCurrency(pricing.total),
    serviceName: service.title,
    seniorName: senior.fullName,
    familyName: family.fullName,
    paymentMethod: methodName,
    paymentStatus: 'Successful',
    paidAt: now.toISOString(),
    formattedDate: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  };

  // Persist only safe summary data
  localStorage.setItem('eldercare_payment', JSON.stringify(paymentRecord));
  if (typeof saveBookingData === 'function') {
    saveBookingData({ payment: paymentRecord, status: 'Completed' });
  }

  // Simulate payment processing delay (1.4 seconds)
  setTimeout(() => {
    window.location.href = 'payment-success.html';
  }, 1400);
}

function showPaymentProcessingModal() {
  let modal = document.getElementById('paymentProcessingOverlay');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'paymentProcessingOverlay';
    modal.className = 'payment-processing-overlay';
    modal.innerHTML = `
      <div class="payment-processing-card">
        <div class="payment-spinner" aria-hidden="true"></div>
        <h3 class="processing-title">Processing Payment...</h3>
        <p class="processing-desc">Please do not refresh or close this window.</p>
        <span class="processing-badge">Demo Mode • Simulated Checkout</span>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
