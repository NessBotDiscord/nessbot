const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userID: String,
    moderatorID: String,
    reason: String,
    date: String,
})

module.exports = mongoose.model('gbanSchema', Schema)