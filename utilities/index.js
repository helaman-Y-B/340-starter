const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */

Util.getNav = async function (req, res, next) {
    let data = await invModel.getClassifications()
    console.log(data) // Check the data object
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

/*<ul id="nav-bar">
        <li id="current">Home</li>
        <div id="dropdown">
            <li>Custom</li>
            <li>Sedam</li>
            <li>SUV</li>
            <li>Truck</li>
        </div>
    </ul>*/

module.exports = Util