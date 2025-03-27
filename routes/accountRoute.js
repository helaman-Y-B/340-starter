// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/index");

// Route to build the login view
router.get(
  "/login",
  utilities.handleErrors(accountController.buildAccount)
);

// Route to build the registration view
router.get(
  "/registration",
  utilities.handleErrors(accountController.buildRegistration)
)

// Route to post the registration form
router.post(
  "/registration", 
  utilities.handleErrors(accountController.registerAccount)
);

module.exports = router;