const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    wguildId: String,
    welcomeMsg: String,
    wchannelId: String
})

module.exports = mongoose.model('welcomes', Schema)