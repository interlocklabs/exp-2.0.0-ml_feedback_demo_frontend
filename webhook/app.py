from collections import deque
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

feedback = deque([{'uid': 0, 'is_liked': False, 'feedback_text': 'None of these are relevant...'}])

@app.route('/')
def home():
    return 'Hello World!'

@app.route('/webhook', methods=['POST'])
def webhook():


    new_feedback_entry = {
        'uid': len(feedback), 
        'is_liked': request.json['isLiked'], 
        'feedback_text': request.json['feedback'] 
    }

    feedback.appendleft(new_feedback_entry)
    return jsonify({'feedback': list(feedback)})

@app.route('/get_feedback', methods=['GET'])
def get_feedback():
    return jsonify({'feedback': list(feedback)})