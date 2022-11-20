const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

const decreaseIngredientInventory = (req, res) => {
    // Grabs the :id value (params) from the request
    const { id } = req.params;
    // Grabs the JSON body data from the request
    const { quantity } = req.body;

    pool.query(
        "UPDATE ingredients SET inventory = inventory - $1 WHERE id = $2",
        [quantity, id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send("Ingredient Quantity was Updated");
        }
    );
}

module.exports = {
    decreaseIngredientInventory,
}