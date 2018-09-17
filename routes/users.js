const express = require("express"),
    router = express.Router(),
    userHandlers = require("../controllers/user"),
    admHandlers = require("../controllers/adm"),
    checkAuth = require('../middleware/check-auth');

router.route('')
    .get(checkAuth, userHandlers.showUsers)
    .post(checkAuth, userHandlers.createUser);

router.route("/new")
    .get(checkAuth, userHandlers.createUserForm);

router.route("/:id/edit")
    .get(checkAuth, userHandlers.editUserForm);

router.route("/:id")
    .put(checkAuth, userHandlers.updateUser)
    .delete(checkAuth, userHandlers.deleteUser);

module.exports = router;