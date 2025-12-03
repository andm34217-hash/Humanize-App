from flask import Flask, render_template, request, jsonify, session, redirect
import os
import json
from dotenv import load_dotenv

# Removed: sys.path.insert and relative imports
from ai_functions import detect_ai_text, summarize_text, rewrite_text
from calculators import calculate

load_dotenv()  # Changed from load_dotenv('../app/.env')

app = Flask(__name__, template_folder='templates', static_folder='static')  # Changed from '../app/templates' and '../app/static'

app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

# Routes remain the same (identical to app.py)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/instrumente')
def instrumente():
    return render_template('instrumente.html')

@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect('/login')
    return render_template('dashboard.html', user=session['user'])

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
    preferences = session.get('user', {}).get('preferences', {})
    result = summarize_text(text, preferences)
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

@app.route('/api/login', methods=['POST'])
def login_api():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    try:
        with open('users.json', 'r') as f:
            users = json.load(f)
    except Exception as e:
        return jsonify({'error': f'Error loading users: {str(e)}'}), 500
    for user in users:
        if user['email'] == email and user['password'] == password:
            session['user'] = {
                'name': user['name'],
                'plan': user['plan'],
                'functions': user['functions'],
                'actions_remaining': user['actions_remaining'],
                'preferences': user.get('preferences', {}),
                'history': user.get('history', [])
            }
            return jsonify({'success': True})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)  # Added for standalone execution