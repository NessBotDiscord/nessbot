const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    lguildId: String,
    leaveMsg: String,
    lchannelId: String
})

module.exports = mongoose.model('leaves', Schema);