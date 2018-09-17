var express = require("express"),
    router = express.Router(),
    userHandlers  = require("../controllers/user"),
    admHandlers = require("../controllers/adm"),
    checkAuth = require('../middleware/check-auth');

router.route('')
    .get(checkAuth, userHandlers.showUsers)
    .post( userHandlers.createUser);

router.route("/new")
    .get(  userHandlers.createUserForm);
    
router.route("/:id/edit")
    .get(  userHandlers.editUserForm);

router.route("/:id")
    .put(  userHandlers.updateUser)
    .delete( userHandlers.deleteUser);

module.exports = router;