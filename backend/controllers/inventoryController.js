const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

const decrementInventoryById = (req, res) => {
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
    const { newId, newName, inventoryEnter } = req.body;
            //add ingredient to db
            pool.query(
                "INSERT INTO ingredients (id, name, inventory) VALUES ($1, $2, $3)",
                [newId, newName, inventoryEnter],
                (error, results) => {
                    if (error) throw error;
                    res.status(201).send("Ingredient Created Successfully!");
                });
};

const removeIngredient = (req, res) => {
    const { idRemove } = req.body;

            pool.query("DELETE FROM ingredients WHERE id = $1", [idRemove], (error, results) => {
                if (error) throw error;
                res.status(200).send("Ingredient removed successfully.");
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






module.exports = {
    getIngredients,
    getIngredientById,
    addIngredient,
    removeIngredient,
    updateIngredientInventory,
    decrementInventoryById,
};
