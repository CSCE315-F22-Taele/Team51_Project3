const pool = require("../server/db");

exports.getUsers = async (req, res) => {
    try {
        const res = await pool.query("SELECT * FROM accounts");
        console.log(res);
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
            "INSERT INTO accounts(type, userid, username, password) VALUES ('$1', $2, $3, $4)",
            [type, userID, username, password]
        );

        return res.status(201).json({
            success: true,
            message: "The registration was successful",
        });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            error: error.message,
        });
    }
};
