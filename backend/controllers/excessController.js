const pool = require("../server/db");
const async = require("async");

const getDailyInventory = async (req, res) => {
    const date = req.params.date;
    await pool.query(
        "SELECT * FROM daily_inventory WHERE date = $1",
        [date],
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        }
    );
};

const getIngredientUsage = async (req, res) => {
    let usageCount = {};
    const { ids, firstDate, secondDate } = req.body;
    await async.forEachOf(
        ids,
        function (id, i, callback) {
            pool.query(
                "SELECT COUNT(ingredientslist) FROM orders JOIN orderinfo ON orders.orderid = orderinfo.orderid WHERE $1=ANY(orderinfo.ingredientslist) AND (orders.date BETWEEN $2 AND $3)",
                [id, firstDate, secondDate],
                (err, res) => {
                    if (err) callback(err);

                    usageCount[id] = res.rows[0].count;
                    callback();
                }
            );
        },
        function (err) {
            if (err) console.error(err.message);
            else {
                res.status(200).json(usageCount);
            }
        }
    );
};

module.exports = {
    getDailyInventory,
    getIngredientUsage,
};
