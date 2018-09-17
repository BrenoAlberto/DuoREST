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

var userRoutes = require("./routes/users"),
    loginRoutes = require("./routes/adm");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use("/", loginRoutes);
app.use("/users", userRoutes);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' não encontrado' })
});

app.listen(3000, function () {
    console.log("The Server Has Started!");
});