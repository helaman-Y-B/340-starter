const utilities = require("../utilities/")

const errorCont = {}

/* ***************************
 *  Build error 500 view
 * ************************** */

errorCont.buildError500 = async function (req, res, next) {
    const nav = await utilities.getNav()
    const buildingError = await utilities.buildError500()
    console.error("Error 500: Internal Server Error")
    res.status(500).render("errors/error", {
        title: "Error 500",
        nav,
        loggedin: res.locals.loggedin, 
        accountData: res.locals.accountData, 
        message: "Internal Server Error",
    })
}

module.exports = errorCont