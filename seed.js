const User = require("./models/user");

const data = [
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
    },
    {
        name: 'Teste1',
        email: 'teste1@gmail.com',
        cpf: '85389840631'
    },
    {
        name: 'Teste2',
        email: 'teste2@hotmail.com',
        cpf: '25228377611'
    },
    {
        name: 'Teste3',
        email: 'teste3@gmail.com',
        cpf: '99091491680'
    },
    {
        name: 'teste4',
        email: 'teste4@gmail.com',
        cpf: '90386545618'
    },
    {
        name: 'Teste6',
        email: 'Teste6@hotmail.com',
        cpf: '21389696650'
    },
    {
        name: 'Teste7',
        email: 'teste7@gmail.com',
        cpf: '14305595605'
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