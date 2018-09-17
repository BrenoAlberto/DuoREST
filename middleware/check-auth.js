const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJyZW5vYXBzIiwiYWRtSWQiOiI1YjliZTJlZjE1MTRhZjAwNjQ3ZjE4MDkiLCJpYXQiOjE1MzcxMzk1MDcsImV4cCI6MTUzNzE0MzEwN30.SAmad2oTslcKiZYFFoaC-xjXynB233K431oH9oGtezc';
        const decoded = jwt.verify(token, 'secret');
        req.admData = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}