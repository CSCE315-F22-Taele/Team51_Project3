const passport = require("passport");

exports.userAuth = passport.authenticate("jwt", { session: false });
exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
exports.googleAuthCB = passport.authenticate("google", {
    failureMessage: "Cannot login to Google...",
    failureRedirect: "/",
    successRedirect: "/login",
});
