const mongoose = require("mongoose");
const mongodb = require("mongodb");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter email"],
    // unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [4, "Password must be at least 4 characters long"],
  },
});

const UserModel = mongoose.model("TestUserModel", userSchema);

module.exports = UserModel;
