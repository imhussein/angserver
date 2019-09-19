const bodyParser = require("body-parser");
const passport = require("passport");

/**
|--------------------------------------------------
| App Middlewares
|--------------------------------------------------
*/

module.exports = app => {
  // Body Parser
  app.use(bodyParser.json());

  // Passport
  app.use(passport.initialize());
};
