# Humanize Authentication System

A simple sign up and login system built with Node.js for Vercel.

## Structure

- `index.html`: Login page
- `signup.html`: Sign up page
- `api/login.js`: Serverless function for login
- `api/signup.js`: Serverless function for sign up
- `users.json`: Stores user data
- `vercel.json`: Vercel configuration
- `package.json`: Node.js dependencies

## Local Development

1. Install Vercel CLI: `npm install -g vercel`
2. Run locally: `vercel dev`
3. Open http://localhost:3000

## GitHub and Deployment

1. Create a GitHub repository
2. Push code: `git add .`, `git commit -m "Initial commit"`, `git push origin main`
3. Connect to Vercel: Import project from GitHub in Vercel dashboard
4. Deploy automatically on push

## How it Works

- Forms use fetch to send JSON to API endpoints
- Sign up checks for existing email and saves to users.json
- Login verifies email and password
- Simple base64 encoding for passwords (use bcrypt in production)