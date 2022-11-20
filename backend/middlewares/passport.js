const dotenv = require("dotenv").config({ path: "../.env" });
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("../server/db");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["token"];
  return token;
};

passport.use(
  new JWTstrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.SECRET,
    },
    async ({ userid }, done) => {
      try {
        const { rows } = await pool.query(
          "SELECT userid, username FROM accounts WHERE type = $1 AND userid = $1",
          ["local", userid]
        );

        if (!rows.length) {
          throw new Error("401: Not Authorized");
        }
        let user = {
          userid: rows[0].userid,
          username: rows[0].username,
        };
        return await done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Establishes Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Create User Object
      const user = {
        email: profile.emails[0].value,
        googleId: profile.id,
        displayName: profile.displayName,
      };

      // Search the Database if there a User with the following information
      try {
        const currentUser = await pool.query(
          "SELECT * FROM accounts WHERE type = $1 AND userid = $2",
          ["google", user.googleId]
        );
        // If no User, create one in the Database
        if (!currentUser.rows.length) {
          await pool.query(
            "INSERT INTO accounts (type, role, userid, username, password) VALUES ($1, $2, $3, $4, $5)",
            ["google", "user", user.googleId, user.email, ""]
          );
        }
      } catch (err) {
        done(err);
      }
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});