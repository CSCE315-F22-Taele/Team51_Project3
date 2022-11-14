const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");


const getMenuItems = (req, res) => {
    pool.query(queries.getMenuItems, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    });
};


const addMenuItem = (req, res) => {
    const { category, name, price, ingredients, png, options, id } = req.body;
    //add ingredient to db
    pool.query(queries.addMenuItem, [category, name, price, ingredients, png, options, id], (error, results) => {
        if (error) throw error;
        res.status(201).send("Menu Item Created Successfully!");
    });
};




const removeMenuItem = (req, res) => {
    //  const id  = parseInt(req.params.id);
     const { id } = req.body;
    //make sure ingredient actually exists

    pool.query(queries.removeMenuItem, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Menu Item removed successfully.");
    });
};


module.exports = {
    getMenuItems,
    addMenuItem,
    removeMenuItem,
};