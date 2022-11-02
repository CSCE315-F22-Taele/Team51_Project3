const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

const getAllRevenueDates = (req, res) => {
    pool.query(queries.getAllRevenueDates, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getRevenueByDate = (req, res) => {
    const date = req.params.date;
    pool.query(queries.getRevenueByDate, [date], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
}

module.exports = {
    getAllRevenueDates,
    getRevenueByDate,
}