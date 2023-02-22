//variables

var startBtn = document.querySelector("#startBtn");
var submitBtn = document.querySelector("#submitBtn");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var score = 0;
var time = 90;
var startCount = false;
var timer = document.getElementById("countdownTimer")
var timeLeft = true;
var initialsEl = document.getElementById("initials")
var thisQuestion = 0;
//array of questions and their answers
var questions = [
  {
      question: "Commonly used date types DO NOT include",
      answerChoice: [" booleans", " string", " alerts", " numbers"],
      correctAnswer: " alerts"
  }, 
  {
      question: "The condition in an if/else statement is closed in:",
      answerChoice: [" Curly brackets", " Quotes", " Parenthesis", " Square Brackets"],
      correctAnswer: " Parenthesis"
  },
  {
      question: "Arrays in JavaScript can be used to store: ",
      answerChoice: [" numbers and strings", " other arrays ", "booleans ", " all of the above"],
      correctAnswer: " all of the above"
  }, 
  {
      question: "String values must be enclose within ____ when being assigned as variables.",
      answerChoice: [" quotes", " curly brackets", " commas", "parenthesis"],
      correctAnswer: " quotes"
  },
  {
      question: "A very useful tool used during development and debugging for priting content to the debugger is: ",
      answerChoice: [" JavaScript", " terminal/bash", " for loops", " console.log"],
      correctAnswer: " console.log"
  }];


  var countdownInterval = setInterval(setCountdownTimer, 1000);

function setCountdownTimer(){
  //make the countdown timer variable + function

  if (startCount){
  time --;
  }
  if (time <= 0) {
    stopQuiz()
  }
  document.getElementById("timer").innerHTML = time;
}

//Event listener for the start button
function startQuiz() {
  //hide start screen
  var startScreenEl = document.getElementById("startScreen");
  startScreenEl.setAttribute("class", "hide");

  //show questions
  questionsEl.removeAttribute("class");

  setCountdownTimer();
  setQuestions();
  startCount= true;
};

function setQuestions() {
  var currentQuestion = questions[thisQuestion];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.question;

  choicesEl.innerHTML = "";

  currentQuestion.answerChoice.forEach(function(choice, i) {
    var choicesButton = document.createElement("button");
    choicesButton.setAttribute("class", "choice");
    choicesButton.setAttribute("value", choice)
    choicesButton.textContent = i + 1 + ") "+ choice;
    //add event listener to check for answer
    choicesButton.onclick = clickAnswer;

    //display choices
    choicesEl.appendChild(choicesButton);
  });
}

function clickAnswer() {
    if (this.value !== questions[thisQuestion].correctAnswer){
      //subtract time for wrong answer and check if time went below 0
      time -= 10;
      if (time < 0){
        time = 0;
      }
    }

    //next question
    thisQuestion++;

    //check to make sure we have not reached the end of quiz
    if (thisQuestion === questions.length){
      stopQuiz();
    }
    else {
      setQuestions();
    }
}

function stopQuiz(){
      //stop timer
      clearInterval(countdownInterval);

      //display end screen
      var endScreen = document.getElementById("end-screen");
      endScreen.removeAttribute("class");

      //show score equal to remaining time
      var finalScore = document.getElementById("final-score");
      finalScore.textContent = time;

      //hide last question
      questionsEl.setAttribute("class", "hide") 
}

function saveHighscore() {
  var initials = initialsEl.value;

  //pull scores locally if they dont exist create blank array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  var formatScore = {
    score: time,
    initials: initials
  }
  console.log(formatScore)
  //save scores
  highscores.push(formatScore);
  window.localStorage.setItem("highscores", JSON.stringify(highscores));
  console.log(highscores)

  //redirect to scores page
  window.location.href = "scores.html";
};

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;