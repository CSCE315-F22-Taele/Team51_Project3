const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");

const getMenuItems = (req, res) => {
    pool.query("SELECT * FROM menu", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addMenuItem = (req, res) => {
    const { category, name, price, ingredients, png, options, id } = req.body;
    //add ingredient to db
    pool.query(
        "INSERT INTO menu (category, name, price, ingredients, png, options, id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [category, name, price, ingredients, png, options, id],
        (error, results) => {
            if (error) throw error;
            res.status(201).send("Menu Item Created Successfully!");
        }
    );
};

const removeMenuItem = (req, res) => {
    //  const id  = parseInt(req.params.id);
    const { idRemove } = req.body;

    pool.query("DELETE FROM menu WHERE id = $1", [idRemove], (error, results) => {
        if (error) throw error;
        res.status(200).send("Menu Item removed successfully.");
    });
};

module.exports = {
    getMenuItems,
    addMenuItem,
    removeMenuItem,
};
