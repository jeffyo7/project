const quizQuestions = {
    'videos/video1.mp4': [
        {
            question: 'What is phishing?',
            options: [
                'A. A fishing activity',
                'B. A cyber attack to steal information',
                'C. A type of online game'
            ],
            correctAnswer: 'B. A cyber attack to steal information'
        },
        {
            question: 'How can you recognize phishing emails?',
            options: [
                'A. By the sender\'s email address',
                'B. By clicking all links in the email',
                'C. By downloading all attachments'
            ],
            correctAnswer: 'A. By the sender\'s email address'
        },
        {
            question: 'Why is it important to report phishing attempts?',
            options: [
                'A. To protect others from falling victim',
                'B. To encourage more phishing attempts',
                'C. To test your email client'
            ],
            correctAnswer: 'A. To protect others from falling victim'
        }
    ],
    'videos/video2.mp4': [
        {
            question: 'What are common signs of a phishing website?',
            options: [
                'A. HTTPS in the URL',
                'B. Typos and grammatical errors',
                'C. Long password requirements'
            ],
            correctAnswer: 'B. Typos and grammatical errors'
        },
        {
            question: 'How can you verify the authenticity of a sender in emails?',
            options: [
                'A. By replying with personal information',
                'B. By checking the sender\'s email address and domain',
                'C. By forwarding the email to everyone'
            ],
            correctAnswer: 'B. By checking the sender\'s email address and domain'
        },
        {
            question: 'What are some best practices to avoid falling victim to phishing?',
            options: [
                'A. Clicking all links in emails',
                'B. Ignoring email attachments',
                'C. Verifying suspicious emails with the sender'
            ],
            correctAnswer: 'C. Verifying suspicious emails with the sender'
        }
    ],
    'videos/video3.mp4': [
        {
            question: 'Why is cybersecurity awareness important?',
            options: [
                'A. To prevent data breaches',
                'B. To increase internet speed',
                'C. To enhance online gaming'
            ],
            correctAnswer: 'A. To prevent data breaches'
        },
        {
            question: 'What are the potential consequences of a successful phishing attack?',
            options: [
                'A. Data loss and financial theft',
                'B. Better email security',
                'C. Improved computer performance'
            ],
            correctAnswer: 'A. Data loss and financial theft'
        },
        {
            question: 'How can organizations improve their cybersecurity defenses against phishing?',
            options: [
                'A. By avoiding security awareness training',
                'B. By ignoring phishing emails',
                'C. By implementing multi-factor authentication'
            ],
            correctAnswer: 'C. By implementing multi-factor authentication'
        }
    ]
};

let videos = ['videos/video1.mp4', 'videos/video2.mp4', 'videos/video3.mp4'];
let videoStartTimes = [4, 0, 0]; // Start times for each video in seconds
let currentVideoIndex = 0;
let currentQuestionIndex = 0;
let score = 0;

function loadVideo(videoSrc, question) {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoTitle = document.getElementById('videoTitle');
    const questionOverlay = document.getElementById('questionOverlay');

    videoPlayer.src = videoSrc;
    videoPlayer.play();
    videoTitle.textContent = question;

    currentQuestionIndex = 0;

    videoPlayer.onended = function() {
        showNextQuestion();
        questionOverlay.classList.add('active');
    };
}

function showNextQuestion() {
    const questionText = document.getElementById('questionText');
    const mcqOptions = document.getElementById('mcqOptions');

    if (currentVideoIndex < videos.length) {
        const currentVideo = videos[currentVideoIndex];
        const currentQuestions = quizQuestions[currentVideo];

        if (currentQuestions && currentQuestionIndex < currentQuestions.length) {
            const currentQuestion = currentQuestions[currentQuestionIndex];

            questionText.innerHTML = `<h2>${currentQuestion.question}</h2>`;
            mcqOptions.innerHTML = '';

            currentQuestion.options.forEach(function(option) {
                const label = document.createElement('label');
                const radioBtn = document.createElement('input');
                radioBtn.type = 'radio';
                radioBtn.name = 'answer';
                radioBtn.value = option;
                label.classList.add('d-block', 'mb-2');
                label.appendChild(radioBtn);
                label.appendChild(document.createTextNode(option));
                mcqOptions.appendChild(label);
            });

            currentQuestionIndex++;
        } else {
            currentVideoIndex++;
            if (currentVideoIndex < videos.length) {
                loadVideo(videos[currentVideoIndex], `Video ${currentVideoIndex + 1} Question`);
                document.getElementById('questionOverlay').classList.remove('active');
            } else {
                document.getElementById('goToResultsButton').style.display = 'block';
            }
        }
    }
}

function submitAnswer() {
    const options = document.getElementsByName('answer');
    let selectedOption = '';

    options.forEach(function(option) {
        if (option.checked) {
            selectedOption = option.value;
        }
    });

    if (selectedOption !== '') {
        const currentVideo = videos[currentVideoIndex];
        const currentQuestions = quizQuestions[currentVideo];
        const currentQuestion = currentQuestions[currentQuestionIndex - 1];
        const correctAnswer = currentQuestion.correctAnswer;

        if (selectedOption === correctAnswer) {
            score += 1;
        }

        if (currentQuestionIndex >= currentQuestions.length) {
            currentQuestionIndex = 0;
            currentVideoIndex++;
            if (currentVideoIndex < videos.length) {
                loadVideo(videos[currentVideoIndex], `Video ${currentVideoIndex + 1} Question`);
                document.getElementById('questionOverlay').classList.remove('active');
            } else {
                document.getElementById('goToResultsButton').style.display = 'block';
            }
        } else {
            showNextQuestion();
        }
    } else {
        alert('Please select an answer.');
    }
}

function goToResults() {
    const percentageScore = (score / (videos.length * 3 * 1.0)) * 100;
    console.log("score", percentageScore);
    localStorage.setItem("totalScore", score);
    localStorage.setItem("score", percentageScore);
    window.location.href = '/results';
}

if (videos.length > 0) {
    loadVideo(videos[0], 'Video 1 Question');
}

window.onblur = function() {
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.pause();
};
