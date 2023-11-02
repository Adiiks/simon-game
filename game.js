var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var currentPositionInPattern = 0;
var gameStarted = false;

$(document).on("keypress", function() {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkPattern();
});

function nextSequence() {
    $("h1").text("Level " + level);
    
    var colorNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[colorNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
}

function playSound(name) {
    new Audio("./sounds/" + name + ".mp3").play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkPattern() {
    if (gamePattern[currentPositionInPattern] === userClickedPattern[currentPositionInPattern]) {
        if (currentPositionInPattern !== gamePattern.length - 1) {
            currentPositionInPattern++;
        } else {
            setTimeout(nextSequence, 1000);
            currentPositionInPattern = 0;
            userClickedPattern = [];
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    restartGame();
}

function restartGame() {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    currentPositionInPattern = 0;
    gameStarted = false;
}