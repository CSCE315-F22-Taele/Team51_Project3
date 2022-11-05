const dotenv = require("dotenv").config({ path: "../.env" });
const passport = require("passport");
const { Strategy } = require("passport-jwt");
const pool = require("../server/db");

const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) token = req.cookies["token"];
    return token;
};

passport.use(
    new Strategy(
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
                    throw new Error("401 not authorized");
                }
                let user = {
                    userid: rows[0].userid,
                    username: rows[0].username,
                };
                return await done(null, user)
            } catch (err) {
                console.log(err.message)
                done(null, false)
            }
        }
    )
);
