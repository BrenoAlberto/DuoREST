var mongoose = require("mongoose"),
    bcrypt = require('bcrypt');

var AdmSchema = new mongoose.Schema({
    username: String,
    hash_password: String
});

AdmSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('Adm', AdmSchema);
