const pool = require("../server/db");
const { response } = require("express");


const getExcessDates = (req, res) => {

    const firstDate = req.params.firstDate;
    const secondDate = req.params.secondDate;
    pool.query(
        "select * from daily_inventory where date between $1 and $2",
        [firstDate, secondDate],
        (error, results) => {
            if (error) throw error;
            res.status(200).send(results.rows);
        }
    );

};

module.exports = {
    getExcessDates,

};
