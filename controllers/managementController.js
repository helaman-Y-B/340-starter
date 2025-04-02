const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const management = {}

/* ***************************
 *  Build management view
 * ************************** */
management.buildManagement = async function (req, res) {
    let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Management page",
        nav,
        errors: null,
    })
}

/* ***************************
 *  Build add-classification view
 * ************************** */
management.buildAddClassification = async function (req, res) {
    //const data = await invModel.pushNewClassification(classification_name)

    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
        title: "Add New Classification",
        nav,
        errors: null,
    })
}

management.addNewClassification = async function (req, res) {
    let nav = await utilities.getNav()
        const { classification_name } = req.body
      
        const regResult = await invModel.postNewClassification(
            classification_name
        )
      
        if (regResult) {
          req.flash(
            "notice",
            `Added ${classification_name}, successfully!`
          )
          res.status(201).render("./inventory/management", {
            title: "Management page",
            nav,
            errors: null,
          })
        } else {
          req.flash("notice", "Sorry, failed to add new classification.")
          res.status(501).render("./inventory/add-classification", {
            title: "Add New Classification",
            nav,
            errors: null,
          })
        }
}

management.buildAddInventory = async function (req, res) {
  let nav = await utilities.getNav()
  let optionsGrid = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add new inventory item",
    nav,
    optionsGrid,
    errors: null,
  })
}

management.addNewInventory = async function (req, res) {
  let nav = await utilities.getNav()
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    
    let optionsGrid = await utilities.buildClassificationList()

    const regResult = await invModel.postNewInventory(
      inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
    )
      
    if (regResult) {
      req.flash(
        "notice",
        "Added the new inventory item, successfully!"
      )
      res.status(201).render("./inventory/management", {
        title: "Management page",
        nav,
        errors: null,
      })
    } else {
      req.flash("notice", "Sorry, failed to add new item to the inventory.")
      res.status(501).render("./inventory/add-inventory", {
        title: "Add new inventory item",
        nav,
        optionsGrid,
        errors: null,
      })
    }
}

/* ***************************
 *  Build the delete view
 * ************************** */
management.buildDelete = async function (req, res) {
  let nav = await utilities.getNav()
  const inv_id = req.params.inv_id;
  const data = await utilities.getInventoryByInvId(inv_id)
  const inv_make = data[0].inv_make;
  const inv_model = data[0].inv_model;
  const inv_price = data[0].inv_price;
  const inv_year = data[0].inv_year;

  res.render("./inventory/delete-confirm", {
    title: "Select an item to delete",
    nav,
    inv_make,
    inv_model,
    inv_price,
    inv_year,
    inv_id,
    errors: null,
  })
}

/* ***************************
 *  Delete the inventory item
 * ************************** */
management.deleteItem = async function (req, res) {
  const inv_id = req.params.inv_id;
  const deletion = invModel.deletion(inv_id)

  if(deletion) {
    req.flash(
      "notice", "Deletion successful."
    )
  } else {
    req.flash(
      "notice", "Deletion was not successful."
    )
    res.redirect(`./inventory/delete-confirm/:${inv_id}`, {
      title: "Select an item to delete",
      nav,
      errors: null,
    })
  }
}


module.exports = management;