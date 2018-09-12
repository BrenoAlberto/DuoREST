var express  = require("express"),
    mongoose = require("mongoose"),
    flash    = require("connect-flash"),
    User     = require("user");

var userRoutes = require("./routes/users");

app.use("/", userRoutes);

app.listen(3000, function(){
    console.log("The Server Has Started!");
});