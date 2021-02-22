// const Router =  "express";
const cookieParser = require('cookie-parser');
const { Router } = require('express');
const passport = require('passport');
// import passport from "passport";
const { Strategy } = require('passport-github2');
// import { Strategy } from "passport-google-oauth20";
// import get from "lodash/fp/get";

const router = Router();

router.use((req, _res, next) => {
  // const {
  //   query: { host }
  // } = req;

  const hostname = process.env.BASE_URL

  // Note: Netlify functions don't have the host url, so we need to pass it explicitly
  if (!passport._strategy(Strategy.name) && hostname) {

    console.info(`Init Github Auth strategy on host ${hostname}`);

    passport.use(
      new Strategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: `${hostname}/api/auth/github/callback`,
          scope: ['user:email'],

        },
        async function(req, _token, _tokenSecret, profile, done) {
          console.info( profile);
          const user = {
            id: profile.id,
            email: profile.emails[0].value,
            userName: profile.displayName,
            login: profile._json.login,
            avatar: profile._json.avatar_url,
            provider: 'github',
          };

          req.user = user;
          return done(null, user);
        }
      )
    );
  }
  next();
});

router.get(
  "/",
  passport.authenticate("github")
);

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function callback(req, res) {
    console.info(`login user ${req.user && req.user.id} and redirect`);

    return req.login(req.user, async function callbackLogin(loginErr) {
      if (loginErr) {
        throw loginErr;
      }
      return res.redirect("/profile");
    });
  }
);

module.exports = router;
