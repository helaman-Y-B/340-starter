// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/index");

// Route to build inventory by classification view
router.get(
    "/type/:classificationId",
    utilities.handleErrors(invController.buildByClassificationId)
  );
  
  // Route to build vehicle inventory by buildByInvId view
  router.get(
    "/detail/:invId",
    utilities.handleErrors(invController.buildByInvId)
  );

module.exports = router;