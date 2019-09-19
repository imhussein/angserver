const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  registerToken: {
    type: String
  },
  registerTokenExpiry: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
