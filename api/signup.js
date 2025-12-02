const fs = require('fs');
const path = require('path');

// Path to users.json (use /tmp for Vercel)
const usersFile = path.join('/tmp', 'users.json');

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
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

    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create new user (simple hash for demo, use bcrypt in production)
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: Buffer.from(password).toString('base64') // Simple encoding, not secure
    };

    users.push(newUser);

    // Save to file
    try {
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error saving user data' });
    }

    res.status(201).json({ success: true, message: 'Account created successfully' });
}