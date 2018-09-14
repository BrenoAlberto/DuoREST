var express = require("express"),
    router = express.Router(),
    Adm = require("../models/adm");

router.get("/", function (req, res) {
    res.render("users/login");
});

router.post("/login", function (req, res) {
    Adm.findOne({
        username: req.body.username
    }, function (err, adm) {
        if (err) {
            console.log(err);
        }
        if (!adm) {
            res.status(401).json({ message: 'Usuário não encontrado' });
        } else if (adm) {
            if (adm.comparePassword(req.body.password)) {
                res.status(401).json({ message: 'Senha errada' });
            } else {
                res.redirect("/users");
                return res.json({ token: jwt.sign({ username: adm.username, _id: adm._id }, 'RESTFULAPI') });
            }
        }
    })
});

module.exports = router;