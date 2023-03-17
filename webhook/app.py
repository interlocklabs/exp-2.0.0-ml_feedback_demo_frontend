from flask import Flask, jsonify, request
import ast

app = Flask(__name__)

feedback = [{'uid': 0, 'is_liked': False, 'feedback_text': 'None of these are relevant...'}]

@app.route('/')
def home():
    return 'Hello World!'

@app.route('/webhook', methods=['POST'])
def webhook():
    print(request.json)
    new_feedback = {
        'uid': len(feedback), 
        'is_liked': request.json['isLiked'], 
        'feedback_text': request.json['feedback'] 
    }

    feedback.append(new_feedback)
    return jsonify({'feedback': feedback})

@app.route('/get_feedback', methods=['GET'])
def get_feedback():
    return jsonify({'feedback': feedback})