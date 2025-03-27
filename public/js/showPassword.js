
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