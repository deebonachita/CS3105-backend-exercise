const users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secret = 'your_jwt_secret';  

const register = (req, res) => {
    const { username, password, email } = req.body;

    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = { username, password, email };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

const login = (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
};

const profile = (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ profile: user });
};

module.exports = { register, login, profile };
