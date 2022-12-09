const pool = require("../server/db");
const queries = require("../queries/queries");

/**
 * Decrements an ingredient's inventory from the Database given the ID
 * @author  Will
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const decrementInventoryById = (req, res) => {
    const id = parseInt(req.params.id);
    // make sure ingredient actually exists
    pool.query("SELECT * FROM ingredients WHERE id = $1", [id], (error, results) => {
        const noIngredientFound = !results.rows.length;
        if (noIngredientFound) {
            res.send("Ingredient does not exist in database.");
        } else {
            pool.query(
                "UPDATE ingredients SET inventory = inventory - 1 WHERE id = $1",
                [id],
                (error, results) => {
                    if (error) throw error;
                    res.status(200).send("Ingredient inventory reduced by one.");
                }
            );
        }
    });
};

/**
 * Retrieve all the ingredients in the Table Ingredients from the Database
 * @author  Johnny
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const getIngredients = (req, res) => {
    pool.query("SELECT * FROM ingredients ORDER BY id", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

/**
 * Retrieves an ingredients from the database with the ID
 * @author  Johnny
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const getIngredientById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getIngredientById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

/**
 * Adds an ingredient from the Database with the respective params
 * @author  Johnny
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const addIngredient = (req, res) => {
    const { newID, newName, newInventory } = req.body;
    //add ingredient to db
    pool.query(
        "INSERT INTO ingredients (id, name, inventory) VALUES ($1, $2, $3)",
        [newID, newName, newInventory],
        (error, results) => {
            if (error) throw error;
            res.status(201).send("Ingredient Created Successfully!");
        }
    );
    var sql = `ALTER TABLE daily_inventory ADD "${newID}" int4`;
    pool.query(sql);
};

/**
 * Remove an ingredient from the Database with the respective params
 * @author  Johnny
 * @param   {any} req object containing information about the HTTP request
 * @param   {any} res packet to send back the desired HTTP response
 */
const removeIngredient = (req, res) => {
    const { removeID } = req.body;
    pool.query("DELETE FROM ingredients WHERE id = $1", [removeID], (error, results) => {
        if (error) throw error;
        res.status(200).send("Ingredient removed successfully.");
    });
    var sql = `ALTER TABLE daily_inventory DROP COLUMN "${removeID}"`;
    pool.query(sql);
};

/**
 * Updates an ingredient's inventory in the Database with the respective params
 * @author  Johnny
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
