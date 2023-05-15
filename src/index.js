require("dotenv").config();
const express = require("express");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
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

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: YOUR_CLIENT_ID,
    clientSecret: YOUR_CLIENT_SECRET,
    callbackURL: YOUR_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));






app.use(passport.initialize());
app.use(passport.session());



app.post('/upload', (req, res) => {
  const { file } = req.body;

  // Write file to disk using the event loop
  fs.writeFile('uploads/' + file.name, file.data, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error uploading file');
    } else {
      res.send('File uploaded successfully');
    }
  });
});
app.use('/register', register);
app.use('/login', login);


app.use('/logout', authenticateUser, expireToken, (req, res) => {
    res.json({ message: 'Logged out successfully'})
})

module.exports = app;
