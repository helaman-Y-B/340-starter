const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const management = {}

/* ***************************
 *  Build management view
 * ************************** */
management.buildManagement = async function (req, res) {
    let nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList()
    const accountData = res.locals.accountData

    if (accountData.account_type !== "Admin" && accountData.account_type !== "Employee") {
      return res.redirect('/');
    } else {
      res.render("./inventory/management", {
        title: "Management page",
        nav,
        classificationList,
        loggedin: res.locals.loggedin, 
        accountData,
        errors: null,
    })
    }
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
          const classificationList = await utilities.buildClassificationList()
          res.status(201).render("./inventory/management", {
            title: "Management page",
            nav,
            classificationList,
            loggedin: res.locals.loggedin, 
            accountData: res.locals.accountData, 
            errors: null,
          })
        } else {
          req.flash("notice", "Sorry, failed to add new classification.")
          res.status(501).render("./inventory/add-classification", {
            title: "Add New Classification",
            nav,
            loggedin: res.locals.loggedin, 
            accountData: res.locals.accountData, 
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
    loggedin: res.locals.loggedin, 
    accountData: res.locals.accountData, 
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
      const classificationList = await utilities.buildClassificationList()
      res.status(201).render("./inventory/management", {
        title: "Management page",
        nav,
        classificationList,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData, 
        errors: null,
      })
    } else {
      req.flash("notice", "Sorry, failed to add new item to the inventory.")
      res.status(501).render("./inventory/add-inventory", {
        title: "Add new inventory item",
        nav,
        optionsGrid,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData,
        errors: null,
      })
    }
}

/* ***************************
 *  Build the edit view
 * ************************** */
management.buildUpdate = async function (req, res) {
  let nav = await utilities.getNav()
  const inv_id = parseInt(req.params.inv_id);
  const data = await invModel.getInventoryByInvId(inv_id);
  const classificationSelect = await utilities.buildClassificationList(data[0].classification_id)
  const itemName = `${data[0].inv_make} ${data[0].inv_model}`
  res.render("./inventory/update-inventory", {
    title: "Update " + itemName,
    nav,
    classificationSelect: classificationSelect,
    inv_id: data[0].inv_id,
    inv_make: data[0].inv_make,
    inv_model: data[0].inv_model,
    inv_year: data[0].inv_year,
    inv_description: data[0].inv_description,
    inv_image: data[0].inv_image,
    inv_thumbnail: data[0].inv_thumbnail,
    inv_price: data[0].inv_price,
    inv_miles: data[0].inv_miles,
    inv_color: data[0].inv_color,
    classification_id: data[0].classification_id,
    loggedin: res.locals.loggedin, 
    accountData: res.locals.accountData, 
    errors: null,
  })
}

/* ***************************
 *  Updates inventory item
 * ************************** */
management.updateItem = async function (req, res) {
  let nav = await utilities.getNav()
    const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

  const regResult = await invModel.updateInventory(
    inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id
  )
    
  if (regResult) {
    const itemName = regResult.inv_make + " " + regResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/update-inventory", {
    title: "Update " + itemName,
    nav,
    classificationSelect: classificationSelect,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
    loggedin: res.locals.loggedin, 
    accountData: res.locals.accountData, 
    errors: null
    })
  }
}

/* ***************************
 *  Build the delete view
 * ************************** */
management.buildDelete = async function (req, res) {
  let nav = await utilities.getNav()
  const inv_id = req.params.inv_id;
  const data = await invModel.getInventoryByInvId(inv_id)
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
    loggedin: res.locals.loggedin, 
    accountData: res.locals.accountData, 
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
    res.redirect("/inv/")
  } else {
    req.flash(
      "notice", "Deletion was not successful."
    )
    res.redirect(`./inventory/delete-confirm/:${inv_id}`, {
      title: "Select an item to delete",
      nav,
      loggedin: res.locals.loggedin, 
      accountData: res.locals.accountData, 
      errors: null,
    })
  }
}


module.exports = management;