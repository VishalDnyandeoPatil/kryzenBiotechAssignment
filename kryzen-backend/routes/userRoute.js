const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { users } = require('../model/userModel');
const { authentication } = require('../middelware/authentication');

const userRoute = express.Router();

userRoute('/registration', async (req, res) => {
    try {
        const payload = req.body;
        const existingUser = await users.findOne({ email: payload.email });

        if (existingUser) {
            return res.status(409).json({ msg: "User already exists, please login" });
        }
        else {
            const hashPassword = await bcrypt.hashSync(payload.password, 15);
            payload.password = hashPassword;

            const newUserRegistration = new users(payload);
            await newUserRegistration.save();

            return res.status(201).json({ msg: "User registration successfully" });

        }
    }
    catch (error) {
        return res.status(500).json({ msg: "Internal server error", error: error.message });
    }
});