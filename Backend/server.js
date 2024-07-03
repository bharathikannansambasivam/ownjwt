const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Route = require("./router/router");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(Route);
app.get("/", (req, res) => {
  res.send("Hello");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log(`App is Running on Port 3000`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });
