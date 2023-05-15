const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

 // userSchema for creating user model how the user data should be in MogoDB
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
