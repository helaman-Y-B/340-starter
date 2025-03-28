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
          res.status(201).render("inv/management", {
            title: "Management page",
            nav,
          })
        } else {
          req.flash("notice", "Sorry, failed to add new classification.")
          res.status(501).render("inv/add-classification", {
            title: "Add Classification page",
            nav,
          })
        }
}



module.exports = management;