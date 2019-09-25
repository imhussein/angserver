const User = require("../../../models/User");
const bcryptjs = require("bcryptjs");
const transport = require("../../../services/mails");
const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const http_status = require("http-status-codes");
const jwt = require("jsonwebtoken");
const config = require("config");

exports.registerUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(http_status.BAD_REQUEST).json(errors.array());
  } else {
    const { name, email, password, username } = req.body;
    const avatar = gravatar.url(email, {
      s: "200",
      d: "mm",
      r: "pg"
    });
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, (err, hash) => {
        const newUser = {
          name,
          email,
          password: hash,
          avatar,
          username,
          status: "inactive" /* TO DO */,
          role: "user",
          registerToken: bcryptjs
            .hash(email + name + username + Date.now(), config.get("secret"))
            .then(hash => {
              return hash;
            }),
          registerTokenExpiry: Date.now() + 60 * 60
        };
        new User(newUser)
          .save()
          .then(user => {
            transport.sendMail({
              to: email,
              from: "Mohamed" /* TO DO */,
              subject: "Activate your account",
              html: `
            <h1>Thanks For Registeration ${user.name}</h1>
            <h3>To activate your account please click <a href="http://localhost:5000/users/activate/${user.registerToken}">Here</a></h3>
            <p>Thanks</p>
            <p></p>`
            });
            return Promise.resolve(user);
          })
          .then(user => {
            return res.status(http_status.OK).json({
              user,
              success: true
            });
          })
          .catch(err => {
            return res.status(http_status.BAD_GATEWAY).json({
              error: "User Registeration Failed"
            });
          });
      });
    });
  }
};

exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(http_status.BAD_REQUEST).json(errors.array());
  } else {
    const { email } = req.body;
    User.findOne({
      email
    }).then(user => {
      if (user) {
        const { name, email, avatar, _id, username, role, status } = user;
        const payload = {
          name,
          email,
          avatar,
          _id,
          username,
          role,
          status
        };
        jwt.sign(
          payload,
          config.get("secret"),
          { expiresIn: 60 * 60 * 24 },
          (err, token) => {
            if (err) throw err;
            return res.status(http_status.OK).json({
              success: true,
              token: `Bearer ${token}`
            });
          }
        );
      }
    });
  }
};
