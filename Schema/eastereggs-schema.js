const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    eguildId: String,
});

module.exports = new mongoose.model('eastereggsSchema', Schema);