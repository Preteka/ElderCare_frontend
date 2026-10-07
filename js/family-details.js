/**
 * ElderCare - Family Details Step Logic
 * Handles validation, pre-filling from localStorage/auth, preferred contact methods, and transition to Senior Details.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFamilyDetailsPage();
});

function initFamilyDetailsPage() {
  // Render Step 2 in progress bar
  if (typeof renderProgressBar === 'function') {
    renderProgressBar(2);
  }

  // Pre-fill form from saved data or auth
  prefillFamilyData();

  // Setup radio/pill selector for contact method
  initContactMethodSelectors();

  // Setup form submission
  const form = document.getElementById('familyDetailsForm');
  if (form) {
    form.addEventListener('submit', handleFamilySubmit);
  }

  // Auto clear errors on input
  const inputs = form ? form.querySelectorAll('input, select, textarea') : [];
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.id) clearInputError(input.id);
    });
    input.addEventListener('change', () => {
      if (input.id) clearInputError(input.id);
    });
  });
}

function initContactMethodSelectors() {
  const options = document.querySelectorAll('.js-contact-method-opt');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });
  });
}

function prefillFamilyData() {
  const savedFamily = typeof getFamilyData === 'function' ? getFamilyData() : null;
  const auth = typeof getBookingAuth === 'function' ? getBookingAuth() : null;

  const nameVal = (savedFamily && savedFamily.fullName) || (auth && auth.fullName) || '';
  const emailVal = (savedFamily && savedFamily.email) || (auth && auth.email) || '';
  const phoneVal = (savedFamily && savedFamily.phone) || (auth && auth.phone) || '';
  const relVal = (savedFamily && savedFamily.relationship) || 'Daughter';
  const altPhoneVal = (savedFamily && savedFamily.altPhone) || '';
  const addressVal = (savedFamily && savedFamily.address) || '';
  const cityVal = (savedFamily && savedFamily.city) || 'Coimbatore';
  const stateVal = (savedFamily && savedFamily.state) || 'Tamil Nadu';
  const emergNameVal = (savedFamily && savedFamily.emergencyName) || '';
  const emergPhoneVal = (savedFamily && savedFamily.emergencyPhone) || '';
  const contactMethod = (savedFamily && savedFamily.preferredContact) || 'Phone';

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.value = val;
  };

  setVal('familyName', nameVal);
  setVal('familyEmail', emailVal);
  setVal('familyPhone', phoneVal);
  setVal('familyRelationship', relVal);
  setVal('familyAltPhone', altPhoneVal);
  setVal('familyAddress', addressVal);
  setVal('familyCity', cityVal);
  setVal('familyState', stateVal);
  setVal('emergencyName', emergNameVal);
  setVal('emergencyPhone', emergPhoneVal);

  // Set contact method radio
  const methodRadios = document.querySelectorAll('input[name="preferredContact"]');
  methodRadios.forEach(r => {
    if (r.value.toLowerCase() === contactMethod.toLowerCase()) {
      r.checked = true;
      const parentLabel = r.closest('.radio-option');
      if (parentLabel) parentLabel.classList.add('selected');
    }
  });
}

function handleFamilySubmit(e) {
  e.preventDefault();
  clearAllErrors(e.target);

  const name = document.getElementById('familyName');
  const relationship = document.getElementById('familyRelationship');
  const email = document.getElementById('familyEmail');
  const phone = document.getElementById('familyPhone');
  const altPhone = document.getElementById('familyAltPhone');
  const address = document.getElementById('familyAddress');
  const city = document.getElementById('familyCity');
  const state = document.getElementById('familyState');
  const emergName = document.getElementById('emergencyName');
  const emergPhone = document.getElementById('emergencyPhone');
  const selectedContactRadio = document.querySelector('input[name="preferredContact"]:checked');

  let hasError = false;

  if (!name || !name.value.trim()) {
    setInputError('familyName', 'Please enter your full name.');
    hasError = true;
  }

  if (!relationship || !relationship.value.trim()) {
    setInputError('familyRelationship', 'Please specify your relationship to the senior.');
    hasError = true;
  }

  if (!email || !email.value.trim()) {
    setInputError('familyEmail', 'Please enter your email address.');
    hasError = true;
  } else if (!isValidEmail(email.value.trim())) {
    setInputError('familyEmail', 'Please enter a valid email address.');
    hasError = true;
  }

  if (!phone || !phone.value.trim()) {
    setInputError('familyPhone', 'Please enter your phone number.');
    hasError = true;
  } else if (!isValidPhone(phone.value.trim())) {
    setInputError('familyPhone', 'Please enter a valid phone number (at least 10 digits).');
    hasError = true;
  }

  if (altPhone && altPhone.value.trim() && !isValidPhone(altPhone.value.trim())) {
    setInputError('familyAltPhone', 'Please enter a valid alternate phone number.');
    hasError = true;
  }

  if (!address || !address.value.trim()) {
    setInputError('familyAddress', 'Please enter your street address.');
    hasError = true;
  }

  if (!city || !city.value.trim()) {
    setInputError('familyCity', 'Please enter your city.');
    hasError = true;
  }

  if (!state || !state.value.trim()) {
    setInputError('familyState', 'Please enter your state.');
    hasError = true;
  }

  if (!emergName || !emergName.value.trim()) {
    setInputError('emergencyName', 'Please enter an emergency contact name.');
    hasError = true;
  }

  if (!emergPhone || !emergPhone.value.trim()) {
    setInputError('emergencyPhone', 'Please enter an emergency contact phone.');
    hasError = true;
  } else if (!isValidPhone(emergPhone.value.trim())) {
    setInputError('emergencyPhone', 'Please enter a valid phone number.');
    hasError = true;
  }

  if (hasError) {
    const firstErr = document.querySelector('.is-error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const familyData = {
    fullName: name.value.trim(),
    relationship: relationship.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    altPhone: altPhone ? altPhone.value.trim() : '',
    address: address.value.trim(),
    city: city.value.trim(),
    state: state.value.trim(),
    emergencyName: emergName.value.trim(),
    emergencyPhone: emergPhone.value.trim(),
    preferredContact: selectedContactRadio ? selectedContactRadio.value : 'Phone',
    updatedAt: new Date().toISOString()
  };

  saveFamilyData(familyData);

  // Button transition
  const submitBtn = document.getElementById('familySubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Saving &amp; Continuing...</span>`;
  }

  setTimeout(() => {
    window.location.href = 'senior-details.html';
  }, 350);
}
