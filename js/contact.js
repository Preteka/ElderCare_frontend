/**
 * ElderCare - Contact Page Form Validation & Interaction
 * Pure Vanilla JavaScript implementation with inline feedback and no alert()
 */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("eldercareContactForm");
  const successBanner = document.getElementById("contactSuccessBanner");

  if (!contactForm) return;

  const fields = {
    fullName: {
      input: document.getElementById("fullName"),
      group: document.getElementById("groupFullName"),
      error: document.getElementById("errorFullName"),
      validate: (val) => val.trim().length >= 2,
      msg: "Please enter your full name (minimum 2 characters)."
    },
    email: {
      input: document.getElementById("emailAddress"),
      group: document.getElementById("groupEmail"),
      error: document.getElementById("errorEmail"),
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      msg: "Please enter a valid email address."
    },
    phone: {
      input: document.getElementById("phoneNumber"),
      group: document.getElementById("groupPhone"),
      error: document.getElementById("errorPhone"),
      validate: (val) => val.trim() === "" || /^[\d\s+\-()]{7,18}$/.test(val.trim()),
      msg: "Please enter a valid phone number or leave blank."
    },
    subject: {
      input: document.getElementById("subject"),
      group: document.getElementById("groupSubject"),
      error: document.getElementById("errorSubject"),
      validate: (val) => val.trim().length >= 3,
      msg: "Please provide a subject for your message."
    },
    message: {
      input: document.getElementById("message"),
      group: document.getElementById("groupMessage"),
      error: document.getElementById("errorMessage"),
      validate: (val) => val.trim().length >= 10,
      msg: "Please enter your message (minimum 10 characters)."
    }
  };

  // Real-time error removal on input
  Object.keys(fields).forEach(key => {
    const item = fields[key];
    if (item.input) {
      item.input.addEventListener("input", () => {
        if (item.group && item.group.classList.contains("has-error")) {
          const isValid = item.validate(item.input.value);
          if (isValid) {
            item.group.classList.remove("has-error");
            item.input.classList.remove("is-invalid");
          }
        }
      });
    }
  });

  // Form Submit Handler
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isFormValid = true;
    let firstInvalidInput = null;

    // Validate all fields
    Object.keys(fields).forEach(key => {
      const item = fields[key];
      if (!item.input) return;

      const isValid = item.validate(item.input.value);
      if (!isValid) {
        isFormValid = false;
        if (item.group) item.group.classList.add("has-error");
        item.input.classList.add("is-invalid");
        if (item.error) item.error.textContent = item.msg;
        if (!firstInvalidInput) firstInvalidInput = item.input;
      } else {
        if (item.group) item.group.classList.remove("has-error");
        item.input.classList.remove("is-invalid");
      }
    });

    if (!isFormValid) {
      if (firstInvalidInput) firstInvalidInput.focus();
      return;
    }

    // Submit success simulation
    const submitBtn = contactForm.querySelector(".form-submit-btn");
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "Send Message";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span>Sending Message...</span>
      `;
    }

    setTimeout(() => {
      // Reset form
      contactForm.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      // Show success banner
      if (successBanner) {
        successBanner.style.display = "block";
        successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }, 600);
  });
});
