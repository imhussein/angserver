const { check, body } = require("express-validator");
const User = require("../../models/User");

module.exports = function registerValidation() {
  return [
    check("name").custom((name, { req }) => {
      if (!name) {
        throw new Error("Name is required");
      } else {
        if (name.length < 5) {
          throw new Error("Name length must be at least 5 characters");
        }
      }
    }),
    check("username").custom((username, { req }) => {
      if (!username) {
        throw new Error("Username is required");
      } else {
        if (username.length < 5) {
          throw new Error("Username must be at least 5 characters");
        } else {
          return User.findOne({
            username
          }).then(user => {
            if (user) {
              throw new Error("Username already exists");
            }
          });
        }
      }
    }),
    check("email").custom((email, { req }) => {
      if (!email) {
        throw new Error("Email is required");
      } else {
        if (!body("email").isEmail()) {
          throw new Error("Email is invalid");
        } else {
          return User.findOne({
            email
          }).then(user => {
            if (user) {
              throw new Error("Email is already taken");
            }
          });
        }
      }
    }),
    check("password").custom((password, { req }) => {
      if (!password) {
        throw new Error("Password is required");
      } else {
        if (password.length < 5) {
          throw new Error("Password must be at least 5 characters");
        }
      }
    }),
    check("password_confirm").custom((password_confirm, { req }) => {
      if (password_confirm !== req.body.password) {
        throw new Error("Passwords do not match");
      }
    })
  ];
};
