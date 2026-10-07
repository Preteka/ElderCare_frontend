/**
 * ElderCare - Authentication & Demo Account Management
 * Supports login, signup, persistent state in localStorage, and redirection to booking flow.
 * Note: Scope ends at payment. Does NOT redirect to any dashboard.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuthPage();
});

function initAuthPage() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmit);
  }

  if (signupForm) {
    signupForm.addEventListener('submit', handleSignupSubmit);
  }

  // Auto-fill existing auth data if any for easy demo
  prefillDemoCredentials();
}

function getRedirectTarget() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirect = urlParams.get('redirect');
  // Default to family-details.html for booking flow
  if (redirect && redirect.includes('.html')) {
    return redirect;
  }
  return 'family-details.html';
}

function handleLoginSubmit(e) {
  e.preventDefault();
  clearAllErrors(e.target);

  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');

  let hasError = false;

  if (!emailInput || !emailInput.value.trim()) {
    setInputError('loginEmail', 'Please enter your email address.');
    hasError = true;
  } else if (!isValidEmail(emailInput.value.trim())) {
    setInputError('loginEmail', 'Please enter a valid email address.');
    hasError = true;
  }

  if (!passwordInput || !passwordInput.value.trim()) {
    setInputError('loginPassword', 'Please enter your password.');
    hasError = true;
  } else if (passwordInput.value.trim().length < 4) {
    setInputError('loginPassword', 'Password must be at least 4 characters.');
    hasError = true;
  }

  if (hasError) return;

  const email = emailInput.value.trim();
  const userName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Family Member';

  // Demo Login Auth Object
  const authData = {
    userId: 'USR_' + Date.now().toString().slice(-6),
    fullName: userName,
    email: email,
    phone: '+91 98765 43210',
    loggedIn: true,
    loggedInAt: new Date().toISOString()
  };

  localStorage.setItem('eldercare_auth', JSON.stringify(authData));

  // If family data doesn't exist yet, seed it from auth
  const existingFamily = (function() {
    try { return JSON.parse(localStorage.getItem('eldercare_family') || 'null'); } catch(e){ return null; }
  })();

  if (!existingFamily) {
    const familyData = {
      fullName: userName,
      email: email,
      phone: '+91 98765 43210',
      relationship: 'Daughter / Son',
      preferredContact: 'phone'
    };
    localStorage.setItem('eldercare_family', JSON.stringify(familyData));
  }

  // Button loading animation
  const submitBtn = document.getElementById('loginSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Logging in...</span>`;
  }

  setTimeout(() => {
    window.location.href = getRedirectTarget();
  }, 450);
}

function handleSignupSubmit(e) {
  e.preventDefault();
  clearAllErrors(e.target);

  const nameInput = document.getElementById('signupName');
  const emailInput = document.getElementById('signupEmail');
  const phoneInput = document.getElementById('signupPhone');
  const passwordInput = document.getElementById('signupPassword');
  const confirmPasswordInput = document.getElementById('signupConfirmPassword');

  let hasError = false;

  if (!nameInput || !nameInput.value.trim()) {
    setInputError('signupName', 'Please enter your full name.');
    hasError = true;
  }

  if (!emailInput || !emailInput.value.trim()) {
    setInputError('signupEmail', 'Please enter your email address.');
    hasError = true;
  } else if (!isValidEmail(emailInput.value.trim())) {
    setInputError('signupEmail', 'Please enter a valid email address.');
    hasError = true;
  }

  if (!phoneInput || !phoneInput.value.trim()) {
    setInputError('signupPhone', 'Please enter your phone number.');
    hasError = true;
  } else if (!isValidPhone(phoneInput.value.trim())) {
    setInputError('signupPhone', 'Please enter a valid 10-digit phone number.');
    hasError = true;
  }

  if (!passwordInput || !passwordInput.value.trim()) {
    setInputError('signupPassword', 'Please create a password.');
    hasError = true;
  } else if (passwordInput.value.trim().length < 6) {
    setInputError('signupPassword', 'Password must be at least 6 characters.');
    hasError = true;
  }

  if (!confirmPasswordInput || !confirmPasswordInput.value.trim()) {
    setInputError('signupConfirmPassword', 'Please confirm your password.');
    hasError = true;
  } else if (confirmPasswordInput.value.trim() !== (passwordInput ? passwordInput.value.trim() : '')) {
    setInputError('signupConfirmPassword', 'Passwords do not match.');
    hasError = true;
  }

  if (hasError) return;

  const authData = {
    userId: 'USR_' + Date.now().toString().slice(-6),
    fullName: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    loggedIn: true,
    loggedInAt: new Date().toISOString()
  };

  localStorage.setItem('eldercare_auth', JSON.stringify(authData));

  // Pre-seed family data
  const familyData = {
    fullName: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    relationship: 'Family Member',
    preferredContact: 'phone'
  };
  localStorage.setItem('eldercare_family', JSON.stringify(familyData));

  // Button loading
  const submitBtn = document.getElementById('signupSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Creating Account...</span>`;
  }

  setTimeout(() => {
    window.location.href = getRedirectTarget();
  }, 500);
}

function prefillDemoCredentials() {
  const emailInput = document.getElementById('loginEmail');
  const passwordInput = document.getElementById('loginPassword');

  if (emailInput && !emailInput.value) {
    emailInput.value = 'anitha.sharma@example.com';
  }
  if (passwordInput && !passwordInput.value) {
    passwordInput.value = 'demo1234';
  }
}
