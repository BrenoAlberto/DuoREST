const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.cookies.Authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        req.admData = decoded;
        next();
    } catch(error) {
        return res.status(401).redirect('/');
    }
}