const utilities = require("./index")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
  *  Classification Data Validation Rules
  * ********************************* */

validate.addClassification = () => {
    return [
        body("classification_name") // Specifies the field to validate (classification_name).
            .trim()                 // Removes leading and trailing whitespace from the input.
            .escape()               // Escapes special characters to prevent injection attacks (e.g., HTML or SQL injection).
            .notEmpty()             // Ensures the field is not empty.
            .isLength({ min: 1 })   // Ensures the field has at least 1 character.
            .withMessage("Please provide a classification name.") 
                                    // Custom error message if the field is empty or too short.
            .matches(/^[a-zA-Z0-9]+$/) 
                                    // Ensures the input contains only alphanumeric characters (no spaces or special characters).
            .withMessage("Classification name cannot contain spaces or special characters.") 
                                    // Custom error message if the input contains invalid characters.
    ]
}

/*  **********************************
  *  Inventory Data Validation Rules
  * ********************************* */
validate.addInventory = () => {
    return [
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide the name of the brand.")
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("The name of the brand cannot have spaces."),

        body("inv_model")
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide the model of the vehicle.")
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("The name of the brand cannot have spaces."),

        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 4 }) 
            .matches(/^\d{4}$/)
            .withMessage("Please provide the year of the vehicle."),

        body("inv_description")
            .notEmpty()
            .withMessage("Please provide a breaf description of the vehicle."),

        body("inv_image")
            .trim()
            .notEmpty()
            .matches(/^\/images\/vehicles\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/)
            .withMessage("Please provide a path for the image in the following format: /images/vehicles/vehicle.jpg or .png"),

        body("inv_thumbnail")
            .trim()
            .notEmpty() 
            .matches(/^\/images\/vehicles\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/)
            .withMessage("Please provide a path for the thumbnail in the following format: /images/vehicles/vehicle.jpg or .png"),

        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .matches(/^\d+$/)
            .withMessage("Please provide a price as a whole number only"),

        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .matches(/^\d+$/)
            .withMessage("Please provide the miles as a whole number."),

        body("inv_color")
            .escape()
            .notEmpty()
            .matches(/^[a-zA-Z]+$/)
            .withMessage("Please provide the color of the vehicle.")
    ]
}

validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add New Classification",
            nav,
            classification_name
        })
        return
    }
    next()
}

validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let optionsGrid = await utilities.buildClassificationList()
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-inventory", {
            errors,
            title: "Add new inventory item",
            nav,
            optionsGrid,
            inv_make, 
            inv_model, 
            inv_year, 
            inv_description, 
            inv_image, 
            inv_thumbnail, 
            inv_price, 
            inv_miles, 
            inv_color, 
            classification_id
        })
        return
    }
    next()
}

/*  **********************************
  *  Update Data Validation
  * ********************************* */
validate.updateInventory = () => {
    return [
        body("inv_make")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide the name of the brand.")
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("The name of the brand cannot have spaces."),

        body("inv_model")
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage("Please provide the model of the vehicle.")
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage("The name of the brand cannot have spaces."),

        body("inv_year")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 4 }) 
            .matches(/^\d{4}$/)
            .withMessage("Please provide the year of the vehicle."),

        body("inv_description")
            .notEmpty()
            .withMessage("Please provide a breaf description of the vehicle."),

        body("inv_image")
            .trim()
            .notEmpty()
            .matches(/^\/images\/vehicles\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/)
            .withMessage("Please provide a path for the image in the following format: /images/vehicles/vehicle.jpg or .png"),

        body("inv_thumbnail")
            .trim()
            .notEmpty() 
            .matches(/^\/images\/vehicles\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif)$/)
            .withMessage("Please provide a path for the thumbnail in the following format: /images/vehicles/vehicle.jpg or .png"),

        body("inv_price")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .matches(/^\d+$/)
            .withMessage("Please provide a price as a whole number only"),

        body("inv_miles")
            .trim()
            .escape()
            .notEmpty()
            .matches(/^\d+$/)
            .withMessage("Please provide the miles as a whole number."),

        body("inv_color")
            .escape()
            .notEmpty()
            .matches(/^[a-zA-Z]+$/)
            .withMessage("Please provide the color of the vehicle.")
    ]
}

validate.checkUpdateData = async (req, res, next) => {
    const { inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
    let optionsGrid = await utilities.buildClassificationList()
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/edit", {
            errors,
            title: `Update ${inv_make} ${inv_model}`,
            nav,
            optionsGrid,
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
            inv_id
        })
        return
    }
    next()
}

module.exports = validate;