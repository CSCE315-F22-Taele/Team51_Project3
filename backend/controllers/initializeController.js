const pool = require("../server/db");
const { response } = require("express");

/**
 * Initializes the Database with Daily Commands (Daily Inventory and Revenue) for
 * the system to function
 * @author  Johnny
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const initialDatabase = async (req, res) => {
    const currentDate = new Date().toJSON().slice(0, 10);

    try {
        const currentDay = await pool.query("SELECT * FROM revenue WHERE date = $1", [
            currentDate,
        ]);
        const currentInv = await pool.query(
            "SELECT * FROM daily_inventory WHERE date = $1",
            [currentDate]
        );
        if (!currentDay.rows.length) {
            await pool.query(
                "INSERT INTO revenue (type, date, revenue) VALUES('normal', $1, 0)",
                [currentDate]
            );
        }
        if (!currentInv.rows.length) {
            await pool.query("INSERT INTO daily_inventory (date) VALUES ($1)", [
                currentDate,
            ]);
            const inventoryList = await pool.query(
                "SELECT * FROM ingredients ORDER BY id"
            );
            inventoryList.rows.forEach((ingredient, i) => {
                var sql = `UPDATE daily_inventory SET "${ingredient.id}" = ${ingredient.inventory} WHERE date = '${currentDate}'`
                pool.query(sql);
            });
        }
        res.status(200).send("[SUCCESS] Initialized");
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    initialDatabase,
};
