const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

const decrementInventoryById = (req, res) => {
    console.log("DECREMENTING INVENTORY")
    const id = parseInt(req.params.id);

    //make sure ingredient actually exists
    pool.query(queries.getIngredientById, [id], (error, results) => {
        const noIngredientFound = !results.rows.length;
        if (noIngredientFound) {
            res.send("Ingredient does not exist in database.");
        } else {
            pool.query(
                queries.decrementInventoryById,
                [id],
                (error, results) => {
                    if (error) throw error;
                    res.status(200).send(
                        "Ingredient inventory reduced by one."
                    );
                }
            );
        }
    });
};

const getIngredients = (req, res) => {
    pool.query(queries.getIngredients, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getIngredientById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getIngredientById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addIngredient = (req, res) => {
    const { id, name, inventory } = req.body;

    //make sure ingredient does not already exist
    pool.query(queries.checkIngredientExists, [id], (error, results) => {
        if (results.rows.length) {
            res.send("ID in use. (ingredient exists already)");
        } else {
            //add ingredient to db
            pool.query(
                queries.addIngredient,
                [id, name, inventory],
                (error, results) => {
                    if (error) throw error;
                    res.status(201).send("Ingredient Created Successfully!");
                }
            );
        }
    });
};

const removeIngredient = (req, res) => {
    const id = parseInt(req.params.id);

    //make sure ingredient actually exists
    pool.query(queries.getIngredientById, [id], (error, results) => {
        const noIngredientFound = !results.rows.length;
        if (noIngredientFound) {
            res.send("Ingredient does not exist in database.");
        } else {
            pool.query(queries.removeIngredient, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Ingredient removed successfully.");
            });
        }
    });
};

/**
 * Updates an ingredient's inventory in the Database with the respective params
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const updateIngredientInventory = (req, res) => {
    // Grabs the :id value (params) from the request
    const { id } = req.params;
    // Grabs the JSON body data from the request
    const { quantity } = req.body;

    pool.query(
        "UPDATE ingredients SET inventory = $1 where id = $2",
        [quantity, id],
        (error, results) => {
            if (error) throw error;
            res.status(200).send("Ingredient Quantity was Updated");
        }
    );
};

/**
 * Queries the items in certain dates from orders and orderinfo
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */

 const getExcessDates = (req, res) => {
    // Grabs the :id value (params) from the request
    const { date1 } = req.params;
    // Grabs the JSON body data from the request
    const { date2 } = req.body;

    pool.query(
        "select * from orders join orderinfo on orders.orderid = orderinfo.orderid where orders.date between $1 and $2",
        [date1, date2],
        (error, results) => {
            if (error) throw error;
            res.status(200).send("excess dates grapped");
        }
    );
};

module.exports = {
    getIngredients,
    getIngredientById,
    addIngredient,
    removeIngredient,
    updateIngredientInventory,
    decrementInventoryById,
    getExcessDates,
};
