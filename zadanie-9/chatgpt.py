import openai
from flask import Flask, request, jsonify

openai.api_key = "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"

app = Flask(__name__)


@app.route('/chat', methods=['POST'])
def chat():
    message = request.get_json()['text']

    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=message,
        max_tokens=50,
        temperature=0.7
    )

    reply = response.choices[0].text.strip()

    return jsonify({'response': reply})


if __name__ == '__main__':
    app.run()