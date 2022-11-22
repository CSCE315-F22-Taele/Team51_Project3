const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

const getAllRevenueDates = (req, res) => {
    pool.query(queries.getAllRevenueDates, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getRevenueBetweenDates = (req, res) => { //check params
    const firstDate = req.params.firstDate;
    const secondDate = req.params.secondDate;
    console.log(firstDate, secondDate);

    //const { date } = req.body;
    pool.query(queries.getRevenueBetweenDates, [firstDate,secondDate], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
}


module.exports = {
    getAllRevenueDates,
    getRevenueBetweenDates,
}