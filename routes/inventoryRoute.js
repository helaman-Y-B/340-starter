// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/inventoryController");

// Route to build inventory by classification view
router.get("/type/:classficationId", invController.buildByClassificationId);

module.exports = router;