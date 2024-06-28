const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  jwt.sign();
};
module.exports = { protect };
