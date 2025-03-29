const utilities = require("./index")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */

validate.addClassification = () => {
    return [
        // classification_name is required and must be string
        body("classification_name")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min:1 })
            .withMessage("Please provide a classification name.") // on error this message is sent.
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("Classification name cannot contain spaces or special characters.") // Error if invalid
    ]
}

validate.checkRegData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/management", {
            errors,
            title: "Management Page",
            nav,
            classification_name
        })
        return
    }
    next()
}

module.exports = validate;