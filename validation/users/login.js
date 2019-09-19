const { check, body } = require("express-validator");
const User = require("../../models/User");
const bcryptjs = require("bcryptjs");

module.exports = function loginValidation() {
  return [
    check("email").custom((email, { req }) => {
      if (!email) {
        throw new Error("Email is required");
      } else {
        User.findOne({
          email
        }).then(user => {
          if (!user) {
            throw new Error("User Not Found");
          }
        });
      }
    }),
    body("password").custom((password, { req }) => {
      if (!password) {
        throw new Error("Password is required");
      } else {
        User.findOne({
          email: req.body.email
        }).then(user => {
          if (user) {
            bcryptjs.compare(password, user.password).then(isMatch => {
              if (!isMatch) {
                throw new Error("Password Incorrect");
              }
            });
          }
        });
      }
    })
  ];
};
