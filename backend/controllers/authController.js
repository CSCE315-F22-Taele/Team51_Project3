const dotenv = require("dotenv").config({ path: "../.env" });
const pool = require("../server/db");
const { sign } = require("jsonwebtoken");

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

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const type = "user";
        const userID = ("" + Math.random()).substring(2, 7);
        await pool.query(
            "INSERT INTO accounts(type, userid, username, password) VALUES ($1, $2, $3, $4)",
            [type, userID, username, password]
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
            message: "Logged in successfully",
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
            info: "Protected Info",
        });
    } catch (err) {
        console.log(err.message);
    }
};

exports.logout = async (req, res) => {
    try {
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

const dotenv = require("dotenv").config({ path: "../.env" });
const pool = require("../server/db");
const { sign } = require("jsonwebtoken");

exports.generateID = () => {
    const digits = (Math.floor(Math.random() * (9 - 5 + 1) ) + 5);
    const id = ("" + Math.random()).substring(2, digits + 2);
    return id;
}

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

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const type = "local";
        const role = "user";
        let userID;

        // Generate a User ID upon Registration, check if User ID is already in use
        while (true) {
            userID = this.generateID();
            const { rows } = await pool.query("SELECT * FROM accounts WHERE userid = $1", [userID]);
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
            message: "Logged in successfully",
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
            info: "Protected Info",
        });
    } catch (err) {
        console.log(err.message);
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('connect.sid');
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
