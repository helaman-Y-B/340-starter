const utilities = require("../utilities/index");
const accountModel = require("../models/account-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildAccount(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData,
    })
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const { account_email, account_password } = req.body

  const accountData = await accountModel.getAccountByEmail(account_email)

  if(!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      account_email,
      account_password,
      loggedin: res.locals.loggedin, 
      accountData: res.locals.accountData,
      errors: null,
    })
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 })
      if (process.env.NODE_ENV === "development") {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
      } else {
        res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
      }
      return res.redirect("/account/")
    }
    else {
      req.flash("message notice", "Please check your credentials and try again.")
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        account_email,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData,
        errors: null,
      })
    }
  } catch (error) {
    throw new Error("Access Forbidden")
  }
}

/* ****************************************
 *  Process logged view
 * ************************************ */
async function buildLogged(req, res) {
  let nav = await utilities.getNav()
  //const { account_email } = req.body
  //const data = await accountModel.getAccountByEmail(account_email)
  req.flash(
    "notice",
    `Welcome citizen!`
  )
  res.render("account/logged", {
      title: "You're logged in!",
      nav, 
      accountData: res.locals.accountData, 
      errors: null
  })
}

/* ****************************************
 *  Process logout view
 * ************************************ */
async function accountLogout(req, res) {
    req.flash("notice", "You have been logged out.")
    res.clearCookie("jwt")
    return res.redirect("/account/login")
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegistration(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/registration", {
        title: "Register",
        nav,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData, 
        errors: null
    })
}

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    const { account_firstname, account_lastname, account_email, account_password } = req.body
  
    const regResult = await accountModel.postRegistration(
      account_firstname,
      account_lastname,
      account_email,
      account_password
    )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`
      )
      res.status(201).render("account/login", {
        title: "Login",
        nav,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/registration", {
        title: "Registration",
        nav,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData,
      })
    }
  }


module.exports = { buildAccount, accountLogin, buildLogged, accountLogout, buildRegistration, registerAccount };