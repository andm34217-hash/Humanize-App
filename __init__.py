from flask import Flask, render_template, request, jsonify
from . import calculators
from . import ai_functions
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

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

@app.route('/api/detect_ai', methods=['POST'])
def detect_ai():
    data = request.get_json()
    text = data.get('text', '')
    result = ai_functions.detect_ai_text(text)
    return jsonify({'result': result})

@app.route('/api/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data.get('text', '')
    result = ai_functions.summarize_text(text)
    return jsonify({'result': result})

@app.route('/api/rewrite', methods=['POST'])
def rewrite():
    data = request.get_json()
    text = data.get('text', '')
    result = ai_functions.rewrite_text(text)
    return jsonify({'result': result})

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    calc_type = data.get('type')
    params = data.get('params', {})
    result = calculators.calculate(calc_type, params)
    return jsonify({'result': result})