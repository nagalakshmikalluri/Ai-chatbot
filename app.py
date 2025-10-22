from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from your frontend

# Load DialoGPT model
model_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Use text-generation pipeline
chatbot = pipeline("text-generation", model=model, tokenizer=tokenizer)

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        user_message = data.get("message", "")
        if not user_message:
            return jsonify({"reply": "Please type something."})

        # Generate a response
        response = chatbot(user_message, max_length=1000, do_sample=True, pad_token_id=tokenizer.eos_token_id)
        reply_text = response[0]['generated_text']

        return jsonify({"reply": reply_text})
    except Exception as e:
        print("Error:", e)
        return jsonify({"reply": "Sorry, something went wrong!"}), 500

if __name__ == "__main__":
    print("Starting AI chatbot backend on http://127.0.0.1:5000")
    app.run(debug=True)
