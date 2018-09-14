var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    seedDB = require("./seed"),
    User = require("./models/user"),
    Adm = require("./models/adm"),
    jsonwebtoken = require("jsonwebtoken"),
    methodOverride = require("method-override");

app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPI', function (err, decode) {
            if (err) req.adm = undefined;
            req.adm = decode;
            next();
        })
    } else {
        req.adm = undefined;
        next();
    }
})

var userRoutes = require("./routes/users"),
    loginRoutes = require("./routes/adm");

mongoose.Promise = global.Promise;

const databaseUri = 'mongodb://localhost/DuoREST';

mongoose.connect(databaseUri, { useNewUrlParser: true })
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("."));
app.use(methodOverride('_method'));
seedDB();

app.use("/", loginRoutes);
app.use("/users", userRoutes);

app.listen(3000, function () {
    console.log("The Server Has Started!");
});