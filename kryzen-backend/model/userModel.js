const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    photo: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
}