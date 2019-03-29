const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./database/db");
const bodyParser = require("body-parser");
const passportSetup = require("./config/passport-setup");
const passport = require("passport");
const expressSession = require("express-session");
const keys = require("./config/keys");

// routers
const filesRouter = require("./routes/files");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const linkRouter = require("./routes/links");

db.setUPConnection();

const app = express();
app.use(
  expressSession({
    secret: keys.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 604800000 },
    store: new (require("connect-mongo")(expressSession))({
      url: keys.mongodb.dbURI
    })
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(passport.initialize());
app.use(passport.session());

//Setup WebSockets and add midleware
const websockets = require("./sockets/websockets.js")(app);

// login handler
app.use("/auth", authRouter);
// work with users
app.use("/user", usersRouter);
// work with files
app.use("/file", filesRouter);
// create links
app.use("/link", linkRouter);

app.use(express.static(path.resolve(__dirname, "./ClientApp/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/ClientApp/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
