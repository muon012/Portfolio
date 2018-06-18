$(document).ready(function () {

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
    // username button on click events
    $("#userBtn").on("click", function (e) {
        e.preventDefault();
        console.log("UserName clicked");
    });

    // images on click events
    $(".navbar-brand").on("click", function (e) {
        e.preventDefault();
        console.log($(this).attr("data-name"));

        // selecting only one image, which is inside an <a>, from the <div> with id="containerFighters"
        $(this).parentsUntil("#containerFighters").find(".navbar-brand").removeClass("active");
        $(this).addClass("active");

        if (Object.keys(fightersURL).indexOf($(this).attr("data-name") > -1)) {
            $("#player1FighterChoice").attr("src", fightersURL[$(this).attr("data-name")].win);
            console.log("correct");
        }
    });

    // chat buttons on click events
    $("#chatBtn").on("click", function (e) {
        e.preventDefault();
        console.log("Chat clicked");
    });
})