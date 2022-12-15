var startButton = document.querySelector("#startQuiz");
var timeNum = document.querySelector("#seconds");
var count = 80;

var questionsEl = document.querySelector(".questions");

var qOne = ["Commonly used data types DO NOT include:"]

var quiz = [];


function renderingDelete() {
    $('main').remove();
}

function timerStart() {
    timeNum.textContent = count;
    count = count - 1;
}

function renderQuestions() {

}


startButton.addEventListener("click", function(event) {
    event.preventDefault();
    renderingDelete();
    setInterval(timerStart, 1000);
});



