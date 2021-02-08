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


let questionsData = []
let correctAnswer;
let questionIndex = 0;
let correctCount = 0;
let wrongCount = 0


function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
        .then(res => res.json())
        .then(data => saveData(data.results))
}

function startGame() {
    starterPanel.className = "starterPanelHide"
    quizPanel.className = "quizPanel"
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
            quizPanel.className = "quizPanelHide"
            resultPanel.className = "showResult"
            score.innerHTML = (correctCount * 50).toString()
        } else {
            setQuestion(questionIndex)
            e.target.className = ""
        }
    }, 700)
}

getQuestions();
starterBtn.addEventListener("click", startGame);
firstOption.addEventListener("click", checkAnswer);
secondOption.addEventListener("click", checkAnswer);
thirdOption.addEventListener("click", checkAnswer);
fourthOption.addEventListener("click", checkAnswer)