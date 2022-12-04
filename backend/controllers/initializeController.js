const pool = require("../server/db");
const { response } = require("express");

const initialDatabase = async (req, res) => {
    const currentDate = new Date().toJSON().slice(0, 10);

    try {
        const currentDay = await pool.query("SELECT * FROM revenue WHERE date = $1", [
            currentDate,
        ]);
        if (!currentDay.rows.length) {
            await pool.query(
                "INSERT INTO revenue (type, date, revenue) VALUES('normal', $1, 0)",
                [currentDate]
            );
            res.status(201).send("[SUCCESS] Entry was created");
        } else {
            res.status(401).send("[WARNING] Entry was already created");
        }
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    initialDatabase,
};
