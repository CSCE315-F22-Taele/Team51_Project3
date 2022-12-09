/**
 * Check if there is an auth user in the request
 * @author  Johnny
 */
const isAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).send("You must login first...");
    }
};

module.exports = isAuth;
