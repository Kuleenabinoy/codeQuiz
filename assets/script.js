//selecting differnt classes and identifiers
var question = document.querySelector("#questions");
var op1 = document.querySelector("#option1");
var op2 = document.querySelector("#option2");
var op3 = document.querySelector("#option3");
var op4 = document.querySelector("#option4");
var highscore = document.querySelector("#highscore-link");
var timerBtn = document.querySelector("#timer");
var startBtn = document.querySelector("#start");
var formShow = document.querySelector("#formcontainer");
var submitBtn = document.querySelector("#submit");
var quiz = document.querySelector(".quizcontainer");
var score1 = document.querySelector("#score1");
var submitBtn = document.querySelector("#submit");
var username = document.querySelector("#name");
var scoreshow = document.querySelector("#highscorecontainer");
var playagain1 = document.querySelector("#replay1");
var playagain2 = document.querySelector("#replay2");
var playagain = document.querySelector(".highscore");

//adding event listeners
playagain1.addEventListener("click", restart);
playagain2.addEventListener("click", restart);
startBtn.addEventListener("click", startFunc);
highscore.addEventListener("click", getScore);
op1.addEventListener("click", optionA);
op2.addEventListener("click", optionB);
op3.addEventListener("click", optionC);
op4.addEventListener("click", optionD);
submitBtn.addEventListener("click", scoreStore);
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

//startFunction starting quiz ;timer starts at 50 secs;Total quiz time 50secs
function startFunc() {
    // currentQuestion = 0;
    quiz.style.display = "block";
    formShow.style.display = "none";
    scoreshow.style.display = "none";
    // highscore.disabled = "true";
    timeLeft = 60;
    //startBtn.disabled = true;
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
    // playagain.style.display = "none";
    //startBtn.disabled = "true";
}
//function nextQuestion  to load questions and options  option buttons
function nextQuestion() {
    question.textContent = questionObj[currentQuestion].question;
    op1.textContent = questionObj[currentQuestion].option[0];
    op2.textContent = questionObj[currentQuestion].option[1];
    op3.textContent = questionObj[currentQuestion].option[2];
    op4.textContent = questionObj[currentQuestion].option[3];
    //currentQuestion=currentQuestion+1;
    // console.log(currentQuestion);
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

//var playerList = document.querySelector("#playerlist");

//localarea  storage section
var userList;
//function to store player details to loacl arae storage
function scoreStore(event) {
    //startBtn.style.display="";
    event.preventDefault();
    // user=username.textContent
    //var highscore=score1.textContent;
    var users = [
        {
            playername: username.value,
            scoreGot: score1.textContent,
        },
    ];
    userList = users.push();
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userList", JSON.stringify(userList));
    console.log(users);
    console.log(userList);
    //playagain.addEventListener("click", startFunc);
}

//function to get information from local storage area.
function getScore() {
    formShow.style.display = "none";
    scoreshow.style.display = "block";
    quiz.style.display = "none";
    // startBtn.disabled = "true";
    // playagain.style.display = "none";
    var lastplayer = JSON.parse(localStorage.getItem("users"));
    document.getElementById("savedname").textContent = lastplayer[0].playername;
    document.getElementById("savedscore").textContent = lastplayer[0].scoreGot;
}

//play again function
function restart() {
    //startBtn.disabled = "false";
    playagain.style.display = "block";
    quiz.style.display = "none";
    scoreshow.style.display = "none";
    formShow.style.display = "none";
}
