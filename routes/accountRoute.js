// Needed Resources
const express = require("express");
const regValidate = require('../utilities/account-validation')
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/index");

// Middleware for validation
const validateRegistration = (req, res, next) => {
  const { account_password, account_firstname, account_lastname, account_email } = req.body;
  let isValid = true;

  // Password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.\\-_=+¨|\\/]).{12,}$/;
  if (!passwordRegex.test(account_password)) {
    req.flash(
      "notice",
      "Password does not meet the requirements. Password must be a minimum of 12 characters and include 1 capital letter, 1 number, and 1 special character."
    );
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
  if (!emailRegex.test(account_email)) {
    req.flash(
      "notice",
      "Email does not meet the requirements. Please enter a valid email address."
    );
    isValid = false;
  }

  // Name validation
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  if (!nameRegex.test(account_firstname) || !nameRegex.test(account_lastname)) {
    req.flash(
      "notice",
      "First and last name do not meet the requirements. Please enter a valid name."
    );
    isValid = false;
  }

  // If validation fails, redirect back to the registration page
  if (!isValid) {
    console.error("Form not submitted")
    return res.redirect("/account/registration");
  }

  // If all validations pass, proceed to the next middleware
  next();
};

// Default route for the login page
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildLogged)
);

// Route to build update-account view
router.get(
  "/update-account",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdateAccount)
)

router.post(
  "/update-account",
  utilities.handleErrors(accountController.updateAccount)
)

router.post(
  "/update-password",
  utilities.handleErrors(accountController.updatePassword)
)

// Route to build the login view
router.get(
  "/login",
  utilities.handleErrors(accountController.buildAccount)
);

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLogData,
  utilities.handleErrors(accountController.accountLogin),
  (req, res) => {
    res.status(200).send('login process')
  }
)

// Route to build the registration view
router.get(
  "/registration",
  utilities.handleErrors(accountController.buildRegistration)
)

// Route to post the registration form
router.post(
  "/registration", 
  validateRegistration,
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Logout route
router.get(
  "/logout",
  utilities.handleErrors(accountController.accountLogout)
)

module.exports = router;