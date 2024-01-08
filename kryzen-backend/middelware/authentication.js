const jwt = require('jsonwebtoken');
require('dotenv').config();
const{users}= require('../model/userModel');

const authentication = async (req, res, next) => {
    try {
        let token = req?.headers?.authorization;
        
        if (!token) {
            return res.status(401).json({ message: "Not authorized user" });
        }
        
        token = req.headers.authorization.split(" ")[1];
        
        const decodedToken = jwt.verify(token, process.env.secretKey);
        
        if (!decodedToken) {
            return res.status(401).json({ message: "Not authorized user" });
        }
        
        const { userId } = decodedToken;
        const user = await users.findOne({ _id: userId });
        
        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({ message: "User please try again", error: error.message });
    }
}

module.exports = { authentication };