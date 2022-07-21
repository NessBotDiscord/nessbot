const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    guildId: String,
    channelId: String,
    roleId: String,
    message: String
})

module.exports = mongoose.model('verification', Schema)