const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { User } = require('../model/userModel');
const { authentication } = require('../middelware/authentication');

const userRoutes = express.Router();

// User registration route. 
userRoutes.post('/register', async (req, res) => {
    try {
        const { username, password, name, age, address } = req.body;

        if (!username || !password || !name || !age || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User login route
userRoutes.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.secretKey, { expiresIn: '30m' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User submit form route
userRoutes.post('/submit-form', async (req, res) => {
    try {
        const { userId, name, age, address, photo } = req.body;

        // Update the user document with the collected data
        const updatedUser = await User.findByIdAndUpdate(userId, { name, age, address, photo }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Form submitted successfully', user: updatedUser });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = {
    userRoutes
}