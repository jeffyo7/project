from flask import Flask, jsonify, request, render_template, render_template_string

app = Flask(__name__)

# Sample questions data
quiz_questions = {
    'static/video1.mp4': [
        {
            'question': 'What is phishing?',
            'options': ['A. A fishing activity', 'B. A cyber attack to steal information', 'C. A type of online game'],
            'correctAnswer': 'B. A cyber attack to steal information'
        },
        {
            'question': 'How can you recognize phishing emails?',
            'options': ['A. By the sender\'s email address', 'B. By clicking all links in the email', 'C. By downloading all attachments'],
            'correctAnswer': 'A. By the sender\'s email address'
        },
        {
            'question': 'Why is it important to report phishing attempts?',
            'options': ['A. To protect others from falling victim', 'B. To encourage more phishing attempts', 'C. To test your email client'],
            'correctAnswer': 'A. To protect others from falling victim'
        }
    ],
    'static/video2.mp4': [
        {
            'question': 'What are common signs of a phishing website?',
            'options': ['A. HTTPS in the URL', 'B. Typos and grammatical errors', 'C. Long password requirements'],
            'correctAnswer': 'B. Typos and grammatical errors'
        },
        {
            'question': 'How can you verify the authenticity of a sender in emails?',
            'options': ['A. By replying with personal information', 'B. By checking the sender\'s email address and domain', 'C. By forwarding the email to everyone'],
            'correctAnswer': 'B. By checking the sender\'s email address and domain'
        },
        {
            'question': 'What are some best practices to avoid falling victim to phishing?',
            'options': ['A. Clicking all links in emails', 'B. Ignoring email attachments', 'C. Verifying suspicious emails with the sender'],
            'correctAnswer': 'C. Verifying suspicious emails with the sender'
        }
    ],
    'static/video3.mp4': [
        {
            'question': 'Why is cybersecurity awareness important?',
            'options': ['A. To prevent data breaches', 'B. To increase internet speed', 'C. To enhance online gaming'],
            'correctAnswer': 'A. To prevent data breaches'
        },
        {
            'question': 'What are the potential consequences of a successful phishing attack?',
            'options': ['A. Data loss and financial theft', 'B. Better email security', 'C. Improved computer performance'],
            'correctAnswer': 'A. Data loss and financial theft'
        },
        {
            'question': 'How can organizations improve their cybersecurity defenses against phishing?',
            'options': ['A. By avoiding security awareness training', 'B. By ignoring phishing emails', 'C. By implementing multi-factor authentication'],
            'correctAnswer': 'C. By implementing multi-factor authentication'
        }
    ]
}

@app.route('/')
def index():
    return render_template('phishing1.html')

@app.route('/phishing2')
def phishing2():
    return render_template('phishing2.html')

@app.route('/results')
def results():
    return render_template('results.html')

@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify(quiz_questions)

@app.route('/api/score', methods=['POST'])
def submit_score():
    data = request.json
    score = data.get('score', 0)
    total_questions = sum(len(q) for q in quiz_questions.values())
    percentage = (score / total_questions) * 100
    passed = percentage >= 70
    return jsonify({'score': score, 'totalQuestions': total_questions, 'percentage': percentage, 'passed': passed})

@app.route('/ssti')
def ssti():
    user_input = request.args.get('input', '')
    return render_template_string(f"User input: {user_input}")

if __name__ == '__main__':
    app.run(debug=True)
