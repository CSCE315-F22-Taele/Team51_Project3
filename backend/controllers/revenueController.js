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

// const getRevenueBetweenDates = (req, res) => { //check params
//     //const startDate = req.params.date;
//     //const { date } = req.body;
//     pool.query(queries.getRevenueBetweenDates, [date,date], (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows)
//     });
// }

const getRevenueByDate = (req, res) => { 
    const date = req.params.date;
    pool.query(queries.getRevenueByDate, [date], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
}

const getOrderIDsFromOrderHistory = (req, res) => {
    pool.query(queries.getOrderIDsFromOrderHistory, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getRevenueByOrderID = (req, res) => { 
    const orderid = req.params.orderid;
    pool.query(queries.getRevenueByOrderID, [orderid], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
}

//get revenue given a time window


module.exports = {
    getAllRevenueDates,
    getRevenueBetweenDates,
    getRevenueByDate,
    getOrderIDsFromOrderHistory,
    getRevenueByOrderID,
}