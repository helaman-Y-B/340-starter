// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const managementController = require("../controllers/managementController");
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

  router.get(
      "/",
      utilities.handleErrors(managementController.buildManagement)
  );

  router.get(
    "/add-classification",
    utilities.handleErrors(managementController.buildAddClassification)
  );

  router.post(
    "/add-classification",
    utilities.handleErrors(managementController.addNewClassification)
  );

module.exports = router;