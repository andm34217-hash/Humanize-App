# Humanize - AI Writing & Academic Tools

A modern web application for AI text processing, academic calculators, and writing tools.

## Features

- **AI Text Humanizer**: Transform AI-generated content into natural, human-like text
- **AI Content Detector**: Analyze text for AI-generated content percentage
- **Smart Rewriter**: Rewrite, paraphrase, and summarize text
- **Academic Calculators**: Mathematics, physics, and chemistry calculators
- **User Authentication**: Secure sign-up with email confirmation
- **Dashboard**: Track usage, view history, and manage saved texts

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Flask Configuration
SECRET_KEY=your-secret-key-here-change-in-production
DATABASE_URL=sqlite:///humanize.db

# Email Configuration (choose one method)
# SMTP (Gmail example)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=noreply@humanize.com

# SendGrid
MAIL_SERVER=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key

# Mailgun
MAIL_SERVER=smtp.mailgun.org
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=postmaster@your-domain.mailgun.org
MAIL_PASSWORD=your-mailgun-password
```

### 3. Initialize Database

```bash
python init_db.py
```

### 4. Run the Application

```bash
python app.py
```

The application will be available at `http://localhost:5000`

## Email Configuration

### Gmail SMTP
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://support.google.com/accounts/answer/185833
3. Use your Gmail address as `MAIL_USERNAME` and the App Password as `MAIL_PASSWORD`

### SendGrid
1. Sign up for SendGrid: https://sendgrid.com
2. Create an API key
3. Set `MAIL_USERNAME=apikey` and `MAIL_PASSWORD=your-api-key`

### Mailgun
1. Sign up for Mailgun: https://www.mailgun.com
2. Set up a domain or use the sandbox
3. Use your SMTP credentials from the Mailgun dashboard

## User Registration Flow

1. User signs up with name, email, and password
2. System generates unique confirmation token (expires in 24 hours)
3. Confirmation email is sent with verification link
4. User clicks link to activate account
5. Account is marked as confirmed and user can log in

## Security Features

- Password hashing with Werkzeug
- Unique confirmation tokens with expiration
- Session-based authentication
- CSRF protection (Flask-WTF can be added for enhanced security)
- Input validation and sanitization

## API Endpoints

- `POST /signup` - User registration
- `GET /confirm/<token>` - Email confirmation
- `POST /login` - User authentication
- `GET /logout` - User logout
- `GET /dashboard` - User dashboard (requires authentication)

## Database Schema

### User Model
- `id`: Primary key
- `email`: Unique email address
- `password_hash`: Hashed password
- `name`: User's full name
- `confirmed`: Email confirmation status
- `confirmation_token`: Email verification token
- `token_expires`: Token expiration timestamp
- `created_at`: Account creation timestamp

## Development

The application uses:
- **Flask**: Web framework
- **Flask-SQLAlchemy**: Database ORM
- **Flask-Mail**: Email sending
- **Jinja2**: Template engine
- **SQLite**: Database (easily configurable for PostgreSQL/MySQL)

## Production Deployment

For production deployment:
1. Use a production WSGI server (gunicorn, uwsgi)
2. Set up a production database (PostgreSQL recommended)
3. Configure proper email service
4. Set strong SECRET_KEY
5. Enable HTTPS
6. Set up proper session handling
7. Consider adding rate limiting and additional security measures

## License

This project is for educational purposes. Please ensure compliance with applicable laws and regulations.