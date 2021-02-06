const starterBtn = document.getElementById("starterBtn");
const starterPanel = document.getElementById("starterPanel");
const quizPanel = document.getElementById("quizPanel");
const question = document.getElementById("question");
const answersList = document.getElementById("answers");
const firstOption = document.getElementById("firstAnswer");
const secondOption = document.getElementById("secondAnswer");
const thirdOption = document.getElementById("thirdAnswer");
const fourthOption = document.getElementById("fourthAnswer");
let questionsData = []


function getQuestions(){
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data =>setQuestion(data.results))
}
function startGame(){
    starterPanel.className = "starterPanelHide"
    quizPanel.className = "quizPanel"
}

function setQuestion(data){
    questionsData = data;
    console.log(questionsData)
    question.innerHTML = questionsData[0].question;
    let answers = [questionsData[0].correct_answer,questionsData[0].incorrect_answers[0],questionsData[0].incorrect_answers[1],questionsData[0].incorrect_answers[2]];
    answers = shuffle(answers)
    firstOption.innerHTML = answers[0];
    secondOption.innerHTML = answers[1];
    thirdOption.innerHTML = answers[2];
    fourthOption.innerHTML = answers[3];
}

function shuffle(array){
    array.sort(() => Math.random() - 0.5);
    return array
}
function checkAnswer(e){
    console.log(e.target.innerHTML)
}

getQuestions();
starterBtn.addEventListener("click",startGame);
firstOption.addEventListener("click",checkAnswer);
secondOption.addEventListener("click",checkAnswer);
thirdOption.addEventListener("click",checkAnswer);
fourthOption.addEventListener("click",checkAnswer)