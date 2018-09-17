var mongoose = require("mongoose"),
    bcrypt = require('bcrypt');

var AdmSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    hash_password: { type: String, required: true }
});

AdmSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('Adm', AdmSchema);
