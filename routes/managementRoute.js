// Needed Resources
const express = require("express");
const router = new express.Router();
const managementController = require("../controllers/managementController");
const utilities = require("../utilities/index");

// Route to build management view
router.get(
    "/management",
    utilities.handleErrors(managementController.buildManagement)
);

// Route to build new classification build view
//router.get(
//    "/new-classification",
//    utilities.handleErrors(managementController.buildNewClassification)
//);

// Route to build new classification build view
//router.get(
//    "/new-inventory",
//    utilities.handleErrors(managementController.buildNewInventory)
//);

module.exports = router;