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
    if 'user' not in session:
        return jsonify({'error': 'Trebuie să fiți conectat pentru a utiliza această funcție'}), 401

    user = session['user']
    if user['actions_remaining'] == 0:
        return jsonify({'error': 'Ați epuizat acțiunile zilnice. Upgrade pentru mai multe acțiuni!'}), 403

    data = request.get_json()
    text = data.get('text', '')
    if not text.strip():
        return jsonify({'error': 'Introduceți text pentru analiză'}), 400

    result = detect_ai_text(text)

    # Decrement actions for Free plan users
    if user['actions_remaining'] > 0:
        user['actions_remaining'] -= 1
        session['user'] = user
        # Update users.json
        try:
            with open('users.json', 'r') as f:
                users = json.load(f)
            for u in users:
                if u['email'] == user['email']:
                    u['actions_remaining'] = user['actions_remaining']
                    break
            with open('users.json', 'w') as f:
                json.dump(users, f, indent=2)
        except Exception as e:
            print(f"Error updating user actions: {e}")

    return jsonify({'result': result})

@app.route('/api/summarize', methods=['POST'])
def summarize():
    if 'user' not in session:
        return jsonify({'error': 'Trebuie să fiți conectat pentru a utiliza această funcție'}), 401

    user = session['user']
    if user['actions_remaining'] == 0:
        return jsonify({'error': 'Ați epuizat acțiunile zilnice. Upgrade pentru mai multe acțiuni!'}), 403

    data = request.get_json()
    text = data.get('text', '')
    if not text.strip():
        return jsonify({'error': 'Introduceți text pentru rezumat'}), 400

    preferences = user.get('preferences', {})
    result = summarize_text(text, preferences)

    # Decrement actions for Free plan users
    if user['actions_remaining'] > 0:
        user['actions_remaining'] -= 1
        session['user'] = user
        # Update users.json
        try:
            with open('users.json', 'r') as f:
                users = json.load(f)
            for u in users:
                if u['email'] == user['email']:
                    u['actions_remaining'] = user['actions_remaining']
                    break
            with open('users.json', 'w') as f:
                json.dump(users, f, indent=2)
        except Exception as e:
            print(f"Error updating user actions: {e}")

    return jsonify({'result': result})

@app.route('/api/rewrite', methods=['POST'])
def rewrite():
    if 'user' not in session:
        return jsonify({'error': 'Trebuie să fiți conectat pentru a utiliza această funcție'}), 401

    user = session['user']
    if user['actions_remaining'] == 0:
        return jsonify({'error': 'Ați epuizat acțiunile zilnice. Upgrade pentru mai multe acțiuni!'}), 403

    data = request.get_json()
    text = data.get('text', '')
    if not text.strip():
        return jsonify({'error': 'Introduceți text pentru rescriere'}), 400

    result = rewrite_text(text)

    # Decrement actions for Free plan users
    if user['actions_remaining'] > 0:
        user['actions_remaining'] -= 1
        session['user'] = user
        # Update users.json
        try:
            with open('users.json', 'r') as f:
                users = json.load(f)
            for u in users:
                if u['email'] == user['email']:
                    u['actions_remaining'] = user['actions_remaining']
                    break
            with open('users.json', 'w') as f:
                json.dump(users, f, indent=2)
        except Exception as e:
            print(f"Error updating user actions: {e}")

    return jsonify({'result': result})

@app.route('/api/calculate', methods=['POST'])
def calculate_api():
    if 'user' not in session:
        return jsonify({'error': 'Trebuie să fiți conectat pentru a utiliza calculatorul'}), 401

    user = session['user']
    if user['actions_remaining'] == 0:
        return jsonify({'error': 'Ați epuizat acțiunile zilnice. Upgrade pentru mai multe acțiuni!'}), 403

    data = request.get_json()
    calc_type = data.get('type')
    params = data.get('params', {})

    if not calc_type:
        return jsonify({'error': 'Selectați un tip de calcul'}), 400

    result = calculate(calc_type, params)

    # Decrement actions for Free plan users
    if user['actions_remaining'] > 0:
        user['actions_remaining'] -= 1
        session['user'] = user
        # Update users.json
        try:
            with open('users.json', 'r') as f:
                users = json.load(f)
            for u in users:
                if u['email'] == user['email']:
                    u['actions_remaining'] = user['actions_remaining']
                    break
            with open('users.json', 'w') as f:
                json.dump(users, f, indent=2)
        except Exception as e:
            print(f"Error updating user actions: {e}")

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