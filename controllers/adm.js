const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    Adm = require("../models/adm");

exports.loginPage = function (req, res) {
    res.render("users/login");
};

exports.login = function (req, res) {
    Adm.findOne({ username: req.body.username })
        .exec()
        .then(adm => {
            if (adm.length < 1) {
                return res.status(401).json({
                    message: "Autenticação falhou"
                });
            }
            bcrypt.compare(req.body.password, adm.hash_password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Autenticação falhou"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        username: adm.username,
                        admId: adm._id
                    },'secret',
                        {
                            expiresIn: '72h'
                        }
                    );
                    return res.status(200).redirect('/users');
                }
                res.status(401).json({
                    message: "Autenticação falhou"
                });
            })
        })
};

exports.registerPage = function (req, res) {
    res.render("users/register");
};

exports.register = function (req, res) {
    Adm.find({ username: req.body.username })
        .exec()
        .then(adm => {
            if (adm.length >= 1) {
                return res.status(409).json({
                    message: "Usuário já existe"
                });
            } else {
                const newAdm = new Adm(req.body);
                newAdm.hash_password = bcrypt.hashSync(req.body.password, 10);
                newAdm.save(function (err, Adm) {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        })
                    } else {
                        Adm.hash_password = undefined;
                        res.status(200).redirect('/');
                    }
                });
            }
        })
};

exports.loginRequired = function (req, res, next) {
    if (req.adm) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};