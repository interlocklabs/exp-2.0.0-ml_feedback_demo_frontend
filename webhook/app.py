from collections import deque
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='../ui/build', static_url_path='')
CORS(app)

feedback = deque([{'uid': 0, 'is_liked': False, 'feedback_text': 'None of these are relevant...'}])

@app.route('/webhook', methods=['POST'])
@cross_origin()
def webhook():


    new_feedback_entry = {
        'uid': len(feedback), 
        'is_liked': request.json['isLiked'], 
        'feedback_text': request.json['feedback'] 
    }

    feedback.appendleft(new_feedback_entry)
    return jsonify({'feedback': list(feedback)})

@app.route('/get_feedback', methods=['GET'])
@cross_origin()
def get_feedback():
    return jsonify({'feedback': list(feedback)})

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')