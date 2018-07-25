var express = require("express");
var objs = require("../data/cars");

var router1 = express.Router();

router1.get("/cars", function (req, res) {
    res.json(objs.cars);
});

router1.get("/users", function (req, res) {
    res.json(objs.users);
});

// In the file "cars.js" an onject was created using module.exports. We are accessing that object by "require" and then set it
// equal to "var objs". We then use the specific property of the object we want to address like "objs.cars" and "objs.users".

module.exports= router1;