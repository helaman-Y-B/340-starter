// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/index");

// Route to build inventory by classification view
router.get(
    "/login",
    utilities.handleErrors(accountController.buildAccount)
  );

router.get(
  "/registration",
  utilities.handleErrors(accountController.buildRegistration)
)

module.exports = router;