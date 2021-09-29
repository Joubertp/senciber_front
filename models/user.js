const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name :String,
    surname: String,
    email: String,
    password: String,
    token: String,
    connecte: Boolean,
});

module.exports = mongoose.model('user', schema);