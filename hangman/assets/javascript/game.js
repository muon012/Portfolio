

// Create objects for the "demons" array..
var demon1 = {
    name: "cacodemon",
    image: "./assets/images/cacodemon.jpg",
    description: "Cacodemons are red monsters with large spherical bodies crowned with horns, that float slowly through the air. They attack by spitting a ball of plasma or by biting with their gaping maw. "
}
var demon2 = {
    name: "pinky",
    image: "./assets/images/pinky.jpg",
    description: "The Demon (aka Pinky or Pinky demon) is a relatively big, pink, bulky, muscular, vaguely humanoid monster with sharp teeth, two horns on its big head, backwards knees and three claws on each foot. Demons let out a loud growl, similar to a lion's roar, when they become aware of the player's presence. Demons do not have a ranged attack, thus they are not a threat at long range. However, they have a huge advantage over many of their counterparts: speed."
}
var demon3 = {
    name: "imp",
    image: "./assets/images/imp.jpg",
    description: "The Imp is a human-sized humanoid demon. It is leather brown in color, with blood-red eyes and mouth, several white bony spikes on its body, and equally white claws on its hands and feet. Imps attack by hurling a single fireball, which inflicts direct projectile damage; at melee range, it employs a clawing attack. The Imp moves slowly, as do its fireballs."
}
var demon4 = {
    name: "revenant",
    image: "./assets/images/revenant.jpg",
    description: "Revenants take the form of very tall animated skeletons with golden-brown bones, in metallic silver body armor equipped with shoulder-mounted missile launchers, and blood and gore running down their ribcage and legs. Revenants are fast runners, but unlike Demons or Spectres, run directly at their target rather than zigzagging aimlessly, and are also quick to fire their missiles or punch any nearby targets, making them quite dangerous due to their speed."
}
var demon5 = {
    name: "cyberdemon",
    image: "./assets/images/cyberdemon.jpg",
    description: " The cyberdemon is a tall, muscular, minotaur-like beast with two dark black/grey horns, a cybernetic right leg, a large rocket launcher mounted on its left arm, red wiring on its lower torso, as well as patches of metal and wires on its right arm. It attacks by firing barrages of three rockets."
}
var demon6 = {
    name: "mancubus",
    image: "./assets/images/mancubus.jpg",
    description: "The Mancubus is a horrendously large, cybernetic humanoid monster shambling about on sturdy, stumpy elephant-like legs, glaring at opponents through hateful green eyeballs without irises or pupils, while dribbling the remains of dead victims from its lusting mouth, displaying sharp yellow fangs. Mancubi are dangerous opponents, but have a number of exploitable weaknesses. They are slow, and make large targets, so are easy to kill with rapid-fire weapons. Much like Cacodemons, Mancubi have a high pain chance and generally aren't able to fire when under attack from a chaingun or plasma rifle."
}
var demon7 = {
    name: "maledict",
    image: "./assets/images/maledict.jpg",
    description: "The Maledict is the demonic reincarnation of Dr. Malcolm Betruger. It appears as a mostly skeletal wyvern with a large set of wings, two legs with clawed feet, a long tail and a head similar to a Forgotten One. He emits a loud, piercing scream and has empty eye sockets. Betruger's head is fused to the creature's tongue and only appears when the Maledict needs to speak."
}
// Create the first variables: - array of objects - number of wins - number of guesses left - array for the underscores - array for the wrong guesses-

var demons = [demon1, demon2, demon3, demon4, demon5, demon6, demon7];
var wins = 0;
var remlives = 10;
var underScores = [];
var wrongLetters = [];
var audioCorrect = new Audio("./assets/images/Correct-Sound.mp3"); // Function that will play a sound when the letters is guessed correctly.

// Make a "random" number that will serve as the random number.
var random = Math.floor(Math.random() * demons.length);
// Choose the demon's name/picure/description randomly.
var computerChoice = demons[random].name;
var imageChoice = demons[random].image;
var statsChoice = demons[random].description;
// Take the demon's name and splitt the letters into an array.
var demonNameArray = computerChoice.split("");

// Create a function to start the game and after the player loses.
var startGame = function () {

    underScores = []; // Empty the array.
    wrongLetters = []; // Empty the array.
    remlives = 10; // Reset remaining lives to 10.

    // Make a for-loop to push as many underscores as there are letters in the demon's name.
    for (var i = 0; i < demonNameArray.length; i++) {
        underScores.push("_");
    };
    // Change the DOM content according to the starting values.
    document.getElementById("image").src = "./assets/images/background.jpg"; // Initial picture.
    document.getElementById("word").textContent = underScores.join("   "); // Word to be guessed represented as underscores.
    document.getElementById("wins").textContent = wins; // Number of wins.
    document.getElementById("guesses-left").textContent = remlives; // Remaining lives.
    document.getElementById("guesses-wrong").textContent = wrongLetters.join("  "); // Wrong letters will be display separated by a space between them.
    document.getElementById("stats").textContent != statsChoice;


};
startGame();
// Events when the user presses a key:
document.onkeyup = function (event) {
    var userKey = event.key;
    console.log(event.keyCode);


    // If the key pressed is correct, then run this conditional statement.
    if (demonNameArray.indexOf(userKey) > -1) {
        // Play the sound file for correct guesses.
        audioCorrect.play();


        // If there are copies of the same letter in the word to be guessed, i.e. the word "putting" has two letters "t", then write the "userKey" on the appropriate location of the word, which in this case the word is represented by "underScores". 
        for (var j = 0; j < demonNameArray.length; j++) {
            if (userKey === demonNameArray[j]) {
                underScores[j] = userKey;
                document.getElementById("word").textContent = underScores.join(" ");
                // Check that the "finished" word by the user is the same as the one chosen by the computer.
                if (underScores.toString() === demonNameArray.toString()) {
                    wins++;
                    document.getElementById("stats").textContent = statsChoice;
                    document.getElementById("image").src = imageChoice;
                    document.getElementById("wins").textContent = wins;
                    alert("You are ready to take on Hell's migthiests!!!");
                }
            }
        };
    }
    else {
        // If the "userKey" is NOT in the array "userLettters" then push the letter into it; also reduce the number of guesses remaining with "remLives".
        if (!wrongLetters.includes(userKey)) {
            remlives--;
            wrongLetters.push(userKey);
            document.getElementById("guesses-wrong").textContent = wrongLetters.join("  ");
            document.getElementById("guesses-left").textContent = remlives;
            // If player loses...
            if (remlives === 0) {
                alert("Hell has taken you!!!")
                startGame();
            }
        }
    }
};