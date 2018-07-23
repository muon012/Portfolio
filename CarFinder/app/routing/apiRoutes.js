var express = require("express");
var cars = require("../data/friends");

var router1 = express.Router();

router1.get("/api/cars", function (req, res) {
    res.json(cars);
});

// router.get("/api/users", function (req, res) {
//     res.json(users);
// });

module.exports= cars;