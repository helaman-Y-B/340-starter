/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const session = require("express-session")
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const env = require("dotenv").config()
const app = express()
const pool = require("./database")
const static = require("./routes/static")
const inventoryRoute = require("./routes/inventoryRoute")
const baseController = require("./controllers/baseController")
const errorController = require("./controllers/errorController")
const utilities = require("./utilities/index")

/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require("connect-pg-simple")(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: "sessionId",
}))

// Express Messages Middleware
app.use(require("connect-flash")())
app.use(function(req, res, next){
  res.locals.messages = require("express-messages")(req, res)
  next()
})

// Body-parser usage Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // For parsing application/x-www-form-urlencoded

app.use(cookieParser())
app.use(utilities.checkJWTToken)

/* ***********************
 * View engine and template
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/
app.use(static)

// Route for the images
app.use(express.static("public"))

// Index route with a more robust error handler
app.get("/", utilities.handleErrors(baseController.buildHome))

// Route for the error 500 page
app.get("/error", utilities.handleErrors(errorController.buildError500))

// Inventory routes
app.use("/inv", inventoryRoute)

// Account routes
app.use("/account", require("./routes/accountRoute"))

// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'Ops, looks like that you are not worthy to see this content, please return.'})
})

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
