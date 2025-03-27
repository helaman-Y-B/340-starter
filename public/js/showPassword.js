
const passwordField = document.getElementById("password");
const showPassword = document.getElementById("show-password");

showPassword.addEventListener("click", () => {
if (passwordField.type === "password") {
  passwordField.type = "text";
} else {
  passwordField.type = "password";
}
});