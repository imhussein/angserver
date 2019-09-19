const nodemailer = require("nodemailer");
const nodemailerSendGrid = require("nodemailer-sendgrid-transport");
const config = require("config");

const transport = nodemailer.createTransport(
  nodemailerSendGrid({
    auth: {
      api_key: config.get("SEND_GRID_API_KEY")
    }
  })
);

module.exports = transport;
