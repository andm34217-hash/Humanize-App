const fs = require('fs');
const path = require('path');

// Path to users.json (use /tmp for Vercel)
const usersFile = path.join('/tmp', 'users.json');

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Read existing users
    let users = [];
    try {
        if (fs.existsSync(usersFile)) {
            const data = fs.readFileSync(usersFile, 'utf8');
            users = JSON.parse(data);
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error reading users data' });
    }

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Check password (simple check, use bcrypt in production)
    const decodedPassword = Buffer.from(user.password, 'base64').toString('utf8');
    if (decodedPassword !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
}