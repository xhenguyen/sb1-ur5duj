function autofillInputs() {
  chrome.storage.sync.get(['formData'], (result) => {
    if (result.formData) {
      const { name, email, skills } = result.formData;

      // Autofill name
      const nameInput = document.querySelector('input[name="name"]');
      if (nameInput) nameInput.value = name;

      // Autofill email
      const emailInput = document.querySelector('input[name="email"]');
      if (emailInput) emailInput.value = email;

      // Autofill skills
      const skillsInput = document.querySelector('input[name="skills"]');
      if (skillsInput) skillsInput.value = skills;

      // If there's a textarea for skills, fill it as well
      const skillsTextarea = document.querySelector('textarea[name="skills"]');
      if (skillsTextarea) skillsTextarea.value = skills;
    }
  });
}

// Run autofill when the content script is injected
autofillInputs();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'autofill') {
    autofillInputs();
    sendResponse({ status: 'Autofill completed' });
  }
});