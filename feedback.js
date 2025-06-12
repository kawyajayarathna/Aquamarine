document.addEventListener("DOMContentLoaded", function() {
  const feedbackForm = document.getElementById("feedback-form");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  const previewBtn = document.getElementById("preview-btn");
  const editBtn = document.getElementById("edit-btn");
  const submitBtn = document.getElementById("submit-btn");
  const previewContainer = document.getElementById("preview-container");
  const confirmationMsg = document.getElementById("confirmationMsg");
  
  function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function setError(element, message) {
    element.nextElementSibling.textContent = message;
  }

  function setSuccess(element) {
    element.nextElementSibling.textContent = "";
  }
  
  function validateForm(event) {
    event.preventDefault();
    
    const nameValue = feedbackForm.name.value.trim();
    const emailValue = emailInput.value.trim();
    
    let nameValid = false;
    let emailValid = false;
    
    if (nameValue === '') {
      setError(feedbackForm.name, 'Name is required');
    } else {
      setSuccess(feedbackForm.name);
      nameValid = true;
    }
    
    if (emailValue === '') {
      setError(emailInput, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
      setError(emailInput, 'Provide a valid email address');
    } else if (/[A-Z]/.test(emailValue)) {
      setError(emailInput, 'Email address should be in lowercase. Example: john@gmail.com');
    } else {
      setSuccess(emailInput);
      emailValid = true;
    }
    
    if (nameValid && emailValid) {
      submitForm();
    }
  }

  const successMessage = document.getElementById("successMessage");
  
  function submitForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const firstTime = document.querySelector('input[name="first-time"]:checked') ? document.querySelector('input[name="first-time"]:checked').value : '';
    const informative = document.querySelector('input[name="informative"]:checked') ? document.querySelector('input[name="informative"]:checked').value : '';
    const improvements = document.getElementById('improvements').value;
    const rating = document.querySelector('input[name="satisfaction"]:checked') ? document.querySelector('input[name="satisfaction"]:checked').value : '';
    const recommend = document.querySelector('input[name="recommend"]:checked') ? document.querySelector('input[name="recommend"]:checked').value : '';
    const updates = document.getElementById('updates').value;
    const additionalQuestions = document.getElementById('questions').value;

    const subject = 'Feedback Form Submission';
    const body = `
        Name: ${name}
        Email: ${email}
        First Time: ${firstTime}
        Informative: ${informative}
        Improvements: ${improvements}
        Rating: ${rating}
        Recommend: ${recommend}
        Updates: ${updates}
        Additional Questions: ${additionalQuestions}
    `;

    const mailtoLink = `mailto:wiruni.20231220@iit.ac.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    
    confirmationMsg.style.display = 'block';
    confirmationMsg.textContent = "Submitted successfully! Thank you for your feedback.";

    feedbackForm.reset();
  }
  
  feedbackForm.addEventListener("submit", validateForm);
  
  previewBtn.addEventListener("click", function() {
    const formData = new FormData(feedbackForm);
    let previewContent = "<h3>Preview your input:</h3><ul>";
    
    for (let [key, value] of formData.entries()) {
      previewContent += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    
    previewContent += "</ul>";
    
    previewContainer.innerHTML = previewContent;
    feedbackForm.style.display = "none";
    previewContainer.style.display = "block";
    editBtn.style.display = "block";
    previewBtn.style.display = "none";
    feedbackForm.querySelectorAll("input, textarea, select").forEach(input => input.disabled = true);
  });
  
  editBtn.addEventListener("click", function() {
    feedbackForm.style.display = "block";
    previewContainer.style.display = "none";
    editBtn.style.display = "none";
    previewBtn.style.display = "block";
    feedbackForm.querySelectorAll("input, textarea, select").forEach(input => input.disabled = false);
  });
  
  submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    validateForm(event);
  });
});