const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
        // match: /^(d{3}.d{3}.d{3}-d{2})|(d{11})$/
    }
});

module.exports = mongoose.model("User", UserSchema);