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
  res.render("account/logged", {
      title: "You're logged in!",
      nav, 
      accountData: res.locals.accountData, 
      errors: null
  })
}

  /* ****************************************
  *  Process update account view
  * ************************************ */
async function buildUpdateAccount(req, res) {
  let nav = await utilities.getNav()
  res.render("account/update-account", {
    title: "Update Account",
    nav,
    loggedin: res.locals.loggedin, 
    accountData: res.locals.accountData, 
    errors: null
  })
}

/* ****************************************
 *  Process update account request
 * ************************************ */
async function updateAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_id } = req.body

  const updateResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    parseInt(account_id)
  )

  if (updateResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re updated ${account_firstname}. Please sign in.`
    )
    res.clearCookie("jwt")
    res.locals.loggedin = 0
    res.status(201).render("account/login", {
      title: "Login",
      nav,
      loggedin: res.locals.loggedin, 
      accountData: res.locals.accountData,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("account/update-account", {
      title: "Update Account",
      nav,
      loggedin: res.locals.loggedin, 
      accountData: res.locals.accountData,
      errors: null,
    })
  }
}

/* ****************************************
 *  Process update password account request
 * ************************************ */
async function updatePassword(req, res) {
    const { account_password, account_id } = req.body
    const hashedPassword = await bcrypt.hash(account_password, 10)
    const updateResult = await accountModel.updateAccountPassword(
      hashedPassword,
      parseInt(account_id)
    )
    if (updateResult) {
      req.flash("notice", "Password updated successfully. Please sign in.")
      res.clearCookie("jwt")
      res.locals.loggedin = 0
      res.status(201).redirect("/account/login")
    }
    else {
      req.flash("notice", "Sorry, the update failed.")
      res.status(501).render("account/update-account", {
        title: "Update Account",
        nav,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData,
        errors: null,
      })
    }
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


module.exports = { buildAccount, accountLogin, buildLogged, buildUpdateAccount, updateAccount, updatePassword, accountLogout, buildRegistration, registerAccount };