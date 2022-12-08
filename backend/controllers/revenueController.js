const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

const getAllRevenue = (req, res) => {
    pool.query("SELECT * FROM revenue", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getRevenueBetweenDates = (req, res) => { //check params
    const firstDate = req.params.firstDate;
    const secondDate = req.params.secondDate;

    pool.query("SELECT orderid, date, amount FROM orders WHERE date BETWEEN $1 AND $2", [firstDate,secondDate], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
}


module.exports = {
    getAllRevenue,
    getRevenueBetweenDates,
}