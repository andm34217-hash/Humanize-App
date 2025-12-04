# Humanize

A Flask-based web application that provides AI-powered text analysis tools and calculators, helping users humanize their content and perform various computations.

## Features

- **AI Text Detection**: Analyze text to determine if it's AI-generated or human-written
- **Text Summarization**: Generate concise summaries with customizable tone
- **Text Rewriting**: Rewrite content while maintaining the original meaning
- **Calculators**: Various mathematical and computational tools
- **User Authentication**: Secure login/signup system with session management
- **Responsive UI**: Modern, mobile-friendly interface built with Bootstrap

## Tech Stack

- **Backend**: Python Flask
- **AI**: Groq API (Llama models)
- **Database**: Supabase (PostgreSQL)
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Deployment**: Vercel-ready configuration

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js (for frontend dependencies)
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd humanize
```

### 2. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Environment Variables

Copy the example environment file and fill in your actual values:

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials:

```env
# Flask Secret Key for session management
SECRET_KEY=your_actual_secret_key_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_actual_service_role_key

# AI API Keys
GROQ_API_KEY=your_actual_groq_api_key
```

**Important**: Never commit the `.env` file to version control. It's already included in `.gitignore`.

### 5. Run the Application

For development:

```bash
python api_app.py
```

The application will be available at `http://localhost:5000`

## Environment Variables

The application requires the following environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `SECRET_KEY` | Flask secret key for session security | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) | Yes |
| `GROQ_API_KEY` | API key for Groq AI services | Yes |

## Project Structure

```
humanize/
├── api_app.py              # Main Flask application
├── ai_functions.py         # AI-powered text processing functions
├── calculators.py          # Mathematical calculation functions
├── requirements.txt        # Python dependencies
├── package.json           # Node.js dependencies
├── vercel.json            # Vercel deployment configuration
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
├── templates/             # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── dashboard.html
│   ├── login.html
│   ├── signup.html
│   └── ...
├── static/                # Static assets (CSS, JS, images)
└── .github/               # GitHub Actions/workflows
```

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `GET /logout` - User logout

### AI Tools
- `POST /api/detect_ai` - Detect if text is AI-generated
- `POST /api/summarize` - Summarize text with preferences
- `POST /api/rewrite` - Rewrite text

### Calculators
- `POST /api/calculate` - Perform calculations

### Pages
- `GET /` - Home page
- `GET /dashboard` - User dashboard
- `GET /login` - Login page
- `GET /signup` - Signup page
- `GET /pricing` - Pricing information
- `GET /instrumente` - Tools page

## Development

### Running Tests

```bash
# Add your test commands here
```

### Code Style

Follow PEP 8 for Python code. Use meaningful variable names and add docstrings to functions.

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Deployment

### Vercel

The project includes Vercel configuration (`vercel.json`) for easy deployment:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Local Deployment

For production deployment, consider using Gunicorn:

```bash
pip install gunicorn
gunicorn api_app:app
```

## Security Notes

- All sensitive credentials are stored in environment variables
- Never commit `.env` files or API keys to version control
- Use HTTPS in production
- Regularly rotate API keys
- Validate all user inputs

## License

[Add your license information here]

## Support

For questions or issues, please [create an issue](https://github.com/your-repo/issues) in the repository.