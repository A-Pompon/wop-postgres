require("dotenv").config();

module.exports = {
  secretJwtToken: process.env.ACCESS_TOKEN_SECRET,
};
