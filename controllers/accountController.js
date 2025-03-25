const utilities = require("../utilities/index");

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildAccount(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
        title: "Login",
        nav
    })
}

module.exports = { buildAccount };