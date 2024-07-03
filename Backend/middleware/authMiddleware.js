const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const { JWT_SECRET } = require("../config/config");
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token
      token = req.headers.authorization.split(" ")[1];

      //verify token

      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id);

      next();
    } catch (e) {
      console.log(e.message);
      res.status(401).send("USER NOT AUTHORIZED");
      throw new Error("USER NOT AUTHORIZED");
    }
  }

  if (!token) {
    console.log("token not found");

    return res.status(401).send("TOKEN NOT FOUND");
  }
};
module.exports = { protect };
