var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
//When a key is pressed the next sequence function is called.

$(document).one("keypress", (function() {
    $("#level-title").text("Level " + level);
    nextSequence();
  }));


//When a button is clicked, a sound is played and the pressed button is animated.
$(".btn").click(function(event){
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
  });

//Function responsible for the sound each button makes
function playSound(name){
  var audio = new Audio(name + ".mp3");
  audio.play();
}

//Function responsible for the animation of each button.
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//Checks that the number of elements in the gamePattern array and the number of elements in the user array are the same
function checkAnswer(lastColorPicked){
  if(userClickedPattern[lastColorPicked] === gamePattern[lastColorPicked]){
    console.log("Correct!");
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("Wrong!");
    var wrongAnswer = new Audio("wrong.mp3");
    wrongAnswer.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Refresh Page to Restart");
    startOver();
  }
}
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}


//The function nextSequence chooses the next sequence of colors the user will follow.
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).animate({opacity: 0.5}).animate({opacity: 1});
  playSound(randomChosenColor);
  console.log(gamePattern);

}




//Play the sound for the button color selected the randomly chosen color
