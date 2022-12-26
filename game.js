var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// if keyboard key pressed for the first time
$(document).keypress(function() {

    if (!started) {

      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;

    }

  });

// if button was clicked
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    // check index of last answer in user's sequence
    checkAnswer(userClickedPattern.length-1);
  
  });

// checks user's answer against game sequence
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
  
        // if the user got the most recent answer right, then check that they have finished their sequence
        if (userClickedPattern.length === gamePattern.length){
  
          setTimeout(function () {

            nextSequence();

          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {

            $("body").removeClass("game-over");

        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
  
      }
}

// create a new pattern
function nextSequence() {

    // reset for next level
    userClickedPattern = [];

    // increase level by 1
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

// add sounds to button clicks
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

// add animations to user clicks
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {

        $("#" + currentColor).removeClass("pressed");

    }, 100);

}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
    
}