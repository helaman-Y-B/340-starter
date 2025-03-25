// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/index");

// Route to build inventory by classification view
router.get(
    "/account",
    utilities.handleErrors(accountController.buildAccount)
  );

module.exports = router;