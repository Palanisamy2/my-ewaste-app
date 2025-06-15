const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Updated Signup Controller
exports.signup = async (req, res) => {
    const { username, password, email, phone, location, profileImage } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email and password are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Registering:", username, email);

        const result = await db.query(
            `INSERT INTO users (username, password, email, phone, location, profile_image)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id`,
            [username, hashedPassword, email, phone, location, profileImage]
        );

        res.status(201).json({ userId: result.rows[0].id });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: error.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({
                message: 'Login successful',
                token,
                userId: user.id,         // ✅ include this
                username: user.username,  // ✅ optional, helpful on frontend
                email: user.email
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
