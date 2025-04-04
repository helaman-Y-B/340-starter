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
      utilities.checkLogin,
      utilities.handleErrors(managementController.buildManagement)
  );

  // Route to build add-classification view
  router.get(
    "/add-classification",
    utilities.checkLogin,
    utilities.handleErrors(managementController.buildAddClassification)
  );

  // Route to post the form from the add-classification view
  router.post(
    "/add-classification",
    regValidate.addClassification(),
    regValidate.checkClassificationData,
    utilities.handleErrors(managementController.addNewClassification)
  );

  // Route to build add-inventory view
  router.get(
    "/add-inventory",
    utilities.checkLogin,
    utilities.handleErrors(managementController.buildAddInventory)
  );

  // Route for the post add-inventory view
  router.post(
    "/add-inventory",
    regValidate.addInventory(),
    regValidate.checkInventoryData,
    utilities.handleErrors(managementController.addNewInventory)
  );

  // Route to build add-classification view
  router.get(
    "/getInventory/:classification_id",
    utilities.checkLogin,
    utilities.handleErrors(invController.getInventoryJSON)
  )

  // Route to build edit view
  router.get(
    "/edit/:inv_id",
    utilities.checkLogin,
    utilities.handleErrors(managementController.buildUpdate)
  );

  router.post(
    "/update-inventory/",
    regValidate.updateInventory(),
    regValidate.checkUpdateData,
    utilities.handleErrors(managementController.updateItem)
  );

  // Route to delete view
  router.get(
    "/delete/:inv_id",
    utilities.checkLogin,
    utilities.handleErrors(managementController.buildDelete)
  );

  // Route to post and delete an item in the inventory
  router.post(
    "/delete-confirm/:inv_id",
    utilities.handleErrors(managementController.deleteItem)
  );

module.exports = router;