var startButton = document.querySelector("#startQuiz");
var timeNum = document.querySelector("#seconds");
var multipleChoiceEl = document.querySelector(".multipleChoice")
var count = 80;

var questionsEl = document.querySelector(".questions");
var headerQuestion = document.querySelector(".asking");

var amountOfQuestions = 3;

var quiz = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/ else statement is enclosed within ___.",
        choices: ["1. quotes", "2. curly brackets", "3. parantheses", "4. square brackets"],
        answer: "3. parantheses"
    },
    {
        question: "Arrays in JavaScript can be used to store ___.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    }
];


function renderingDelete() {
    $('main').remove();
}

function timerStart() {
    timeNum.textContent = count;
    count = count - 1;
    if(count < 0) {
        clear();
        submitScore();
    }
}

var index = 0;
function renderQuestions() {

    if(index == amountOfQuestions) {
        submitScore()
        return;
    }

    //render Questions here
    var header = document.createElement("h2");
    header.textContent = quiz[index]["question"];
    headerQuestion.append(header);

    //render multiple choice here.
    for(var i = 0; i < 4; i++) {
        var choice1 = document.createElement("li");
        var buttonChoice1 = document.createElement("button");
        buttonChoice1.classList.add("choice");
        buttonChoice1.textContent = quiz[index]["choices"][i];
        choice1.append(buttonChoice1);
        multipleChoiceEl.append(choice1);
        buttonChoice1.addEventListener("click", checkAnswer);
    }

    
}

var temporaryID = null

function checkAnswer(event) {
    var userChoice = event.target.textContent;

    var correct = quiz[index]["answer"];

    if(userChoice == correct) {
        console.log("correct");
        var displayCorrect = document.createElement("h4");
        displayCorrect.textContent = "Correct!";
        displayCorrect.classList.add("display");
        temporaryID = setInterval(rightOrWrong, 1000);
        var location = document.querySelector(".centerThis");
        location.append(displayCorrect);
    }
    else {
        console.log("wrong");
        var displayCorrect = document.createElement("h4");
        displayCorrect.textContent = "Wrong!";
        displayCorrect.classList.add("display");
        temporaryID = setInterval(rightOrWrong, 1000);
        var location = document.querySelector(".centerThis");
        location.append(displayCorrect);
        count = count - 20;
    }
    clear();
    index = index + 1;
    renderQuestions();
}

var temporaryNum = 0;

function rightOrWrong() {
    
    if(temporaryNum == 1) {
        clearInterval(temporaryID);
        $('.display').remove();
        temporaryNum = 0;
    }
    temporaryNum = temporaryNum + 1;
}

//remove so i can render the next question
function clear() {
    while(multipleChoiceEl.firstChild) {
        multipleChoiceEl.removeChild(multipleChoiceEl.firstChild);
    }
    
    while(headerQuestion.firstChild) {
        headerQuestion.removeChild(headerQuestion.firstChild);
    }
}

function submitScore() {
    clearInterval(intervalID);
    console.log("submit the score here");
}


var intervalID = null;

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    renderingDelete();
    intervalID = setInterval(timerStart, 1000);
    renderQuestions();
});



