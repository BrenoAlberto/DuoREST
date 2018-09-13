var express = require("express"),
    app     = express(),
    bodyParser  = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    seedDB = require("./seed"),
    User = require("./models/user"),
    methodOverride = require("method-override");

require('dotenv').load();

var userRoutes = require("./routes/users");

mongoose.Promise = global.Promise;

const databaseUri = 'mongodb://localhost/DuoREST';

mongoose.connect(databaseUri, { useNewUrlParser: true })
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("."));
app.use(methodOverride('_method'));
seedDB();

app.use("/", userRoutes);

app.listen(3000, function () {
    console.log("The Server Has Started!");
});