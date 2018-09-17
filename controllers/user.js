const User = require("../models/user"),
      cpf = require("../public/scripts/script");

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
    User.find({ $or: [{ email: req.body.email }, { cpf: req.body.cpf }] })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Usuário já existe"
                });
            } else {
                const newUser = { name: req.body.name, email: req.body.email, cpf: req.body.cpf };
                var result = cpf.validate(newUser.cpf)
                if (result) {
                    User.create(newUser, function (err) {
                        if (err) {
                            return res.status(500).send({
                                message: err
                            })
                        } else {
                            res.status(200).redirect('/users');
                        }
                    });
                } else {
                    res.status(500).json({
                        message: 'CPF inválido'
                    })
                }
            }
        })
};

exports.createUserForm = function (req, res) {
    res.render("users/new");
};

exports.editUserForm = function (req, res) {
    User.findById(req.params.id).exec(function (err, foundUser) {
        if (err || !foundUser) {
            console.log(err);
            return res.redirect('/users');
        }
        console.log(foundUser);
        res.render("users/edit", { user: foundUser });
    });
};

exports.updateUser = function (req, res) {
    User.find({ $or: [{ email: req.body.email }, { cpf: req.body.cpf }] })
        .exec()
        .then(user => {
            if (user.length >= 1 && user[0]._id != req.params.id) {
                return res.status(409).json({
                    message: "Usuário já existe"
                });
            } else {
                const newData = { name: req.body.name, email: req.body.email, cpf: req.body.cpf };
                var result = cpf.validate(newData.cpf)
                if (result) {
                    User.updateOne({ _id: req.params.id }, { $set: newData })
                        .exec()
                        .then(result => {
                            res.status(200).redirect('/users');
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                        })
                } else {
                    res.status(500).json({
                        message: 'CPF inválido'
                    })
                }
            }
        })
};

exports.deleteUser = function (req, res, next) {
    User.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).redirect('/users');
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};