const express = require("express");
const route = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const JWT_SECRET = require("../config/config");
route.use(cookieParser());

route.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ email, password: hashedpassword });

    const token = jwt.sign({ userId: user._id }, "123456", { expiresIn: "1h" });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // Prevents JavaScript access to the cookie
      // sameSite: "Strict", // Protects against CSRF
    });

    res.json({ token: token, userdata: user });
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.send("Email NOT FOUND");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, "123456", {
        expiresIn: "1h",
      });
      res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === "production", // Ensures cookie is sent over HTTPS in production
        sameSite: "Strict", // Protects against CSRF
      });

      return res.json({ token });
    } else {
      console.log("password incorrect");
      return res.send("Incorrect password");
    }
  } catch (e) {
    console.log(e.message);
    return res.send(e.message);
  }
});

route.get("/getalluser", async (req, res) => {
  res.send("all User ");
});

//generate Token

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};
module.exports = route;
