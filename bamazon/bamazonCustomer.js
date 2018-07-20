var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Dora4ever",
  database: "bamazon"
});

//Function to check that the item's id exists;
var checkStock = function (product, stock) {
  var numProduct = parseInt(product);
  for (var i = 0; i < stock.length; i++) {
    if (stock[i].item_id === numProduct) {
      return true;
    }
  }
}
//Function to substract order from the store.
var deduct = function (order, id, stock) {
  var numOrder = parseInt(order);
  var numId = parseInt(id);
  var total = numOrder * stock[numId - 1].price;
  if (numOrder > stock[numId - 1].stock_quantity) {
    console.log("Insufficient quantity!");
    console.log("Only " + stock[numId - 1].stock_quantity + " available;");
    quit();
  }
  else {
    connection.query("UPDATE products SET stock_quantity= stock_quantity - ? WHERE item_id = ?", [numOrder, numId], function (err, res) {
      if (err) throw err;
      console.log("Your total is: $" + total + "\n",
                   "You purchased: " + numOrder + " unit(s) of " + stock[numId -1].product_name + "\n",
                  "-----------------------------------------------------------------");
      quit();
    })
  }
}

//Function to start the prompt in case the item id is not found or product's quantity in insufficient
var quit = function () {
  inquirer.prompt(
    [
      {
        name:"goExit",
        type: "input",
        message: "Press 'b' to make a new purchase or 'q' to exit app",
        validate: function(value){
          if(isNaN(value)){
            if(value === "b"){
              start();
            }
            else if( value === "q"){
              process.exit(22);
            }
            else{
              return false;
            }
          }
          else {
            return false;
          }
        }
      }
    ])
};

//Function to start the prompt questions;
var start = function () {
  connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, res) {
    if (err) throw err;
    res.forEach(function (elem) {
      console.log("Item ID: " + elem.item_id + "; Product: " + elem.product_name + "; Price: $" + elem.price + ";");
    });
    inquirer.prompt(
      [
        {
          name: "item_ID",
          type: "input",
          message: "Type the ID(number) of the product you would like to purchase: ",
          validate: function (name) {
            if (isNaN(name)) {
              return false;
            }
            return true;
          }
        },
        {
          name: "requestedQuantity",
          type: "input",
          message: "How much would you like to buy?(Use numbers): ",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (answer) {
        // If item id exist then run this function
        var check = checkStock(answer.item_ID, res);
        if (!check) {
          console.log("Sorry, Item ID not found. TRY AGAIN!!!");
          console.log("---------------------------------");
          start();
        }
        else {
          deduct(answer.requestedQuantity, answer.item_ID, res);
        }
      })
  })
};

connection.connect(function (err) {
  if (err) throw err;
  start();
});