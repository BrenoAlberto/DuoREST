var express = require("express"),
    router = express.Router(),
    admHandlers = require("../controllers/adm");

router.route("")
    .get(admHandlers.loginPage);

router.route("")
    .post(admHandlers.login);

router.route("/register")
    .get(admHandlers.registerPage)
    .post(admHandlers.register);

module.exports = router;