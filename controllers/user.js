var mongoose = require('mongoose'),
    User = require("../models/user");

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

exports.showUsers = function (req, res) {
    if (req.query.search && req.xhr) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        User.find({ name: regex }, function (err, allUsers) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(allUsers);
            }
        });
    } else {
        User.find({}, function (err, allUsers) {
            if (err) {
                console.log(err);
            } else {
                if (req.xhr) {
                    res.json(allUsers);
                } else {
                    res.render("users/index", { users: allUsers, page: 'users' });
                }
            }
        });
    }
};

exports.createUser = function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var newUser = { name: name, email: email, cpf: cpf };
    User.create(newUser, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/users");
        }
    });
};

exports.createUserForm = function (req, res) {
    res.render("users/new");
};

exports.editUserForm = function (req, res) {
    User.findById(req.params.id).exec(function(err, foundUser){
        if(err || !foundUser){
            console.log(err);
            //req.flash('error', 'Desculpe mas este usuário não existe!');
            return res.redirect('/users');
        }
        console.log(foundUser);
        res.render("users/edit", { user: foundUser });
    });
};

exports.updateUser = function (req, res) {
    var newData = { name: req.body.name, email: req.body.email, cpf: req.body.cpf };
    User.updateOne({ _id: req.params.id}, {$set: newData })
    .exec()
    .then(result => {
        res.status(200).redirect('/users');
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
};

exports.deleteUser = function (req, res, next) {
    User.deleteOne({ _id: req.params.id})
    .exec()
    .then(result => {
        res.status(200).redirect('/users');
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
};