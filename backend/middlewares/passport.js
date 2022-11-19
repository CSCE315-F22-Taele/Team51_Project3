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
                    "SELECT userid, username FROM accounts WHERE userid = $1",
                    [userid]
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
            clientSecret: process.env.GOOGLE_CLIENT_SCRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            // Create User Object
            const user = {
                email: profile.emails[0].value,
                googleId: profile.id,
                displayName: profile.displayName,
            };
            
            // Search the Database if there a user with the following information
            try {
                const currentUser = await pool.query("SELECT * FROM accounts WHERE type = $1 AND userid = $2", ["google", user.googleId]);
                if (!currentUser.rows.length) {
                    console.log("NO USERS ATTEMPTING CREATE");
                }
            } catch (err) {
                done(err)
            }
            done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    console.log("Serializing User: ", user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // const user = await
    console.log("Deserialized User", user);
    done(err, user);
});
