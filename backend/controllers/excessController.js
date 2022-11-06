const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

/**
 * Queries the items in certain dates from orders and orderinfo
 * this will be parsed to find the lowest items
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const getExcess = (req, res) => {
    pool.query(queries.excessReport,(error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        }
    );
};



const getExcessDates = (req, res) => {
    // Grabs the JSON body data from the request
    // const { firstDate, secondDate } = req.query;
    // console.log(firstDate, secondDate);

    // let response
    // if( firstDate && secondDate )
    // {
    //     reponse = await pool.query(queries.excessReport,[firstDate,secondDate]);
    // }

    // if (response.rowCount > 0 )
    // {
    //     res.status(200).send(response.rows);
    // }
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
    // const { firstDate } = req.params;
    // // Grabs the JSON body data from the request
    // const { secondDate } = req.body;

    // pool.query(
    //     "select * from orders join orderinfo on orders.orderid = orderinfo.orderid where orders.date between $1 and $2",
    //     [firstDate, secondDate],
    //     (error, results) => {
    //         if (error) throw error;
    //         res.status(200).send("excess dates grapped");
    //     }
    // );
};

module.exports = {

    getExcessDates,
    getExcess,
};