var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });

var indexRouter = require("./routes/index");
var roomRouter = require("./routes/room");
var userRouter = require("./routes/user");
var rosterRouter = require("./routes/roster");

var app = express();

let mongodbDatabase;
if(process.env.NODE_ENV==="test"){
  mongodbDatabase = "testDatabase";
}else{
  mongodbDatabase = "myFirstDatabase";
}

var mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@flatmates-database-dev.lwm8u.mongodb.net/${mongodbDatabase}?retryWrites=true&w=majority`;

console.log("URI",mongoUri);

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Successfully connected to MongoDB Atlas.");
    }
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/room", roomRouter);
app.use("/user", userRouter);
app.use("/roster", rosterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("We couldnt find what you were looking for")
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Something happend with the server")
});

module.exports = app;
