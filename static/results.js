document.addEventListener('DOMContentLoaded', function() {
   const percentagestrng = localStorage.getItem("score");
   const percentage = Number(percentagestrng);
console.log("a score", percentage);
const score = localStorage.getItem("totalScore")
console.log("abs b score", score);
    //var score = parseInt(sessionStorage.getItem('quizScore')) || 0;

    var passTemplate = document.getElementById('passTemplate');
    var failTemplate = document.getElementById('failTemplate');

    // Assuming you have a server-side method to determine passing criteria and total questions
    var pass = score >= 2; // Adjust the passing score threshold as needed
    var totalQuestions = 9; // Example: total questions across all videos

   // var percentage = (score / totalQuestions) * 100;

    if (pass) {
        // Passed the exam
        passTemplate.classList.remove('hidden');
        document.getElementById('passResultText').textContent = 'Congratulations! You passed the quiz.';
        document.getElementById('passScoreText').textContent = 'Your score: ' + score + '/' + totalQuestions + ' (' + percentage.toFixed(2) + '%)';
        document.getElementById('downloadCertificateButton').onclick = function() {
            // Certificate download logic (example)
            alert('Certificate downloaded!');
            // Example: window.location.href = 'certificate.html';
        };
    } else {
        // Failed the exam
        failTemplate.classList.remove('hidden');
        document.getElementById('failResultText').textContent = 'You failed the quiz. Better luck next time!';
        document.getElementById('failScoreText').textContent = 'Your score: ' + score + '/' + totalQuestions + ' (' + percentage.toFixed(2) + '%)';
        document.getElementById('retakeQuizButton').onclick = function() {
            // Redirect to the quiz page to retake the quiz
            localStorage.clear();
            window.location.href = '/phishing2'; // Adjust as per your file structure
        };
    }
});
