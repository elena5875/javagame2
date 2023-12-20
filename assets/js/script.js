// Quiz data containing questions, options, and correct answers
const quizData = [
    {
        question: 'What do you call ordinary people in the wizarding world?',
        options: ['Peeps', 'Folks', 'Muggle', 'Mordor'],
        answer: 'Muggle',
    },
    {
        question: 'What do the students call the Gryffindor ghost? ',
        options: ['Nagini', 'Moaning Myrtle', 'The Fat Lady', 'Nearly Headless Nick'],
        answer: 'Nearly Headless Nick',
    },
    {
        question: 'What is the main ingredient in Harry Potter wand??',
        options: ['A phoenix feather', 'A rabbit foot', 'A Newt Tail', 'A basilik tooth'],
        answer: 'A phoenix feather',
    },
    {
        question: 'Where in Kings Cross Station does the Hogwarts Express stop? ',
        options: ['Platform 9 and 1/2', 'Platform 9 and 3/4', 'Platform 10 and 3/4', 'Platform 9 and 1/6'],
        answer: 'Platform 9 and 3/4',
    },
    {
        question: 'Who is Tom Marvolo Riddle?',
        options: [
            'Albus Dumbledore',
            'Severus Snape',
            'Lord Voldemort',
            'Remus Lumpin',
        ],
        answer: 'Lord Voldemort',
    },
    {
        question: 'who does Hermione Granger go with to the Yule Ball? ',
        options: ['Draco Malfoy', 'Ron Weasley', 'Harry Potter', 'Viktor Krum'],
        answer: 'Viktor Krum',
    },
    {
        question: 'What is the Name of Lord Voldemort snake?',
        options: [
            'Nagini',
            'Basilik',
            'Hedwig',
            'Mrs. Morris',
        ],
        answer: 'Nagini',
    },
    {
        question: 'What position does Harry play on the Gryffindor Quidditch team?',
        options: ['seeker', 'goal', 'captain', 'forward'],
        answer: 'seeker',
    },
    {
        question: 'What is the name of the magical map that shows the entire layout of Hogwarts?',
        options: [
            'The Leaky Cauldron',
            'The Marauders',
            'The Map',
            'Hogwarts Map',
        ],
        answer: 'The Marauders',
    },
    {
        question: 'What is the name of the magical creature that can only be seen by those who have witnessed death?',
        options: ['Unicorn', 'Fluffy', 'Ukrainian Ironbelly ', 'Thestral'],
        answer: 'Thestral',
    },
];


// DOM elements
const introContainer = document.getElementById('introduction');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit'); // Added for quiz questions
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let startTime;

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to display a question
function displayQuestion() {
    startTime = Date.now();

    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);

    submitButton.style.display = 'inline-block'; // Show the submit button for quiz questions
    showAnswerButton.style.display = 'none'; // Hide the "Show Answer" button for the current question
}

// Function to start the game
function startGame() {
    introContainer.style.display = 'none';
    quizContainer.style.display = 'block';

    displayQuestion();
}

// Function to check the selected answer
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        selectedOption.checked = false;

        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            displayResult();
        }
    } else {
        alert('Please choose an answer before submitting.');
    }
}

// Function to display the final result
function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

// Function to retry the quiz
function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

// Function to show correct answers for incorrect responses
function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
              <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
              </p>
            `;
    }

    resultContainer.innerHTML = `
            <p>You scored ${score} out of ${quizData.length}!</p>
            <p>Incorrect Answers:</p>
            ${incorrectAnswersHtml}
          `;
}

// Event listeners
document.getElementById('letTheGameBegin').addEventListener('click', startGame);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
