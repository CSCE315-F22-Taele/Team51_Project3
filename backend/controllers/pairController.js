const pool = require("../server/db");
const { response } = require("express");

/**
 * Queries the items in certain dates from orders and orderinfo
 * this will be parsed to find the lowest items
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */

const createTable = (req, res) => {
//     const firstDate = req.params.firstDate;
//     const secondDate = req.params.secondDate;
    pool.query(
        // "CREATE TABLE X (pid int, count int); INSERT INTO X (pid, count) SELECT productid, COUNT(*) FROM orderinfo WHERE orderid IN (SELECT orderid FROM orders WHERE Date BETWEEN '2022-11-04' AND '2022-11-05') GROUP BY productid ORDER BY count DESC; SELECT menu.name FROM menu JOIN X ON menu.id = X.pid; DROP TABLE X;",
        // "SELECT menu.name FROM menu JOIN X ON menu.id = X.pid",
        "CREATE TABLE X (pid int, count int);",
        // [firstDate, secondDate],
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        }
    );
};

const insertPair = (req, res) => {
    pool.query(
        "INSERT INTO X (pid, count) SELECT productid, COUNT(*) FROM orderinfo WHERE orderid IN (SELECT orderid FROM orders) AND NOT EXISTS (SELECT * FROM X) GROUP BY productid ORDER BY count DESC;",
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        }
    );
};

const insertPairDates = (req, res) => {
    const firstDate = req.params.firstDate;
    const secondDate = req.params.secondDate;
    pool.query(
        // "CREATE TABLE X (pid int, count int); INSERT INTO X (pid, count) SELECT productid, COUNT(*) FROM orderinfo WHERE orderid IN (SELECT orderid FROM orders WHERE Date BETWEEN '2022-11-04' AND '2022-11-05') GROUP BY productid ORDER BY count DESC; SELECT menu.name FROM menu JOIN X ON menu.id = X.pid; DROP TABLE X;",
        // "SELECT menu.name FROM menu JOIN X ON menu.id = X.pid",
        "INSERT INTO X (pid, count) SELECT productid, COUNT(*) FROM orderinfo WHERE orderid IN (SELECT orderid FROM orders WHERE Date BETWEEN $1 AND $2) AND NOT EXISTS (SELECT * FROM X) GROUP BY productid ORDER BY count DESC;",
        [firstDate, secondDate],
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        }
    );
};

const getPair = (req, res) => {
//     const firstDate = req.params.firstDate;
//     const secondDate = req.params.secondDate;
    pool.query(
        // "CREATE TABLE X (pid int, count int); INSERT INTO X (pid, count) SELECT productid, COUNT(*) FROM orderinfo WHERE orderid IN (SELECT orderid FROM orders WHERE Date BETWEEN '2022-11-04' AND '2022-11-05') GROUP BY productid ORDER BY count DESC; SELECT menu.name FROM menu JOIN X ON menu.id = X.pid; DROP TABLE X;",
        "SELECT menu.name FROM menu JOIN X ON menu.id = X.pid",
        // [firstDate, secondDate],
        (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        }
    );
};

const removePair = (req, res) => {
    //     const firstDate = req.params.firstDate;
    //     const secondDate = req.params.secondDate;
        pool.query(
            // "CREATE TABLE X (pid int, count int); INSERT INTO X (pid, count) SELECT productid, COUNT(*) FROM orderinfo WHERE orderid IN (SELECT orderid FROM orders WHERE Date BETWEEN '2022-11-04' AND '2022-11-05') GROUP BY productid ORDER BY count DESC; SELECT menu.name FROM menu JOIN X ON menu.id = X.pid; DROP TABLE X;",
            "DELETE FROM X",
            // [firstDate, secondDate],
            (error, results) => {
                if (error) throw error;
                res.status(200).json(results.rows);
            }
        );
    };

module.exports = {
    getPair,
    insertPair,
    insertPairDates,
    createTable,
    removePair,
};
