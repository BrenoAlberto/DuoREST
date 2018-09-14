
module.exports = {
    loginRequired: function(req, res, next) {
        if (req.adm) {
            next();
        } else {
            return res.status(401).json({ message: 'Usuário não autorizado!' });
        }
    }
}