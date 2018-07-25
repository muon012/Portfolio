var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require("./app/routing/htmlRoutes");
var routes2 = require("./app/routing/apiRoutes");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);
app.use("/api", routes2);
// app.get("/api/cars", function(req,res){
//     res.send(routes1);
// })

app.use(express.static("app/public"));


app.listen(PORT, function(){
    console.log("---------------------");
    console.log("App listening on PORT: " + PORT);
});