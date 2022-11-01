const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");


const decrementInventoryById = (req, res) => {
    const id  = parseInt(req.params.id);

    //make sure ingredient actually exists
    pool.query(queries.getIngredientById, [id], (error, results) => {
        const noIngredientFound = !results.rows.length;
        if (noIngredientFound) {
            res.send("Ingredient does not exist in database.");
        } else {
            pool.query(queries.decrementInventoryById, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Ingredient inventory reduced by one.");
            });
        }
    });
};

const getMenuItems = (req, res) => {
    pool.query(queries.getMenuItems, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};

const getMenuItemById = (req, res) => {
    pool.query(queries.getMenuItemById, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};

const addMenuItem = (req, res) => {
    const { category, name, price, ingredients, png, options, id } = req.body;

    //make sure menu item does not already exist
    pool.query(queries.checkMenuItemExists, [id], (error, results) => {
        if (results.rows.length) {
            res.send("ID in use. (menu item exists already)")
        } else {
            //add ingredient to db
            pool.query(queries.addMenuItem, [category, name, price, ingredients, png, options, id], (error, results) => {
                if (error) throw error;
                res.status(201).send("Menu Item Created Successfully!");
            });
        }
    });
};

const removeMenuItem = (req, res) => {
    const id  = parseInt(req.params.id);

    //make sure ingredient actually exists
    pool.query(queries.getMenuItemById, [id], (error, results) => {
        const noMenuItemFound = !results.rows.length;
        if (noMenuItemFound) {
            res.send("Menu Item does not exist in database.");
        } else {
            pool.query(queries.removeMenuItem, [id], (error, results) => {
                if (error) throw error;
                res.status(200).send("Menu Item removed successfully.");
            });
        } 
    });
}; 


const getIngredients = (req, res) => {
    pool.query(queries.getIngredients, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
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
            res.send("ID in use. (ingredient exists already)")
        } else {
            //add ingredient to db
            pool.query(queries.addIngredient, [id, name, inventory], (error, results) => {
                if (error) throw error;
                res.status(201).send("Ingredient Created Successfully!");
            });
        }

        
    });
};

const removeIngredient = (req, res) => {
    const id  = parseInt(req.params.id);

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



module.exports = {
    getIngredients,
    getIngredientById,
    addIngredient,
    removeIngredient,
    decrementInventoryById,
    getMenuItems,
    getMenuItemById,
    addMenuItem,
    removeMenuItem,
};