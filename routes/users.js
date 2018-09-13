var express = require("express");
var router = express.Router();
var User = require("../models/user");

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//INDEX - show all users
router.get("/", function (req, res) {
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
});

//CREATE - add new user to DB
router.post("/", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var cpf = req.body.cpf;
    var newUser = { name: name, email: email, cpf: cpf };
    User.create(newUser, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/");
        }
    });
});

//NEW - show form to create new user
router.get("/new", function (req, res) {
    res.render("users/new");
});

// EDIT - shows edit form for a user
router.get("/:id/edit", function (req, res) {
    User.findById(req.params.id).exec(function(err, foundUser){
        if(err || !foundUser){
            console.log(err);
            req.flash('error', 'Desculpe mas este usuário não existe!');
            return res.redirect('/users');
        }
        console.log(foundUser);
        res.render("users/edit", { user: foundUser });
    })
    
});

// PUT - updates user in the database
router.put("/:id", function (req, res) {
    var newData = { name: req.body.name, email: req.body.email, cpf: req.body.cpf };
    User.findByIdAndUpdate(req.params.id, { $set: newData }, function (err, user) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "Atualizado com sucesso!");
            res.redirect("/users/" + user._id);
        }
    });
});

// DELETE - removes user and its comments from the database
router.delete("/:id", function (req, res) {
    req.user.remove(function (err) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/');
        }
        req.flash('error', 'Usuário deletado!');
        res.redirect('/users');
    });
});

module.exports = router;