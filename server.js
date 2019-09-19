const express = require("express");
const app = express();
const config = require("config");
const db = require("./config/db");
const middleware = require("./middlewares/middlewares");

/**
|--------------------------------------------------
| Connect To DB
|--------------------------------------------------
*/
db()
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.log(err);
  });

/**
|--------------------------------------------------
| App Middlewares
|--------------------------------------------------
*/

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, Accept, X-Requested-With"
  );
  next();
});

middleware(app);

/**
|--------------------------------------------------
| Init Routes
|--------------------------------------------------
*/

const users = require("./routes/api/v1/users");
app.use("/api/v1/users", users);

const port = config.get("DEVPORT") || process.env.PORT;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
