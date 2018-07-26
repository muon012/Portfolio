var express = require("express");
var objs = require("../data/cars");

var router = express.Router();

router.get("/cars", function (req, res) {
    res.json(objs.cars);
});

router.get("/users", function (req, res) {
    res.json(objs.users);
});

router.post("/cars", function(req, res){

    var user = req.body.name;
    var userScore = req.body.score;
    var diffTotal; // this will be the total difference between a car's score and the user'score.
    var diffTotalArray = []; // we will place the total diffrences in this array.
    var carSelected = {
        car: "",
        picture: "",
        score: []
    }


    for(var i= 0; i < objs.cars.length; i++){
        var carScore = objs.cars[i].score;
        // let "diffTotal = 0" because the total difference amongst each car and the user must be reseted to 0 for each different car, otherwise, it will add the previous result to the current result.
        diffTotal = 0;

        for(var j= 0; j < carScore.length; j++){
            var diffDigit = Math.abs(carScore[j]-userScore[j]); // find the absolute value of the difference of each number in the car and user arrays.
            diffTotal += diffDigit; // add all the absolute values to "0".
        }

        diffTotalArray.push(diffTotal); // the diferrence for each car is placed in the array.
        var lowestDiff = Math.min.apply(null,diffTotalArray); // we find the lowest value in such array.
        // console.log(diffTotalArray);
        // console.log(lowestDiff);
        var carForUser = diffTotalArray.indexOf(lowestDiff); // find the index of the lowest difference so we can use such number to find the car from the cars' array.
        // console.log(carForUser);
        carSelected.car = objs.cars[carForUser].car;
        carSelected.picture = objs.cars[carForUser].picture;
    }

    objs.users.push(
        {
            name: user,
            score: userScore,
            car: carSelected.car
        });
    
    res.json(carSelected);

});

// In the file "cars.js" an onject was created using module.exports. We are accessing that object by "require" and then set it
// equal to "var objs". We then use the specific property of the object we want to address like "objs.cars" and "objs.users".

module.exports= router;