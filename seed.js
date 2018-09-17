const User = require("./models/user");

const data = [
    {
        name: 'Bob Lee',
        email: 'boblee@gmail.com',
        cpf: '528.655.180-78'
    },
    {
        name: 'George Kimmel',
        email: 'georgek@hotmail.com',
        cpf: '525.113.246-87'
    },
    {
        name: 'Homer Simpsons',
        email: 'homero@gmail.com',
        cpf: '222.634.740-21'
    },
    {
        name: 'Teste1',
        email: 'teste1@gmail.com',
        cpf: '853.898.406-31'
    },
    {
        name: 'Teste2',
        email: 'teste2@hotmail.com',
        cpf: '252.283.776-11'
    },
    {
        name: 'Teste3',
        email: 'teste3@gmail.com',
        cpf: '990.914.916-80'
    },
    {
        name: 'teste4',
        email: 'teste4@gmail.com',
        cpf: '903.865.456-18'
    },
    {
        name: 'Teste6',
        email: 'Teste6@hotmail.com',
        cpf: '213.896.966-50'
    },
    {
        name: 'Teste7',
        email: 'teste7@gmail.com',
        cpf: '143.055.956-05'
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