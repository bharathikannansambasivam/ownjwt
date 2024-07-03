const express = require("express");
const { PORT, MONGO_URL } = require("./config/config");
const cors = require("cors");
const mongoose = require("mongoose");
const Route = require("./router/router");
const cookieParser = require("cookie-parser");
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
  .connect(`${MONGO_URL}`)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`App is Running on Port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);

    res.send(e.message);
  });
