const express = require("express");
const route = express.Router();
const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { JWT_SECRET } = require("../config/config");
const { protect } = require("../middleware/authMiddleware");
route.use(cookieParser());

route.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }
  try {
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ email, password: hashedpassword });
    const token = generateToken(user.id);
    //COKKIE TOKEN
    res.cookie("token", token, { httpOnly: true });
    res.json({ userdata: user, token });
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
    if (!passwordMatch) {
      console.log("password incorrect");
      return res.send("Incorrect password");
    }
    //COKKIE TOKEN
    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });
    res.json({ user, token });
  } catch (e) {
    console.log(e.message);
    return res.send(e.message);
  }
});

route.get("/getalluser", protect, async (req, res) => {
  const user = await userModel.find();
  res.send(user);
});

//generate Token

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1h" });
};
module.exports = route;
