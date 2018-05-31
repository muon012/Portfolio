$(document).ready(function() {

    // Making arrays for the questions
    var questions = [
     "What does \"Pot of Greed\" do?",
     "There are 2 Dragon-type monsters on your side of the field and 1 in your hand. Your opponent has 2, one on the field and the other in the graveyard. You play \"Buster Blade\", how many attack points does it have?", 
     "Which Ultimate Dragon is the strongest?", 
     "After how many turns of playing \"Final Countdown\" does the player win the game?", 
     "How many attack points does \"Kuriboh\" have?", 
     "Which method can destroy \"Exodia Necross\"",
     "\"You can return up to 2 Monsters cards from the field to the owner's hand\"... is the effect of which card?",
     "What does the fusion of \"Dark Magician\" and \"Buster Blade\" result?",
     "Apart from the \"Exodia\" parts, \"Destiny Board\", and \"Final Countdown\", which other card gives you an instant win when played?"
    ];

    // Pictures for the questions
    var picturesQuestions = [
    "./assets/images/pot-of-greed2.png", 
    "./assets/images/buster-blade2.jpg",
    "./assets/images/ultimate-dragons2.png",
    "./assets/images/final-countdown2.png",
    "./assets/images/kuriboh2.jpg",
    "./assets/images/exodia-necross2.jpg",
    "./assets/images/card-destruction.jpg",
    "./assets/images/dark-paladin2.png",
    "./assets/images/instant-win.png"
    ];

    // Pictures for the answers
    var picturesAnswers = [
    "./assets/images/pot-of-greed.jpg", 
    "./assets/images/buster-blade.jpg",
    "./assets/images/ultimate-dragons.png",
    "./assets/images/final-countdown.png",
    "./assets/images/kuriboh.jpg",
    "./assets/images/Exodia-Necross.jpg",
    "./assets/images/penguin-soldier.jpg",
    "./assets/images/dark-paladin.png",
    "./assets/images/horakhty-the-creator-of-light.png"
    ];

    // Making arrays for the answers
    var answers0 = ["Draw 2 cards", "Draw 1 card", "Add 100 Life Points each turn you draw a card", "Both players draw 2 cards"];
    var answers1 = ["3600", "4600", "4100", "5100"];
    var answers2 = ["They all have the same Attack Points", "Blue-Eyes Ultimate White Dragon", "Blue-Eyes Ultimate Black Dragon", "Neo Blue-Eyes Ultimate Dragon"];
    var answers3 = ["20", "25", "15", "10"];
    var answers4 = ["300", "400", "500", "200"];
    var answers5 = ["Removing Exodia parts from the Exodia's user's graveyard", "Attacking it with higher Attack Points", "Using Dark Hole", "Using an Egyptian God card"];
    var answers6 = ["Penguin Soldier", "Man-Eater Bug", "Graceful Charity", "Change of Heart"];
    var answers7 = ["Dark Paladin", "Black Luster Soldier", "Magician of Black Chaos", "Dark Magician of Chaos"];
    var answers8 = ["Horakhty The Creator of Light", "Obelisk the Tormentor", "Slifer the Sky Dragon", "The Winged Dragon of Ra"];
    var answersArray = [answers0, answers1, answers2, answers3, answers4, answers5, answers6, answers7, answers8];

    //  Making an array for the quotes that will show up at the bottom of the page.
    var quotes = ["I'm here to kick ass and chew gum. And I'm all out of gum...", 
    "Anyone who's late for registration will be disqualified. Mokuba, make sure Wheeler's late.", 
    "Hmm. Blah-blah-blah. Don't you get tired of making the same speech every time you're faced with a challenge? Stop saving the world and get a hobby!",
    "I'm surrounded by superstitious nitwits.",
    "Now I will create a Duel Monster without peer by combining my three Blue-Eyes White Dragons with my Polymerization card to create... The Blue-Eyes Ultimate Dragon",
    "You made two mistakes. The first was handing Obelisk to me. The second was expecting it back", 
    "As president of Kaiba Corp, I declare this invalid!"];

    var random9; // Random number for arrays with 9 values (Questions/ PicturesQuestions/PicturesAnswers).
    var random7; // Random number for arrays with 7 values (quotes).
    var random4; // Random number for arrays with 4 values (answers 0-9)
    var random1; // Same as above.
    var random2; // Same as above.
    var random3; // Same as above.
    var passedAnswers; // Total number of right answers.
    var failedAnswers; // Total number of wrong answers.
    var seconds; // Number of seconds.

    // Start function to start the game.
    var start = function() {

        // Empty the div with the start game button.
        $(".button-container").empty();


        // Create a start game button.
        var buttonNum00 = $("<button>");
        buttonNum00.attr("class", "choices");
        buttonNum00.attr("id", "button00");
        buttonNum00.text("Press button to start game");
        $(".button-container").append(buttonNum00);
        $("p").empty();

        // When the start game button is clicked, run this function.
        $(buttonNum00).on("click",function() {
            trivia();
            console.log("start function pressed");
        });
    };
    start();

    //  // Timer variables and functions.
    // var intervalId;
    // var seconds = 25;

    // var run = function() {
    //     clearInterval(intervalId);
    //     intervalId = setInterval(goingDown, 1000);
    //   };

    // var goingDown = function() {
    //     seconds--;
    //     $("#countdown").text("Time left: " + seconds);
    //     if(seconds === 0) {
    //         stop();
    //         console.log("Time's up");

    //     };
    // };
    // var stop = function() {
    //     clearInterval(intervalId);

    // };



    // Trivia function that will run after starting the game.
    var trivia = function() {
        
        // Question instructions.
        $("#questionMessage").text(questions[0]);

        // Picture for the current question.
        $("#picture").attr("src", picturesQuestions[0]);

        // Select random Kaiba quote.
        random7 = Math.floor(Math.random()*7);
        $("#foot").html("\"" + quotes[random7] + "\"");

        // Empty the div with the start game button.
        $(".button-container").empty();

        // Randomize the location of the answers using these random numbers.
        random4 = Math.floor(Math.random()*4);
        do {
            random1 = Math.floor(Math.random()*4);
        } while(random1 === random4);
        do {
            random2 = Math.floor(Math.random()*4);
        } while(random2 === random1 || random2 === random4);
        do {
            random3 = Math.floor(Math.random()*4);
        } while(random3 === random2 || random3 === random1 || random3 === random4);

        // Button0 starting values
        var buttonNum0 = $("<button>");
        buttonNum0.attr("class", "choices");
        buttonNum0.attr("id", "button0");
        buttonNum0.text(answersArray[0][random4]);
        $(".button-container").append(buttonNum0);

        // Button1 starting values
        var buttonNum1 = $("<button>");
        buttonNum1.attr("class", "choices");
        buttonNum1.attr("id", "button1");
        buttonNum1.text(answersArray[0][random1]);
        $(".button-container").append(buttonNum1);
        
        // Button2 starting values
        var buttonNum2 = $("<button>");
        buttonNum2.attr("class", "choices");
        buttonNum2.attr("id", "button2");
        buttonNum2.text(answersArray[0][random2]);
        $(".button-container").append(buttonNum2);

        // Button3 starting values
        var buttonNum3 = $("<button>");
        buttonNum3.attr("class", "choices");
        buttonNum3.attr("id", "button3");
        buttonNum3.text(answersArray[0][random3]);
        $(".button-container").append(buttonNum3);

        var z = -1;
        var passedAnswers = 0;
        var failedAnswers = 0;

        //  // Timer variables and functions.
        var intervalId;
        var seconds = 25;

        var run = function() {
            clearInterval(intervalId);
            intervalId = setInterval(goingDown, 1000);
        };

        var goingDown = function() {
            seconds--;
             $("#countdown").text("Time left: " + seconds);
            if(seconds === 0) {
                stop();
                console.log("Time's up");

             };
        };
        var stop = function() {
            clearInterval(intervalId);

        };

        run();

        $("button").click(function(){
            
            stop();
            z++;
            console.log(answersArray[z][0]);
            console.log(z);
            console.log($(this).text());
            if($(this).text() === answersArray[z][0]) {

                passedAnswers++;
                
                // Picture for the correct answer.
                $("#picture").attr("src", picturesAnswers[z]);

                // Empty the div with the buttons.
                $(".button-container, #questionMessage").empty();

                // Display message
                $("#answerReason").text("You are correct!");

                // Display total
                $("#goodAnswers").text("Right answers: " + passedAnswers);
                $("#badAnswers").text("Wrong answers: " + failedAnswers);

            }
            else if( seconds === 0) {
                failedAnswers++;

                // Picture for the correct answer.
                $("#picture").attr("src", picturesAnswers[z]);

                // Empty the div with the buttons.
                $(".button-container, #questionMessage").empty();
                

                // Display message
                $("#answerReason").text("You ran out of time!!!");

                // Display total
                $("#goodAnswers").text("Right answers: " + passedAnswers);
                $("#badAnswers").text("Wrong answers: " + failedAnswers);
            
            }
            else if($(this).text() != answersArray[z][0]) {

                failedAnswers++;
                
                // Display message
                $("#answerReason").text("Sorry, you are wrong!");
                
                // Display total
                $("#goodAnswers").text("Right answers: " + passedAnswers);
                $("#badAnswers").text("Wrong answers: " + failedAnswers);

            }

        });

    };

    // End Game function;
    var endGame = function() {
        
        // Empty the divs with previous information.
        $(".button-container, #questionMessage, answerReason, .image-div").empty();

        // Total number of correct and wrong answers.
        $("#goodAnswers").text("Correct Answers: " + passedAnswers);
        $("#badAnswers").text("Wrong Answers: " + failedAnswers);

        // Make sure timer doesn't run.
        stop();

        // Create button to start game again.
        var buttonNum000 = $("<button>");
        buttonNum000.attr("class", "choices");
        buttonNum000.attr("id", "button000");
        buttonNum000.text("Press button to start game again!");
        $(".button-container").append(buttonNum000); 

        $(buttonNum000).on("click",function() {
            start();
        });
    };
        
});