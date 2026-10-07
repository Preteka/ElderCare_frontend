/**
 * ElderCare - Senior Details Step Logic
 * Handles senior profile data, interest pills, mobility & dietary options, auto age calculation, and transition to Schedule.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSeniorDetailsPage();
});

function initSeniorDetailsPage() {
  // Step Guard check
  if (typeof enforceBookingGuard === 'function') {
    if (!enforceBookingGuard(3)) return;
  }

  // Render Step 3 in progress bar
  if (typeof renderProgressBar === 'function') {
    renderProgressBar(3);
  }

  // Pre-fill from saved data
  prefillSeniorData();

  // Setup DOB -> Age Auto-calculator
  initDobCalculator();

  // Setup "Same as family address" checkbox
  initSameAddressToggle();

  // Setup selectable interest and activity pills
  initPillSelectors();

  // Form submit handler
  const form = document.getElementById('seniorDetailsForm');
  if (form) {
    form.addEventListener('submit', handleSeniorSubmit);
  }

  // Error clearing
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

function initDobCalculator() {
  const dobInput = document.getElementById('seniorDob');
  const ageInput = document.getElementById('seniorAge');

  if (dobInput && ageInput) {
    dobInput.addEventListener('change', () => {
      if (!dobInput.value) return;
      const dob = new Date(dobInput.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age >= 40 && age <= 120) {
        ageInput.value = age;
        clearInputError('seniorAge');
      }
    });
  }
}

function initSameAddressToggle() {
  const checkbox = document.getElementById('sameAsFamilyAddress');
  const seniorAddress = document.getElementById('seniorAddress');

  if (checkbox && seniorAddress) {
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        const family = typeof getFamilyData === 'function' ? getFamilyData() : null;
        if (family && family.address) {
          seniorAddress.value = `${family.address}, ${family.city || ''} ${family.state || ''}`.trim();
          clearInputError('seniorAddress');
        }
      }
    });
  }
}

function initPillSelectors() {
  // Checkbox pills (Interests & Activities)
  const pillOptions = document.querySelectorAll('.js-tag-pill');
  pillOptions.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('selected');
      const input = pill.querySelector('input[type="checkbox"]');
      if (input) {
        input.checked = pill.classList.contains('selected');
      }
    });
  });
}

function prefillSeniorData() {
  const saved = typeof getSeniorData === 'function' ? getSeniorData() : null;
  if (!saved) return;

  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val !== undefined && val !== null) el.value = val;
  };

  setVal('seniorName', saved.fullName || '');
  setVal('seniorDob', saved.dob || '');
  setVal('seniorAge', saved.age || '');
  setVal('seniorGender', saved.gender || '');
  setVal('seniorPreferredName', saved.preferredName || '');
  setVal('seniorAddress', saved.address || '');
  setVal('seniorRoutine', saved.dailyRoutine || '');
  setVal('seniorMobility', saved.mobilitySupport || '');
  setVal('seniorDiet', saved.dietaryPreference || '');
  setVal('seniorNotes', saved.additionalNotes || '');

  // Select saved interest tags
  if (Array.isArray(saved.interests)) {
    saved.interests.forEach(interest => {
      const pill = document.querySelector(`.js-tag-pill[data-val="${interest}"]`);
      if (pill) {
        pill.classList.add('selected');
        const chk = pill.querySelector('input');
        if (chk) chk.checked = true;
      }
    });
  }
}

function handleSeniorSubmit(e) {
  e.preventDefault();
  clearAllErrors(e.target);

  const name = document.getElementById('seniorName');
  const dob = document.getElementById('seniorDob');
  const age = document.getElementById('seniorAge');
  const gender = document.getElementById('seniorGender');
  const preferredName = document.getElementById('seniorPreferredName');
  const address = document.getElementById('seniorAddress');
  const routine = document.getElementById('seniorRoutine');
  const mobility = document.getElementById('seniorMobility');
  const diet = document.getElementById('seniorDiet');
  const notes = document.getElementById('seniorNotes');

  let hasError = false;

  if (!name || !name.value.trim()) {
    setInputError('seniorName', 'Please enter your loved one’s full name.');
    hasError = true;
  }

  if (!age || !age.value.trim()) {
    setInputError('seniorAge', 'Please enter or calculate your loved one’s age.');
    hasError = true;
  } else {
    const ageNum = parseInt(age.value.trim(), 10);
    if (isNaN(ageNum) || ageNum < 40 || ageNum > 120) {
      setInputError('seniorAge', 'Please enter a valid age between 45 and 115.');
      hasError = true;
    }
  }

  if (!gender || !gender.value.trim()) {
    setInputError('seniorGender', 'Please select a gender option.');
    hasError = true;
  }

  if (!mobility || !mobility.value.trim()) {
    setInputError('seniorMobility', 'Please select mobility support needs.');
    hasError = true;
  }

  if (!diet || !diet.value.trim()) {
    setInputError('seniorDiet', 'Please select dietary preferences.');
    hasError = true;
  }

  if (hasError) {
    const firstErr = document.querySelector('.is-error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Collect selected interest tags
  const selectedPills = document.querySelectorAll('.js-tag-pill.selected');
  const interests = Array.from(selectedPills).map(p => p.getAttribute('data-val') || p.textContent.trim());

  const seniorData = {
    fullName: name.value.trim(),
    dob: dob ? dob.value : '',
    age: age.value.trim(),
    gender: gender.value.trim(),
    preferredName: preferredName && preferredName.value.trim() ? preferredName.value.trim() : name.value.trim(),
    address: address ? address.value.trim() : '',
    dailyRoutine: routine ? routine.value.trim() : 'Standard daily schedule',
    interests: interests.length ? interests : ['Companionship', 'Light Activities'],
    activityPreferences: interests.join(', '),
    mobilitySupport: mobility.value.trim(),
    dietaryPreference: diet.value.trim(),
    additionalNotes: notes ? notes.value.trim() : '',
    updatedAt: new Date().toISOString()
  };

  saveSeniorData(seniorData);

  const submitBtn = document.getElementById('seniorSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Saving &amp; Continuing...</span>`;
  }

  setTimeout(() => {
    window.location.href = 'schedule.html';
  }, 350);
}
