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
    })
}

/* ***************************
 *  Build add-classification view
 * ************************** */
management.buildAddClassification = async function (req, res) {
    //const data = await invModel.pushNewClassification(classification_name)

    let nav = await utilities.getNav()
    res.render("./inventory/add-classification", {
        title: "Add Classification page",
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
            title: "Add Classification page",
            nav,
            errors: null,
          })
        }
}

management.buildAddInventory = async function (req, res) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-inventory", {
    title: "Add new inventory item",
    nav,
    errors: null,
  })
}

management.addNewInventory = async function (req, res) {
  let nav = await utilities.getNav()
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
      
    const regResult = await invModel.postNewInventory(
      inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
    )
      
    if (regResult) {
      req.flash(
        "notice",
        `Added the new inventory item, successfully!`
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
        errors: null,
      })
    }
}



module.exports = management;