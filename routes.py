from flask import render_template, request, jsonify, redirect, url_for, flash, session
from app import app, db
from ai_functions import detect_ai, summarize_text, rewrite_text
from calculators import chemistry_calc, physics_calc, term_calc
from models import User
from email_utils import send_confirmation_email
from werkzeug.security import check_password_hash

@app.route('/')
def home():
    if session.get('user_id'):
        return redirect(url_for('dashboard'))
    return render_template('index.html')

@app.route('/app')
def app_page():
    if session.get('user_id'):
        return render_template('app.html')
    # For non-authenticated users, check trial usage
    trial_uses = session.get('trial_uses', 0)
    trial_progress = (trial_uses / 3) * 100
    return render_template('app.html', trial_uses=trial_uses, trial_limit=3, trial_progress=trial_progress)

@app.route('/instrumente')
def instrumente_page():
    return render_template('instrumente.html')

@app.route('/detect', methods=['POST'])
def detect():
    if not session.get('user_id'):
        trial_uses = session.get('trial_uses', 0)
        if trial_uses >= 3:
            return jsonify({'error': 'Trial limit reached. Please create an account to continue.', 'trial_limit_reached': True})
        session['trial_uses'] = trial_uses + 1

    text = request.form['text']
    result = detect_ai(text)
    return jsonify(result)

@app.route('/summary', methods=['POST'])
def summary():
    if not session.get('user_id'):
        trial_uses = session.get('trial_uses', 0)
        if trial_uses >= 3:
            return jsonify({'error': 'Trial limit reached. Please create an account to continue.', 'trial_limit_reached': True})
        session['trial_uses'] = trial_uses + 1

    text = request.form['text']
    result = summarize_text(text)
    return jsonify(result)

@app.route('/rewrite', methods=['POST'])
def rewrite():
    if not session.get('user_id'):
        trial_uses = session.get('trial_uses', 0)
        if trial_uses >= 3:
            return jsonify({'error': 'Trial limit reached. Please create an account to continue.', 'trial_limit_reached': True})
        session['trial_uses'] = trial_uses + 1

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

# Authentication routes
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')

        # Validate input
        if not all([name, email, password]):
            flash('All fields are required', 'error')
            return redirect(url_for('signup'))

        if len(password) < 6:
            flash('Password must be at least 6 characters long', 'error')
            return redirect(url_for('signup'))

        # Ensure database tables exist
        db.create_all()

        # Check if user already exists
        try:
            existing_user = User.query.filter_by(email=email).first()
        except Exception as e:
            flash('Database error. Please try again.', 'error')
            return redirect(url_for('signup'))
        if existing_user:
            flash('Email already registered', 'error')
            return redirect(url_for('signup'))

        # Create new user
        user = User(name=name, email=email, confirmed=True)  # Temporarily set confirmed=True for testing
        user.set_password(password)

        try:
            db.session.add(user)
            db.session.commit()

            # For now, skip email sending to test basic functionality
            flash('Account created successfully! You can now log in.', 'success')
            return redirect(url_for('login'))

        except Exception as e:
            db.session.rollback()
            flash('An error occurred during account creation. Please try again.', 'error')
            return redirect(url_for('signup'))

    return render_template('signup.html')

@app.route('/confirm/<token>')
def confirm_email(token):
    user = User.query.filter_by(confirmation_token=token).first()

    if not user:
        flash('Invalid confirmation link', 'error')
        return redirect(url_for('login'))

    if user.is_token_expired():
        flash('Confirmation link has expired. Please request a new one.', 'error')
        return redirect(url_for('login'))

    if user.confirm_token(token):
        db.session.commit()
        flash('Account confirmed successfully! You can now log in.', 'success')
    else:
        flash('Invalid or expired confirmation link', 'error')

    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()

        if user and user.check_password(password):
            if not user.confirmed:
                flash('Please confirm your email address before logging in.', 'warning')
                return redirect(url_for('login'))

            session['user_id'] = user.id
            session['user_email'] = user.email
            session['user_name'] = user.name
            flash(f'Welcome back, {user.name}!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password', 'error')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('You have been logged out', 'info')
    return redirect(url_for('home'))