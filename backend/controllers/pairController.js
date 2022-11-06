const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

/**
 * Queries the items in certain dates from orders and orderinfo
 * this will be parsed to find the lowest items
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */

// Returns pairs in a list
const getPairs = (req, res) => {
    pool.query(queries.pairReport,(error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        }
    );
};



const getPairDates = (req, res) => {
    const firstDate = req.params.firstDate;
    const secondDate = req.params.secondDate;
    console.log(firstDate,secondDate);
    pool.query(
        queries.excessReportDates,
        [firstDate, secondDate],
        (error, results) => {
            if (error) throw error;
            res.status(200).send("excess dates grapped");
        }
    );
};

module.exports = {
    getPairDates,
    getPairs,
}