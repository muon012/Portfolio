$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBpHHA7_YVD8wC1r2C7bgDujh7AEjR4M2Y",
        authDomain: "multiplayer-760c6.firebaseapp.com",
        databaseURL: "https://multiplayer-760c6.firebaseio.com",
        projectId: "multiplayer-760c6",
        storageBucket: "",
        messagingSenderId: "753712523459"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    database.ref().on("value", function (snapshot) {

        if (snapshot.child("players").exists()) {

        }

        var dbProperty = snapshot.val();

    });

    // Inititalize values
    var players = 0;
    var player1 = "Player1";
    var player2 = "Player2";
    var winsPlayer1 = 0;
    var lossesPlayer1 = 0;
    var winsPlayer2 = 0;
    var lossesPlayer2 = 0;
    var ties = 0;
    var turn = 0;

    var fighters = ["athena", "igniz", "iori", "k", "k9999", "kula", "kyo", "leona", "mai", "terry", "whip", "yuri"];

    // Object with all the different gif animations for each character
    var fightersURL = {
        athena: {
            start: "./assets/images/athena/athena-start.gif",
            attack: "./assets/images/athena/athena-attack.gif",
            win: "./assets/images/athena/athena-win.gif",
            lose: "./assets/images/athena/athena-lose.gif",
            random: "./assets/images/athena/athena-random.gif"
        },
        igniz: {
            start: "./assets/images/igniz/igniz-start.gif",
            attack: "./assets/images/igniz/igniz-attack.gif",
            win: "./assets/images/igniz/igniz-win.gif",
            lose: "./assets/images/igniz/igniz-lose.gif",
            random: "./assets/images/igniz/igniz-random.gif"
        },
        iori: {
            start: "./assets/images/iori/iori-start.gif",
            attack: "./assets/images/iori/iori-attack.gif",
            win: "./assets/images/iori/iori-win.gif",
            lose: "./assets/images/iori/iori-lose.gif",
            random: "./assets/images/iori/iori-random.gif"
        },
        k: {
            start: "./assets/images/k/k-start.gif",
            attack: "./assets/images/k/k-attack.gif",
            win: "./assets/images/k/k-win.gif",
            lose: "./assets/images/k/k-lose.gif",
            random: "./assets/images/k/k-random.gif"
        },
        k9999: {
            start: "./assets/images/k9999/k9999-start.gif",
            attack: "./assets/images/k9999/k9999-attack.gif",
            win: "./assets/images/k9999/k9999-win.gif",
            lose: "./assets/images/k9999/k9999-lose.gif",
            random: "./assets/images/k9999/k9999-random.gif"
        },
        kula: {
            start: "./assets/images/kula/kula-start.gif",
            attack: "./assets/images/kula/kula-attack.gif",
            win: "./assets/images/kula/kula-win.gif",
            lose: "./assets/images/kula/kula-lose.gif",
            random: "./assets/images/kula/kula-random.gif"
        },
        kyo: {
            start: "./assets/images/kyo/kyo-start.gif",
            attack: "./assets/images/kyo/kyo-attack.gif",
            win: "./assets/images/kyo/kyo-win.gif",
            lose: "./assets/images/kyo/kyo-lose.gif",
            random: "./assets/images/kyo/kyo-random.gif"
        },
        leona: {
            start: "./assets/images/leona/leona-start.gif",
            attack: "./assets/images/leona/leona-attack.gif",
            win: "./assets/images/leona/leona-win.gif",
            lose: "./assets/images/leona/leona-lose.gif",
            random: "./assets/images/leona/leona-random.gif"
        },
        mai: {
            start: "./assets/images/mai/mai-start.gif",
            attack: "./assets/images/mai/mai-attack.gif",
            win: "./assets/images/mai/mai-win.gif",
            lose: "./assets/images/mai/mai-lose.gif",
            random: "./assets/images/mai/mai-random.gif"
        },
        terry: {
            start: "./assets/images/terry/terry-start.gif",
            attack: "./assets/images/terry/terry-attack.gif",
            win: "./assets/images/terry/terry-win.gif",
            lose: "./assets/images/terry/terry-lose.gif",
            random: "./assets/images/terry/terry-random.gif"
        },
        whip: {
            start: "./assets/images/whip/whip-start.gif",
            attack: "./assets/images/whip/whip-attack.gif",
            win: "./assets/images/whip/whip-win.gif",
            lose: "./assets/images/whip/whip-lose.gif",
            random: "./assets/images/whip/whip-random.gif"
        },
        yuri: {
            start: "./assets/images/yuri/yuri-start.gif",
            attack: "./assets/images/yuri/yuri-attack.gif",
            win: "./assets/images/yuri/yuri-win.gif",
            lose: "./assets/images/yuri/yuri-lose.gif",
            random: "./assets/images/yuri/yuri-random.gif"
        },

    };
    // // Updating the page if there are players on the game already.
    // database.ref().on("value", function (snapshot) {
    //     if (players === 2) {
    //         $("#tooManyPlayersModal").modal("toggle");
    //         $("#manyPlayersModalButton").on("click", function (e) {
    //             window.close();
    //         });
    //     }
    //     else if (players === 1) {
    //         $("#justOnePlayerModal").modal("toggle");
    //     }
    //     else if (players === 0) {
    //         $("#welcomeModal").modal("toggle");
    //     }
    // });

    var userListRef = firebase.database().ref("USERS_ONLINE");
    var myUserRef = userListRef.push();

    // Monitor connection state on browser tab
    firebase.database().ref(".info/connected").on("value", function (snap) {
        if (snap.val()) {
            // if we lose network then remove this user from the list
            myUserRef.onDisconnect().remove();
            // set user's online status
            setUserStatus("online");
        } else {
            // client has lost network
            setUserStatus("offline");
        }
    });

    // Choosing a username for player-1 - on click events for the submit button
    $("#userBtn").on("click", function (e) {
        e.preventDefault();

        var username = $("#username").val().trim();
        $(".player1").text(username);

        database.ref("players").push(username, function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Player Added");
            }
        });
        $("#username").val("");

        console.log("UserName clicked");
    });

    // Selecting fighter at the beginning of the game will change the gif animation.
    $(".navbar-brand").on("click", function (e) {
        e.preventDefault();
        console.log($(this).attr("data-name"));

        // adding a border to the image of the fighter when clicked.
        $(this).parentsUntil("#containerFighters").find(".navbar-brand").removeClass("active");
        $(this).addClass("active");

        if (Object.keys(fightersURL).indexOf($(this).attr("data-name") > -1)) {
            $("#player1FighterChoice").attr("src", fightersURL[$(this).attr("data-name")].start);
            $(".choices1Btn").attr("data-name", $(this).attr("data-name"));
            console.log("fighter-start-gif");
        }
    });

    // Selecting a choice (r,p,s) will change gif animation for player-1.
    $(".choices1Btn").on("click", function (e) {
        $("#player1FighterChoice").attr("src", fightersURL[$(this).attr("data-name")].attack);
    });

    // chat buttons on click events
    $("#chatBtn").on("click", function (e) {
        e.preventDefault();

        var chatMessage = $("#chatInput").val().trim();
        $("#chatInput").val("");

        var newChat = $("<p>");
        newChat.addClass("card-text");
        newChat.text(chatMessage);
        $("#chatBox").append(newChat);
        $("#chatContainer").scroll();

        console.log("Chat clicked");
    });
})