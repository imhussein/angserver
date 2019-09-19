const express = require("express");
const router = express.Router();
const registerValidation = require("../../../validation/users/register");
const loginValidation = require("../../../validation/users/login");
const usersController = require("../../../controllers/api/v1/users");

/**
|--------------------------------------------------
| Users Routes
|--------------------------------------------------
*/

router.post("/register", registerValidation(), usersController.registerUser);

router.post("/login", loginValidation(), usersController.loginUser);

module.exports = router;
