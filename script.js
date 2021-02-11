const starterBtn = document.getElementById("starterBtn");
const starterPanel = document.getElementById("starterPanel");
const quizPanel = document.getElementById("quizPanel");
const resultPanel = document.getElementById("finishedPanel")
const question = document.getElementById("question");
const firstOption = document.getElementById("firstAnswer");
const secondOption = document.getElementById("secondAnswer");
const thirdOption = document.getElementById("thirdAnswer");
const fourthOption = document.getElementById("fourthAnswer");
const correct = document.getElementById("correct")
const wrong = document.getElementById("wrong")
const answeredCount = document.getElementById("answered")
const score = document.getElementById("score")
const level = document.getElementById("level")
const timer = document.getElementById("time")
const againBtn = document.getElementById("play-again");

let questionsData = []
let correctAnswer;
let questionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let levelValue = "easy";
let time = 100;
let scoreScale = 30;
let interval;


function getQuestions() {
    levelValue = level.value;
    if(levelValue==="medium") {
        time = 90;
        scoreScale = 40;
    }
    else if(levelValue==="hard"){
        time = 80;
        scoreScale = 50;
    }
    timer.innerHTML = time;
    fetch("https://opentdb.com/api.php?amount=10&difficulty="+levelValue+"&type=multiple")
        .then(res => res.json())
        .then(data => saveData(data.results))
}

function startGame() {
    starterPanel.className = "starterPanelHide"
    quizPanel.className = "quizPanel"
    interval = setInterval(()=>{
        time -= 1;
        timer.innerHTML = time;
        if(time<=0){
            endGame("OOPS,your time finished");
        }
        },1000)
}
function playAgain(){
    resultPanel.className = "hideResult"
    starterPanel.className = "startPanel"
    questionsData = []
    questionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    correctAnswer = " "
    time = 100;
    scoreScale = 30;
    levelValue = "easy";
    correct.innerHTML = correctCount.toString();
    wrong.innerHTML = wrongCount.toString();
    answeredCount.innerHTML = "#" + 1
    getQuestions();
}
function saveData(data) {
    questionsData = data;
    setQuestion(questionIndex)
}

function setQuestion(index) {
    answeredCount.innerHTML = "#" + (index + 1)
    question.innerHTML = questionsData[index].question;
    let answers = [questionsData[index].correct_answer, questionsData[index].incorrect_answers[0], questionsData[index].incorrect_answers[1], questionsData[index].incorrect_answers[2]];
    correctAnswer = questionsData[index].correct_answer;
    answers = shuffle(answers)
    firstOption.innerHTML = answers[0];
    secondOption.innerHTML = answers[1];
    thirdOption.innerHTML = answers[2];
    fourthOption.innerHTML = answers[3];
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array
}

function checkAnswer(e) {
    if (e.target.innerHTML === correctAnswer) {
        e.target.className = "correct"
        correctCount++;
        correct.innerHTML = correctCount.toString();
    } else {
        e.target.className = "wrong"
        wrongCount++;
        wrong.innerHTML = wrongCount.toString();
    }
    setTimeout(() => {
        questionIndex++;
        if (questionIndex === 10) {
            e.target.className = ""
            endGame(" ");
        } else {
            setQuestion(questionIndex)
            e.target.className = ""
        }
    }, 700)
}

function endGame(message){
    clearInterval(interval)
    quizPanel.className = "quizPanelHide"
    resultPanel.className = "showResult"
    score.innerHTML = `${message} <br/> Your Score: <br/> ${(correctCount * scoreScale).toString()}`
}

getQuestions();
starterBtn.addEventListener("click", startGame);
firstOption.addEventListener("click", checkAnswer);
secondOption.addEventListener("click", checkAnswer);
thirdOption.addEventListener("click", checkAnswer);
fourthOption.addEventListener("click", checkAnswer)
level.addEventListener("change",getQuestions)
againBtn.addEventListener("click",playAgain)