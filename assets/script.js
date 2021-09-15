//selecting different classes and identifiers
var question = document.querySelector("#questions");
var op1 = document.querySelector("#option1");
var op2 = document.querySelector("#option2");
var op3 = document.querySelector("#option3");
var op4 = document.querySelector("#option4");
var highscoreLnk = document.querySelector("#highscore-link");
var timerBtn = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var formShow = document.querySelector("#formcontainer");
var submitBtn = document.querySelector("#submit");
var quiz = document.querySelector(".quizcontainer");
var score1 = document.querySelector("#score1");
var username = document.querySelector("#name");
var scoreshow = document.querySelector("#highscorecontainer");
var playagain1 = document.querySelector("#replay1");
var playagain2 = document.querySelector("#replay2");
var playagain = document.querySelector(".highscore");
var list = document.querySelector("#list");
var list2 = document.querySelector("#list2");
var clearBtn = document.querySelector("#clear");
var clearLocal = document.querySelector("#clearLocal");
//adding event listeners
playagain1.addEventListener("click", restart);
playagain2.addEventListener("click", restart);
startBtn.addEventListener("click", startFunc);
highscoreLnk.addEventListener("click", getScore);
op1.addEventListener("click", optionA);
op2.addEventListener("click", optionB);
op3.addEventListener("click", optionC);
op4.addEventListener("click", optionD);
submitBtn.addEventListener("click", scoreStore);
clearBtn.addEventListener("click", clearFunc);
clearLocal.addEventListener("click", clearFunc);
quiz.style.display = "none";
formShow.style.display = "none";
scoreshow.style.display = "none";
//global variable declaration
var score = 0;
var timeLeft = 0;
var timer;
var user;
var currentQuestion = 0;
//questionobj object holding questions options and answer
var questionObj = [
    {
        question: "Which one of these is used to convert an object to Json string ?",
        option: [".stringify", ".concat", ".parse", "non of the above"],
        answer: ".stringify",
    },

    {
        question: "i++ is",
        option: ["i=i+2", "i=i*i", "i=1+1", "i=i+1"],

        answer: "i=i+1",
    },

    {
        question: "=== will check",
        option: ["value only", "type and value", " assignment function", "nothing checking "],
        answer: "type and value",
    },

    {
        question: "Which of these is primitive data type?",
        option: ["boolean", "string", "number", "all of these"],
        answer: "all of these",
    },
    {
        question: "What is the full form of HTML?",
        option: [
            "Hyper Text MarkUp Language",
            "Hyper Text Marking Location",
            "Hyper To Marking Lots",
            "Higher Ten Markup Language",
        ],
        answer: "Hyper Text MarkUp Language",
    },
];
// console.log(questionObj[0]);
// console.log(questionObj[0].option);
// console.log(questionObj[0].answer);
// console.log(questionObj[0].option[0]);
// console.log(questionObj[0].option[1]);
// console.log(questionObj[0].option[2]);
// console.log(questionObj[0].option[3]);

//startFunction starting quiz ;timer starts at 75 secs;Total quiz time 50secs
function startFunc() {
    currentQuestion = 0;
    quiz.style.display = "block";
    formShow.style.display = "none";
    scoreshow.style.display = "none";
    timeLeft = 75;
    timerBtn.textContent = timeLeft;
    timer = setInterval(function () {
        timeLeft--;
        timerBtn.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    nextQuestion();
}
//end function display score and display form to enter name for storage
function endGame() {
    timerBtn.style.display = "none";
    formShow.style.display = "block";
    quiz.style.display = "none";
    score1.textContent = score;
    clearInterval(timer);
}
//function nextQuestion  to load questions and options  option buttons
function nextQuestion() {
    question.textContent = questionObj[currentQuestion].question;
    op1.textContent = questionObj[currentQuestion].option[0];
    op2.textContent = questionObj[currentQuestion].option[1];
    op3.textContent = questionObj[currentQuestion].option[2];
    op4.textContent = questionObj[currentQuestion].option[3];
}

function optionA() {
    checkAnswer(0); //passes 0 as argument to check answer if first opttion s correct
}
function optionB() {
    //passs 1 if second option correct
    checkAnswer(1);
}
function optionC() {
    checkAnswer(2);
}
function optionD() {
    checkAnswer(3);
}
//function to check answer selected is correct or not
function checkAnswer(answer) {
    if (questionObj[currentQuestion].answer === questionObj[currentQuestion].option[answer]) {
        // console.log(questionObj[currentQuestion].answer);
        // console.log(questionObj[currentQuestion].option[answer]);
        score = score + 1;
        // console.log(score,"score");
    } else {
        timeLeft = timeLeft - 5; //5 seconds reduced for wrong answer selection
        timerBtn.textContent = timeLeft;
    }
    currentQuestion++;
    if (currentQuestion < questionObj.length) {
        nextQuestion();
    } else {
        endGame();
        return;
    }
}

//localarea  storage section

//function to store player details to local area storage
function scoreStore() {
    username.textContent = " ";
    //  event.preventDefault();

    var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    console.log(highScores, "highscores");
    var users = {
        playername: username.value,
        scoreGot: score1.textContent,
    };
    highScores.push(users);
    localStorage.setItem("highscores", JSON.stringify(highScores));

    formShow.style.display = "block";
    scoreshow.style.display = "none";
    quiz.style.display = "none";
    //list.textContent = "";
    list.style.display = "block";
    // startBtn.disabled = "true";
    // playagain.style.display = "none";
    var playerList = JSON.parse(window.localStorage.getItem("highscores"));
    //  console.log(playerList);
    alert("YOUR SCORE GOT UPDATED IN LOCAL STORAGE"); //alert when storarge is updated
    for (var i = 0; i <= playerList.length; i++) {
        var li = document.createElement("li");
        li.textContent = playerList[i].playername + " : " + playerList[i].scoreGot;
        list.append(li);
    }
}

//function to get information from local storage area.
//alert is given when storage is empty
function getScore() {
    list.style.display = "none";
    formShow.style.display = "none";
    scoreshow.style.display = "block";
    quiz.style.display = "none";
    list2.textContent = "";
    var sortedScore = JSON.parse(window.localStorage.getItem("highscores"));
    //   console.log(sortedScore, " highscores");
    // var sortedHighscore = JSON.parse(sortedScore);

    // console.log(sortedHighscore);
    if (sortedScore === null) {
        alert("YOUR STORAGE IS EMPTY !!!!");
    } else {
        for (var i = 0; i <= sortedScore.length; i++) {
            var li = document.createElement("li");
            li.textContent = sortedScore[i].playername + " : " + sortedScore[i].scoreGot;
            list2.append(li);
        }
    }
}
//play again function
function restart() {
    //startBtn.disabled = "false";
    playagain.style.display = "block";
    quiz.style.display = "none";
    scoreshow.style.display = "none";
    formShow.style.display = "none";
}
// function to clear local storage
function clearFunc() {
    localStorage.clear();
    alert("Your Local storage is empty");
    scoreshow.style.display = "none";
    list2.textContent = " ";
    list.textContent = " ";
    return;
}
