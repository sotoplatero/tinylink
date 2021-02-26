const serverless = require("serverless-http");
const express = require("express");
const sessions = require("client-sessions");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const github = require("./strategies/github");

var app = express();

app.use(cookieParser());
app.use(
  sessions({
    cookieName: "session",
    secret: process.env.SESSION_SECRET,
    cookie: {
      ephemeral: false,
      secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => cb(user ? null : "null user", user));
passport.deserializeUser((user, cb) => cb(user ? null : "null user", user));

app.get("/api/auth/me", (req, res) =>
  res.send(req.user ? req.user : {})
);

app.get("/api/auth/logout", (req, res) => {
  console.info("logout");
  req.logout();
  res.redirect('/');
  // res.send({ success: 1, code: "user.logout" });
});

app.use("/api/auth/github", github);

process.on("uncaughtException", err => {
  console.error(`uncaughtException ${err.toString()}`);
});

process.on("unhandledRejection", reason => {
  console.error(`unhandledRejection ${reason}`);
});

exports.handler = serverless(app);
