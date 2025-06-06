const invModel = require("../models/inventory-model")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */

Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    // console.log(data) // Check the data object
    let list = "<ul id='nav-bar'>"
    list += "<li id='current'><a href='/' title='Home page'>Home</a></li>"
    data.rows.forEach(row => {
        list += "<li>"
        list += "<a href='/inv/type/" + row.classification_id +
            "' title='See our inventory of " +
            row.classification_name + " vehicles'>" +
            row.classification_name + "</a>"
        list += "</li>"
    })
    list += "</ul>"
    return list
}

/* ************************
 * Constructs the order status HTML unordered list
 ************************** 
Util.getOrderStatus = async function (req, res, next) {
  let options = ["Pending", "Processing", "Shipped", "Delivered"]
  let list = "<select name = 'order_status'>"
  options.forEach(option => {
    list += "<option value = '" + option + "'>" + option + "</option>"
  })
  list += "</select>"
  return list
}*/


/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
    let grid
    if(data.length > 0){
      grid = '<ul id="inv-display">'
      data.forEach(vehicle => { 
        grid += '<li class="vehicle">'
        grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
        + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
        + 'details"><img src="' + vehicle.inv_thumbnail 
        +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
        +' on CSE Motors" /></a>'
        grid += '<div class="namePrice">'
        grid += '<hr />'
        grid += '<h2>'
        grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
        + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
        grid += '</h2>'
        grid += '<span>$' 
        + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
        grid += '</div>'
        grid += '</li>'
      })
      grid += '</ul>'
    } else { 
      grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
  }

/* **************************************
  * Build the vehicle view HTML
  * ************************************ */

Util.buildVehicleGrid = async function(data) {
  let grid
  if(data.length > 0){
    grid = '<div id="vehicle-img">'
    grid += '<img src="' + data[0].inv_image + '" alt="Image of ' + data[0].inv_model + '" />'
    grid += '</div>'
    grid += '<div id="vehicle-details">'
    grid += '<h2>' + data[0].inv_make + ' ' + data[0].inv_model + '</h2>'
    grid += '<h3>Price: $' + new Intl.NumberFormat('en-US').format(data[0].inv_price) + '</h3>'
    grid += '<p>' + data[0].inv_description + '</p>'
    grid += '<p><b>Color</b>: ' + data[0].inv_color + '</p>'
    grid += '<p><b>Miles</b>: ' + data[0].inv_miles + '</p>'
    grid += '<p><b>Year</b>: ' + data[0].inv_year + '</p>'
    grid += '<a href="/orders/buy-form/' + data[0].inv_id + '"><button class="buy-button">Buy Now</button></a>'
    grid += '</div>'
  } else {
    grid = '<p class="notice">Sorry, no vehicle details available.</p>'
  }
  return grid
}

Util.buildVehicleGridForm = async function(data) {
  let grid
  if(data.length > 0){
    grid = '<div id="vehicle-img">'
    grid += '<img src="' + data[0].inv_image + '" alt="Image of ' + data[0].inv_model + '" />'
    grid += '</div>'
    grid += '<div class="form-group">'
    grid += '<h2>' + data[0].inv_make + ' ' + data[0].inv_model + '</h2>'
    grid += '<h3>Price: $' + new Intl.NumberFormat('en-US').format(data[0].inv_price) + '</h3>'
    grid += '<p><b>Color</b>: ' + data[0].inv_color + '</p>'
    grid += '<p><b>Miles</b>: ' + data[0].inv_miles + '</p>'
    grid += '<p><b>Year</b>: ' + data[0].inv_year + '</p>'
    grid += '</div>'
  }
  return grid
}

/* **************************************
  * Build the classification dropdow to the add-inventory view
  * ************************************ */

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let options = 
  '<legend>CHOOSE A CLASSIFICATION</legend>'
  options += '<select name="classification_id" id="classificationList" required>'
  options += '<option value="">Choose a Classification</option>'
  data.rows.forEach((row) => {
    options += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      options += " selected "
    }
    options += ">" + row.classification_name + "</option>"
  })
  options += "</select>"
  return options
}

/* **************************************
  * Build the error 500 view
  * ************************************ */

Util.buildError500 = async function (data) {
  let grid
  if(data.length > 0){
    grid = '<div id="vehicle-img">'
    grid += '<img src="' + data[0].inv_image + '" alt="Image of ' + data[0].inv_model + '" />'
    grid += '</div>'
    grid += '<div id="vehicle-details">'
    grid += '<h2>' + data[0].inv_make + ' ' + data[0].inv_model + '</h2>'
    grid += '<h3>Price: $' + new Intl.NumberFormat('en-US').format(data[0].inv_price) + '</h3>'
    grid += '<p>' + data[0].inv_description + '</p>'
    grid += '<p><b>Color</b>: ' + data[0].inv_color + '</p>'
    grid += '<p><b>Miles</b>: ' + data[0].inv_miles + '</p>'
    grid += '<p><b>Year</b>: ' + data[0].inv_year + '</p>'
    grid += '</div>'
  } else {
    grid = '<p class="notice">Sorry, no vehicle details available.</p>'
  }
  return gri
}

  /* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      function(err, accountData) {
        if (err) {
          req.flash("Please log in")
          res.clearCookie("jwt")
          return res.redirect("/account/login")
        }
        res.locals.accountData = accountData
        res.locals.loggedin = 1
        next()
      })
  } else {
    res.locals.loggedin = 0;
    res.locals.accountData = {};
    next()
  }
}

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.accountData.account_type === "Admin" || res.locals.accountData.account_type === "Employee") {
    next()
  } else if (res.locals.accountData.account_type === "Client") {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

module.exports = Util