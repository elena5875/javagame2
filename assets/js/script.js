// Quiz Data
var quizData = [
    { question: 'What do you call ordinary people in the wizarding world?', choices: ['Peeps', 'Folks', 'Muggle', 'Mordor'], answer: 'Muggle' },
    { question: 'What do the students call the Gryffindor ghost?', choices: ['Nagini', 'Moaning Myrtle', 'The Fat Lady', 'Nearly Headless Nick'], answer: 'Nearly Headless Nick' },
    { question: 'What is the main ingredient in Harry Potter wand?', choices: ['A phoenix feather', 'A rabbit foot', 'A Newt Tail', 'A basilik tooth'], answer: 'A phoenix feather' },
    { question: 'Where in Kings Cross Station does the Hogwarts Express stop?', choices: ['Platform 9 and 1/2', 'Platform 9 and 3/4', 'Platform 10 and 3/4', 'Platform 9 and 1/6'], answer: 'Platform 9 and 3/4' },
    { question: 'Who is Tom Marvolo Riddle?', choices: ['Albus Dumbledore', 'Severus Snape', 'Lord Voldemort', 'Remus Lupin'], answer: 'Lord Voldemort' },
    { question: 'Who does Hermione Granger go with to the Yule Ball?', choices: ['Draco Malfoy', 'Ron Weasley', 'Harry Potter', 'Viktor Krum'], answer: 'Viktor Krum' },
    { question: 'What is the Name of Lord Voldemort\'s snake?', choices: ['Nagini', 'Basilisk', 'Hedwig', 'Mrs. Norris'], answer: 'Nagini' },
    { question: 'What position does Harry play on the Gryffindor Quidditch team?', choices: ['Seeker', 'Goalkeeper', 'Captain', 'Forward'], answer: 'Seeker' },
    { question: 'What is the name of the magical map that shows the entire layout of Hogwarts?', choices: ['The Leaky Cauldron', 'The Marauder\'s Map', 'The Map', 'Hogwarts Map'], answer: 'The Marauder\'s Map' },
    { question: 'What is the name of the magical creature that can only be seen by those who have witnessed death?', choices: ['Unicorn', 'Fluffy', 'Ukrainian Ironbelly', 'Thestral'], answer: 'Thestral' }
];

// HTML Element References
var introductionSection = document.getElementById('introduction');
var letTheGameBeginButton = document.getElementById('letTheGameBegin');
var quizContainer = document.getElementById('quiz');
var resultContainer = document.getElementById('result');
var submitButton = document.getElementById('submit');
var retryButton = document.getElementById('retry');
var showAnswerButton = document.getElementById('showAnswer');
var exitButton = document.getElementById('exit');

var currentQuestion = 0;
var score = 0;
var incorrectAnswers = [];

// Event Listeners
letTheGameBeginButton.addEventListener('click', startGame);
submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
exitButton.addEventListener('click', exitQuiz);

// Function to start the game
function startGame() {
    introductionSection.style.display = 'none';
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    displayQuestion();

    submitButton.addEventListener('click', checkAnswer);
    retryButton.addEventListener('click', retryQuiz);
    showAnswerButton.addEventListener('click', showAnswer);
    exitButton.addEventListener('click', exitQuiz);
}

// Function to display questions
function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.choices].sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(optionText => {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = optionText;

        const optionTextNode = document.createTextNode(optionText);

        option.appendChild(radio);
        option.appendChild(optionTextNode);
        optionsElement.appendChild(option);
    });

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

// Function to check answers
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
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    } else {
        alert('Please choose an answer before submitting.');
    }
}

// Function to display results
function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    exitButton.style.display = 'inline-block';

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
    `;

    resultContainer.style.display = 'block';
}

// Function to retry quiz
function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    exitButton.style.display = 'none';
    resultContainer.style.display = 'none';
    displayQuestion();
}

// Function to show answers
function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
    exitButton.style.display = 'inline-block';

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

    resultContainer.style.display = 'block';
}

// Function to exit quiz
function exitQuiz() {
    window.location.reload(); // Reload the page to start fresh
}
