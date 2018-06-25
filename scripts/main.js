const questions = [
  {
    question: 'What is my name?',
    answer1: 'Penka',
    answer2: 'Boryana',
    answer3: 'Plamena',
    answer4: 'Mariya',
    correctAnswer: 3
  },
  {
    question: 'What are my pet\'s names?',
    answer1: 'Kotka & Kotiyo',
    answer2: 'Maca & Macko',
    answer3: 'Betty & Boyan',
    answer4: 'Pipi & Bobo',
    correctAnswer: 4 
  },
  {
    question: 'Where do I live?',
    answer1: 'Mladost',
    answer2: 'Obelya',
    answer3: 'Manastirski Livadi',
    answer4: 'Boyana',
    correctAnswer: 1 
  }
];

const body = document.querySelector('body');
const btnStart = document.querySelector('#btn-start');
const questionsContainer = document.querySelector('#questions');
const answersConttainer = document.querySelector('#answers');
const landing = document.querySelector('#landing'); 

let currentQuestion = 0;
let score = 0;
let answer = false;
const totalQuestions = questions.length;

let x; //setInterval for the timer

btnStart.addEventListener('click', startGame);
answersConttainer.addEventListener('click', getAnswer);

function startGame() {
  const startCounter = document.querySelector('#start-counter');

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
        startCounter.classList.add('hide');
        loadQuestion(currentQuestion);
      }
    }, 1000)      
  }, 300);
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
  btnStart.className = 'hide';
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

function loadNextQuestion() {
  currentQuestion++;
  answer = false;
  if (currentQuestion == totalQuestions) {
    endGame();
  } else {
    loadQuestion(currentQuestion);
  }
}

function getAnswer(e) {
  //resets timer
  clearInterval(x);
  timer.classList.remove('animate-bar');
  //checks if answer is correct or wrong
  if (e.target.classList.contains('answer-btn')){
    answer = true;
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