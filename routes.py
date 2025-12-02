from flask import render_template, request, jsonify
from app import app
from ai_functions import detect_ai, summarize_text, rewrite_text
from calculators import chemistry_calc, physics_calc, term_calc

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/app')
def app_page():
    return render_template('app.html')

@app.route('/instrumente')
def instrumente_page():
    return render_template('instrumente.html')

@app.route('/detect', methods=['POST'])
def detect():
    text = request.form['text']
    result = detect_ai(text)
    return jsonify(result)

@app.route('/summary', methods=['POST'])
def summary():
    text = request.form['text']
    result = summarize_text(text)
    return jsonify(result)

@app.route('/rewrite', methods=['POST'])
def rewrite():
    text = request.form['text']
    result = rewrite_text(text)
    return jsonify(result)

@app.route('/chemistry', methods=['POST'])
def chemistry():
    data = request.get_json()
    result = chemistry_calc(data)
    return jsonify(result)

@app.route('/physics', methods=['POST'])
def physics():
    data = request.get_json()
    result = physics_calc(data)
    return jsonify(result)

@app.route('/term', methods=['POST'])
def term():
    data = request.get_json()
    result = term_calc(data)
    return jsonify(result)

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/pricing')
def pricing():
    return render_template('pricing.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')