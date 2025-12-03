from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv

# Removed: sys.path.insert and relative imports
from ai_functions import detect_ai_text, summarize_text, rewrite_text
from calculators import calculate

load_dotenv()  # Changed from load_dotenv('../app/.env')

app = Flask(__name__, template_folder='templates', static_folder='static')  # Changed from '../app/templates' and '../app/static'

# Routes remain the same (identical to app.py)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/instrumente')
def instrumente():
    return render_template('instrumente.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')
@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/api/detect_ai', methods=['POST'])
def detect_ai():
    data = request.get_json()
    text = data.get('text', '')
    result = detect_ai_text(text)
    return jsonify({'result': result})

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '')
    result = summarize_text(text)
    return jsonify({'result': result})

@app.route('/api/rewrite', methods=['POST'])
def rewrite():
    data = request.get_json()
    text = data.get('text', '')
    result = rewrite_text(text)
    return jsonify({'result': result})

@app.route('/api/calculate', methods=['POST'])
def calculate_api():
    data = request.get_json()
    calc_type = data.get('type')
    params = data.get('params', {})
    result = calculate(calc_type, params)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)  # Added for standalone execution