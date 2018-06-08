// Set the variables I will use.
var random1;
var random2;
var random3;
var random4;
var wins = 0;
var losses = 0;
var alertSign;
var randomTotal;
var currentUserTotal;
var crystal1;
var crystal2;
var crystal3;
var crystal4;

// DOM manipulation:

$("#computerTotal").text(randomTotal);
$("#userTotal").text(currentUserTotal);
$("#win-lose").text(alertSign);
$("#wins").text(wins);
$("#losses").text(losses);


// Create an starting function: Make sure the random numbers are not duplicated. Initialize values.
var startGame = function (){
    random1 = Math.floor(Math.random()*12 + 1);
    do {
        random2 = Math.floor(Math.random()*12 + 1);
    } while(random2 === random1);
    do {
        random3 = Math.floor(Math.random()*12 + 1);
    } while(random3 === random2 || random3 === random1);
    do {
        random4 = Math.floor(Math.random()*12 + 1);
    } while(random4 === random3 || random4 === random2 || random4 === random1);
    randomTotal = Math.floor(Math.random()*102 + 19);
    currentUserTotal = 0;
    $("#computerTotal").text(randomTotal);
    $("#userTotal").text(currentUserTotal);
    $("#wins").text(wins);
    $("#losses").text(losses);
};
startGame();

function reseter(){
    random1 = 0;
    random2 = 0;
    random3 = 0;
    random4 = 0;
    randomTotal = 0;
    currentUserTotal = 0;
    startGame();
    console.log('game reset');
}


// Whenever the crystals are clicked the value will be added to the player's total and give a "win" or a "loss" accordingly.
$("#gem1").on("click",function() {
  console.log(random1);
  currentUserTotal = currentUserTotal + random1;
  $("#userTotal").text(currentUserTotal);
  if (currentUserTotal === randomTotal) {
      wins++;
      alertSign = "You won!"
      $("#wins").text(wins);
      $("#win-lose").text(alertSign);

      reseter()
  }
  else if ( currentUserTotal > randomTotal) {
      losses++;
      $("#losses").text(losses);
      alertSign = "You lost!";
      $("#win-lose").text(alertSign);
      reseter()
  }
})

$("#gem2").on("click",function() {
    console.log(random2);
    currentUserTotal = currentUserTotal + random2;
    $("#userTotal").text(currentUserTotal);
    if (currentUserTotal === randomTotal) {
        wins++;
        alertSign = "You won!"
        $("#wins").text(wins);
        $("#win-lose").text(alertSign);

        reseter()
    }
    else if ( currentUserTotal > randomTotal) {
        losses++;
        $("#losses").text(losses);
        alertSign = "You lost!";
        $("#win-lose").text(alertSign);
        reseter()
    }
  })

  $("#gem3").on("click",function() {
    console.log(random3);
    currentUserTotal = currentUserTotal + random3;
    $("#userTotal").text(currentUserTotal);
    if (currentUserTotal === randomTotal) {
        wins++;
        alertSign = "You won!"
        $("#wins").text(wins);
        $("#win-lose").text(alertSign);
          reseter()
    }
    else if ( currentUserTotal > randomTotal) {
        losses++;
        $("#losses").text(losses);
        alertSign = "You lost!";
        $("#win-lose").text(alertSign);
        reseter()
    }
  })

  $("#gem4").on("click",function() {
    console.log(random4);
    currentUserTotal = currentUserTotal + random4;
    $("#userTotal").text(currentUserTotal);
    if (currentUserTotal === randomTotal) {
        wins++;
        alertSign = "You won!"
        $("#wins").text(wins);
        $("#win-lose").text(alertSign);
        reseter()
    }
    else if ( currentUserTotal > randomTotal) {
        losses++;
        $("#losses").text(losses);
        alertSign = "You lost!";
        $("#win-lose").text(alertSign);
        reseter()
    }
  })
