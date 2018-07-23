var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var routes = require("./app/routing/htmlRoutes");
var routes1 = require("./app/routing/apiRoutes");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", routes);
app.use("/api/cars", routes1);
// app.get("/api/cars", function(req,res){
//     res.send(routes1);
// })

app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(PORT, function(){
    console.log("---------------------");
    console.log("App listening on PORT: " + PORT);
});