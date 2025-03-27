// Show password event listener
const passwordField = document.getElementById("password");
const showPassword = document.getElementById("show-password");

showPassword.addEventListener("click", () => {
if (passwordField.type === "password") {
  passwordField.type = "text";
  showPassword.textContent = "Hide Password";
} else {
  passwordField.type = "password";
    showPassword.textContent = "Show Password";
}
});

// Password validation
passwordField.form.addEventListener('submit', function(event) {
    const password = passwordField.value;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.\\-_=+¨|\\/]).{12,}$/;

    if (!regex.test(password)) {
        event.preventDefault(); // Prevent form submission
        alert('Password does not meet the requirements. Password must be minimum of 12 characters and include 1 capital letter, 1 number and 1 special character.');
        // Optionally, add more specific error messages
    } else {
        alert('Form information sent.');
    }
});

// Email validation
const emailField = document.getElementById("email");
const emailForm = emailField.form;

emailForm.addEventListener('submit', function(event) {
    const email = emailField.value;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;

    if (!regex.test(email)) {
        event.preventDefault(); // Prevent form submission
        alert('Email does not meet the requirements. Please enter a valid email address.');
        // Optionally, add more specific error messages
    } else {
        alert('Form information sent.');
    }
});

// first and last name validation
const firstNameField = document.getElementById("fname");
const lastNameField = document.getElementById("lname");
const nameForm = firstNameField.form;

const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

nameForm.addEventListener('submit', function(event) {
    const firstName = firstNameField.value;
    const lastName = lastNameField.value;

    if (!regex.test(firstName) || !regex.test(lastName)) {
        event.preventDefault(); // Prevent form submission
        alert('First and last name does not meet the requirements. Please enter a valid name.');
        // Optionally, add more specific error messages
    } else {
        alert('Form information sent.');
    }
});