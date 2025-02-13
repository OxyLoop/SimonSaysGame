var colors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];

var gameStarted = false;
var level = 0;

var inputAllowed = false;

// Start or restart the game with the "Enter" key
$(document).keypress(function (event) {
    if (event.key === "Enter" && !gameStarted) {
        $("h1").text("Level 0");
        resetGame();
        newSequence();
        gameStarted = true;
    }
});

// Handle color input with R, B, G, Y keys during the game
$(document).keypress(function (event) {
    if (gameStarted && inputAllowed) {
        var keyPressed = event.key.toLowerCase();
        var keyColorMap = {
            r: "red",
            b: "blue",
            g: "green",
            y: "yellow"
        };

        if (keyColorMap[keyPressed]) {
            var userChosenColor = keyColorMap[keyPressed];
            userPattern.push(userChosenColor);

            playSound(userChosenColor);
            animatePress(userChosenColor);

            checkAnswer(userPattern.length - 1);
        }
    }
});

$(".btn").click(function () {
    if (gameStarted && inputAllowed) {
        var userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userPattern.length - 1);
    }
});


// Check the user's input against the game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            inputAllowed = false;
            setTimeout(function () {
                newSequence();
                inputAllowed = true;
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over. Press Enter to Restart!");
        gameStarted = false;  // Game over, allow restart with Enter
    }
}

// Reset game variables
function resetGame() {
    level = 0;
    gamePattern = [];
    userPattern = [];
    inputAllowed = true;
}

// Create a new sequence for the user to follow
function newSequence() {
    level++;
    userPattern = [];
    
    $("h1").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = colors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
}

// Play sound for both user and game pattern
function playSound(colorName) {
    var chosenAudio = new Audio("sounds/" + colorName + ".mp3");
    chosenAudio.play();
}

// Animate button when pressed
function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}
