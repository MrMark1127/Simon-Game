let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

function nextSequence() {
  userClickedPattern = []
  
  level++
  $('#level-title').text(`Level ${level}`)

  let randomNumber = Math.floor(Math.random() * 4)
  let randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
  playSound(randomChosenColor)
}

function playSound(name) {
  let sound = new Audio(`sounds/${name}.mp3`);
  sound.volume = 0.025
  sound.play();
}

function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success")
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound("wrong")
    $('body').addClass("game-over")
    setTimeout(function() {
      $('body').removeClass("game-over")
    }, 200)
    $('h1').text("Game Over, Press Any Key to Restart")
    startOver()
  }
}

function startOver() {
  level =  0
  gamePattern = []
  started = false
}

//Detecting button clicks, adding the button ID to an array and recording what the user has clicked
$(".btn").click(function () {
if (started) {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1)
}
});

$(document).keypress(function (e) {
  if (!started) {
    $("#level-title").text(`Level ${level}`)
    nextSequence();
    started = true;
  }
});