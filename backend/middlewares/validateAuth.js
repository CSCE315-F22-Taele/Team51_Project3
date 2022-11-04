const { check } = require("express-validator");
const pool = require("../server/db");

// Password
const password = check("password")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password has to be between 6 and 15 characters.");

// Username
const username = check("username")
    .notEmpty()
    .withMessage("Please provide a valid username.");

// Checks if Username already exists in Database
const usernameExists = check("username").custom(async (value) => {
    const { rows } = await pool.query(
        "SELECT * FROM accounts WHERE username = $1",
        [value]
    );
    if (rows.length) {
        throw new Error("Username already exists.");
    }
});

module.exports = {
    registerValidation: [username, password, usernameExists],
};
