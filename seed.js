var mongoose = require("mongoose"),
    User = require("./models/user");

var data = [
    {
        name: 'Bob Lee',
        email: 'boblee@gmail.com',
        cpf: '52865518078'
    },
    {
        name: 'George Kimmel',
        email: 'georgek@hotmail.com',
        cpf: '52511324687'
    },
    {
        name: 'Homer Simpsons',
        email: 'homero@gmail.com',
        cpf: '22263474021'
    }
];

function seedDB(){
    User.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed user");
        data.forEach(function(seed){
            User.create(seed, function(err, user){
                if(err){
                    console.log(err)
                } else {
                    console.log("added user");
                }
            })
        })
    })
}

module.exports = seedDB;