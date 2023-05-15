require("dotenv").config();
const express = require("express");
const passport = require("passport");
const authRoute = require("./routes/auth");

 require("./passport");


const {
  register,
  login,
} = require("./controllers/auth.controller");
const { authenticateUser, generateToken, hashPassword, checkPassword, expireToken } = require('./middlewares/authenticate');

var cors = require("cors");
const app = express();
app.use(cors());
const fs = require('fs');
app.use(express.json())
//based on route it calls the function 



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


app.use(passport.initialize());
app.use(passport.session());

app.use('/register', register);
app.use('/login', login);

app.use("/auth",authRoute)
app.use('/logout', authenticateUser, expireToken, (req, res) => {
    res.json({ message: 'Logged out successfully'})
})

module.exports = app;
