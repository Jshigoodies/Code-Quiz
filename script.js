var startButton = document.querySelector("#startQuiz");
var timeNum = document.querySelector("#seconds");
var multipleChoiceEl = document.querySelector(".multipleChoice")
var main = document.querySelector("main");
//if you want to change the amount of time you can use the 'count' variable
var count = 80;


var questionsEl = document.querySelector(".questions");
var headerQuestion = document.querySelector(".asking");
var scoreEl = document.querySelector(".score");
var leaderBoardEl = document.querySelector(".leaderboard")

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

    while(leaderBoardEl.firstChild) {
        leaderBoardEl.removeChild(leaderBoardEl.firstChild);
    }

    while(scoreEl.firstChild) {
        scoreEl.removeChild(scoreEl.firstChild);
    }

    while(main.firstChild) {
        main.removeChild(main.firstChild);
    }




}

function submitScore() {
    clearInterval(intervalID);
    timeNum.textContent = count;

    console.log("submit the score here");

    var scoreEl = document.querySelector(".score");

    //title
    var headerDone = document.createElement("h2");
    headerDone.textContent = "All done!"
    headerDone.classList.add("headerDone");

    //description  
    var descriptitonDone = document.createElement("p");
    descriptitonDone.textContent = "Your final score is " + count + ".";
    descriptitonDone.classList.add("descriptionDone");


    //input
    var divEl = document.createElement("div");
    divEl.classList.add("divScore");

    var inputName = document.createElement("input");
    inputName.classList.add("inputName");
    inputName.type = "text";
    inputName.placeholder = "Enter your Intials";
    divEl.append(inputName)


    //button
    var submit = document.createElement("button");
    submit.classList.add("submitButton")
    submit.textContent = "submit";
    submit.addEventListener("click", highscoreStorage)
    divEl.append(submit);

    scoreEl.append(headerDone);
    scoreEl.append(descriptitonDone);
    scoreEl.appendChild(divEl);
}

var scoreIndex = 0;

function highscoreStorage() {
    var name = document.querySelector(".inputName").value;
    var numScore = count;

    localStorage.setItem("name" + scoreIndex, name);
    localStorage.setItem("numScore" + scoreIndex, numScore);
    scoreIndex++;
    highscorePage();
}

function highscorePage() {
    clear();

    var divLeaderBoard = document.createElement("div");
    divLeaderBoard.classList.add("remove-this");

    for(var i = 0; i<localStorage.length/2; i++) {
        var nameVar = localStorage.getItem("name" + i);
        var numVar = localStorage.getItem("numScore" + i);
        
        var nameEl = document.createElement("p");
        nameEl.textContent = nameVar + " " + numVar;
        nameEl.classList.add("scored");

        divLeaderBoard.append(nameEl);
    }
    leaderBoardEl.append(divLeaderBoard);

    var divButtons = document.createElement("div");

    var goBack = document.createElement("button");
    goBack.textContent = "Go Back";
    goBack.classList.add("goBack");
    goBack.addEventListener("click", mainPage);

    var clearBoard = document.createElement("button");
    clearBoard.classList.add("clearBoard");
    clearBoard.textContent = "Clear Board";
    clearBoard.addEventListener("click", highscoreClear);

    divButtons.append(goBack);
    divButtons.append(clearBoard);
    //add eventlistener to buttons.

    leaderBoardEl.append(divButtons);


    

}

function highscoreClear() {
    localStorage.clear();
    scoreIndex = 0;
    $(".remove-this").remove(); //should be the div for the leader board.


}

function mainPage() {
    clear();
    var divTitle = document.createElement("div");
    divTitle.classList.add("title");
    var title = document.createElement("h1");
    title.textContent = "Coding Quiz Challenge";
    divTitle.append(title);

    var divDescription = document.createElement("div");
    divDescription.classList.add("description");
    var description = document.createElement("p");
    description.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answeres will penalize your score/time by ten seconds!";
    divDescription.append(description);


    var buttonStartDiv = document.createElement("div");
    buttonStartDiv.classList.add("startButton");
    var start = document.createElement("button");
    start.id = "startQuiz";
    start.textContent = "StartQuiz"
    buttonStartDiv.append(start);


    main.append(divTitle);
    main.append(divDescription);
    main.append(buttonStartDiv);

    start.addEventListener("click", again)


}


var intervalID = null;

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    clear();
    intervalID = setInterval(timerStart, 1000);
    renderQuestions();
});

function again(event) {
    console.log("I'm here");
    count = 80;
    index = 0;
    event.preventDefault();
    clear();
    intervalID = setInterval(timerStart, 1000);
    renderQuestions();
}

function scorePage() {
    highscorePage();
}


