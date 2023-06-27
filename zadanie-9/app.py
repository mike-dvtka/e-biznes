import requests
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

messages = []


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    message = data.get('message')

    if message:
        response = requests.post('http://localhost:5000/chat', json={'text': message})
        answer = response.json()['response']
        messages.append(answer)
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'No message provided.'})


@app.route('/get_messages', methods=['GET'])
def get_messages():
    return jsonify(messages)


if __name__ == '__main__':
    app.run(debug=True, port=5500)
