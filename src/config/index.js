const express=require("express")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("./cors");
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
// Setup BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup CookieParser
app.use(cookieParser());

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// setup cors
cors(app);

mongoose
  .connect(`${process.env.Database}`)
  .then(() => console.log("connected to database"))
  .catch(() => console.error("could not connect"));


module.exports = app;