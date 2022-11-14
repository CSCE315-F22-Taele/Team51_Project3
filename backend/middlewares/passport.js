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

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SCRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = {
                email: profile.emails[0].value,
                googleId: profile.id,
                displayName: profile.displayName,
            };
        }
    )
);

passport.serializeUser((user, done) => {
    console.log("Serializing User: ", user);
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    // const user = await
    console.log("Deserialized User", user);
    done(err, user);
})
