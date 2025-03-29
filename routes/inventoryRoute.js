// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const managementController = require("../controllers/managementController");
const regValidate = require('../utilities/management-validation')
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

  // Route to build management view
  router.get(
      "/",
      utilities.handleErrors(managementController.buildManagement)
  );

  // Route to build add-classification view
  router.get(
    "/add-classification",
    utilities.handleErrors(managementController.buildAddClassification)
  );

  // Route to post the form from the add-classification view
  router.post(
    "/add-classification",
    regValidate.addClassification(),
    regValidate.checkRegData,
    utilities.handleErrors(managementController.addNewClassification)
  );

  router.get(
    "/add-inventory",
    utilities.handleErrors(managementController.buildAddInventory)
  )

  router.post(
    "/add-inventory",
    //regValidate.addInventory(),
    //regValidate.checkRegData,
    utilities.handleErrors(managementController.addNewInventory)
  );

module.exports = router;