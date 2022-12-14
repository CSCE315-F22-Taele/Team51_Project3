const dotenv = require("dotenv").config({ path: "../.env" });
const pool = require("../server/db");
const { sign } = require("jsonwebtoken");

/**
 * Generates an ID ranging from 5 digits to 9
 * @author  Johnny
 * @return  {int} the generate ID
 */
exports.generateID = () => {
    const digits = Math.floor(Math.random() * (9 - 5 + 1)) + 5;
    const id = ("" + Math.random()).substring(2, digits + 2);
    return id;
};

/**
 * Retreieves a list of users from the database
 * @author  Johnny
 * @return  {QueryResult} list of users from the query
 */
exports.getUsers = async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM accounts");
        return res.status(200).json({
            success: true,
            users: rows,
        });
    } catch (err) {
        console.log(err.message);
    }
};

/**
 * Retreieves a list of managers from the database
 * @author  Johnny
 * @return  {QueryResult} list of managers from the query
 */
exports.getManagers = async (req, res) => {
    try {
        const { rows } = await pool.query(
            "SELECT userid FROM accounts WHERE role = 'manager'"
        );
        return res.status(201).json({
            managers: rows,
        });
    } catch (err) {
        console.log(err);
    }
};

/**
 * Registers the user with the information given int othe Database
 * @author  Johnny
 */
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const type = "local";
        const role = "user";
        let userID;

        // Generate a User ID upon Registration, check if User ID is already in use
        while (true) {
            userID = this.generateID();
            const { rows } = await pool.query(
                "SELECT * FROM accounts WHERE userid = $1",
                [userID]
            );
            if (!rows.length) {
                break;
            }
        }
        await pool.query(
            "INSERT INTO accounts(type, role, userid, username, password) VALUES ($1, $2, $3, $4, $5)",
            [type, role, userID, username, password]
        );

        return res.status(201).json({
            success: true,
            message: "The registration was successful",
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: err.message,
        });
    }
};

/**
 * Logs the user in and establishes a cookie within the system
 * @author  Johnny
 */
exports.login = async (req, res) => {
    let user = req.user;

    let payload = {
        userid: user.userid,
        username: user.username,
    };
    try {
        const token = sign(payload, process.env.SECRET);
        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            success: true,
            user: user,
            message: "Logged in successfully",
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

/**
 * Demonstrating protected links
 * @author  Johnny
 */
exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
            info: "Protected Info",
        });
    } catch (err) {
        console.log(err.message);
    }
};

/**
 * Logs the user out of the system and clears the cookies
 * @author  Johnny
 */
exports.logout = async (req, res) => {
    try {
        res.clearCookie("connect.sid");
        return res.status(200).clearCookie("token", { httpOnly: true }).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: err.message,
        });
    }
};
