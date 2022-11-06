const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");
/**
 * Updates an ingredient's inventory in the Database with the respective params
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const showItemsRestock = (req,res) =>
{
    const { inventory } = req.params;
    pool.query(queries.showRestock,
       [inventory],
       (error,results) =>
       {
        if (error) throw error;
        res.status(200).send("items need restocking are ");
       } );
};
module.exports = {
    showItemsRestock,
    
}