const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log(req.headers);
    try{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyZW5vYXBzIiwiYWRtSWQiOiI1YjliZTJlZjE1MTRhZjAwNjQ3ZjE4MDkiLCJpYXQiOjE1MzcxNTY5NzksImV4cCI6MTUzNzQxNjE3OX0.l9KtHc5YmF4Uev3Tly1TTcMv3OliPE6b46kw5tp3Eik';
        const decoded = jwt.verify(token, 'secret');
        req.admData = decoded;
        next();
    } catch(error) {
        return res.status(401).redirect('/');
    }
}