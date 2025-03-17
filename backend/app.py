from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import logging
import os
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# 🔒 Get API key
API_KEY = os.getenv("OPENROUTER_API_KEY")

if not API_KEY:
    raise ValueError("Missing API Key! Set 'OPENROUTER_API_KEY' in a .env file.")

# ✅ OpenRouter API URL
API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Setup logging
logging.basicConfig(filename="error.log", level=logging.ERROR)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask server is running!"})

# Function to call OpenRouter AI API
def get_ai_response(user_message):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    
    payload = {
        "model": "deepseek/deepseek-r1",  # Changed to a better model
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": user_message}
        ],
        "max_tokens": 500  # Increased to prevent truncation
    }

    try:
        response = requests.post(API_URL, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        
        response_data = response.json()
        print("🔹 FULL API RESPONSE:", response_data)  

        if "choices" in response_data and response_data["choices"]:
            raw_text = response_data["choices"][0]["message"]["content"].strip()

            if not raw_text:
                return "⚠️ AI response was empty. Try again!"

            # ✅ Clean AI response
            cleaned_text = re.sub(r"\\boxed\{(.*?)\}", r"\1", raw_text, flags=re.DOTALL)
            cleaned_text = re.sub(r"```[a-z]*\n(.*?)\n```", r"\1", cleaned_text, flags=re.DOTALL)
            
            return cleaned_text
        else:
            return "⚠️ No response from AI."

    except requests.exceptions.RequestException as e:
        logging.error(str(e))
        return "❌ Error: Unable to connect to AI."

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    if not data or "message" not in data:
        return jsonify({"error": "No message provided"}), 400

    user_message = data["message"]
    print(f"Received message: {user_message}")

    reply = get_ai_response(user_message)
    print(f"AI response: {reply}")
    
    return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
