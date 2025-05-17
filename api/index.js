// backend code for task management app
const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const FRONT_URL = process.env.FRONT_URL;
const app = express();
app.use(
  cors({
    origin: FRONT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const port = process.env.PORT || 4001;
const connectDB = require("./db");
connectDB();
app.use("/api", require("./Auth/route"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});