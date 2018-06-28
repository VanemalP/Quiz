let questions;

const body = document.querySelector('body');
const btnStart = document.querySelector('#btn-start');
const questionsContainer = document.querySelector('#questions');
const answersConttainer = document.querySelector('#answers');
const landing = document.querySelector('#landing'); 
const startCounter = document.querySelector('#start-counter');

let currentQuestion = 0;
let score = 0;
let totalQuestions;


let x; //setInterval for the timer

//loads questions from external JSON file
btnStart.addEventListener('click', loadJSON(function(response) {
  questions = JSON.parse(response);
  totalQuestions = questions.length;
}));

function loadJSON(callback) {   
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'questions.json', true); 
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

btnStart.addEventListener('click', startGame);
answersConttainer.addEventListener('click', getAnswer);

function startGame() {
  landing.style.opacity = 0;
  setTimeout(() => {
    landing.classList.add('hide');
    let i = 3;
    startCounter.innerHTML = i;
    startCounter.style.opacity = 1;
    let x = setInterval(function() {
      startCounter.innerHTML = --i;
      if (i < 1) {
        clearInterval(x);
        startCounter.style.opacity = 0;
        startCounter.classList.add('hide');
        shuffleQuestions(questions);
        loadQuestion(currentQuestion);
      }
    }, 1000)      
  }, 300);
}

function shuffleQuestions(array) {
  let currentIndex = array.length;
  let temporatyValue, randomIndex;

  while(currentIndex !== 0) {
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;
    temporatyValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporatyValue;
  }
  return array;
}

function loadQuestion(questionIndex) {
  const question = document.querySelector('#question');
  const bntAnswer1 = document.querySelector('#btn-answer1');
  const bntAnswer2 = document.querySelector('#btn-answer2');
  const bntAnswer3 = document.querySelector('#btn-answer3');
  const bntAnswer4 = document.querySelector('#btn-answer4');
  const questionCount = document.querySelector('#question-count span');
  const scoreCount = document.querySelector('#score span');

  questionsContainer.classList.remove('hide');
  setTimeout(() => {
    questionsContainer.style.opacity = 1;
  }, 30); 
  let q = questions[questionIndex];
  question.innerHTML = (questionIndex + 1) + '. ' + q.question;
  bntAnswer1.innerHTML = q.answer1;
  bntAnswer2.innerHTML = q.answer2;
  bntAnswer3.innerHTML = q.answer3;
  bntAnswer4.innerHTML = q.answer4;
  questionCount.innerHTML = `${currentQuestion+1}/${totalQuestions}`;
  scoreCount.innerHTML = score;
  
  timerBar();
}

function timerBar() {
  const timer = document.querySelector('#timer');

  timer.style.width = '100%';
  let percent = 100;
  x = setInterval(() => {
    timer.className = 'animate-bar';
    percent-= 10;
    timer.style.width = percent + '%';
    if (timer.style.width == '0%') {
      clearInterval(x);
      setTimeout(() => {
        timer.classList.remove('animate-bar');
        body.classList.add('error');
        setTimeout(() => {
          body.classList.remove('error');
          loadNextQuestion();
        }, 200);
      }, 1000); 
    }
  }, 1000); 
}

function loadNextQuestion() {
  currentQuestion++;
  //answer = false;
  if (currentQuestion == totalQuestions) {
    endGame();
  } else {
    loadQuestion(currentQuestion);
  }
}

function getAnswer(e) {
  //resets timerbar
  clearInterval(x);
  timer.classList.remove('animate-bar');

  //checks if answer is correct or wrong
  if (e.target.classList.contains('answer-btn')){
    if(e.target.value == questions[currentQuestion].correctAnswer) {
      score +=10;
      body.classList.add('correct');
      setTimeout(() => {
        body.classList.remove('correct');
        loadNextQuestion();
      }, 200);
    } else {
      body.classList.add('error');
      setTimeout(() => {
        body.classList.remove('error');
        loadNextQuestion();
      }, 200);
    }
  }
} 

function endGame() {
  const totalScore = 10*totalQuestions;

  questionsContainer.style.opacity = 0;
  setTimeout(() => {
    questionsContainer.classList.add('hide');
    landing.classList.remove('hide');
    landing.style.opacity = 1;  
  }, 300);
  document.querySelector('#landing h1').innerHTML = `Your score is: <span>${score}/${totalScore}</span>!`
  btnStart.innerHTML = 'Restart game';
  startCounter.innerHTML = '';
  startCounter.classList.remove('hide');
  currentQuestion = 0;
  score = 0;
}