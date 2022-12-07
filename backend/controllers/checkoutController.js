const pool = require("../server/db");
const queries = require("../queries/queries");
const { response } = require("express");


/**
 * Inserts the order into the Orders Table in PSQL 
 * @author  Johnny
 * @param   {double} totalPrice contains strings (username, password) holding the login information
 * @param   {int} itemCount represents how many items are inside the order
 * @return  {Promise} holds the result of what was inserted
 */
const addToOrders = async (totalPrice, itemCount) => {
    const order = await pool.query(
        "INSERT INTO orders (amount, itemcount) VALUES ($1, $2) RETURNING *",
        [totalPrice, itemCount]
    );
    return order;
};

/**
 * Inserts each item from the order into the Orderinfo Table in PSQL
 * @author  Johnny
 * @param   {int} orderID the current order identification number
 * @param   {list} cart the items ordered by the user
 */
const addOrderInfo = (orderID, cart) => {
    cart.map((menuItem) => {
        pool.query(
            "INSERT INTO orderinfo (orderid, productid, quantity, ingredients) VALUES ($1, $2, $3, $4)",
            [orderID, menuItem.id, 1, menuItem.ingredients]
        );
    });
};

/**
 * Updates the revenue inside Revenue Table in PSQL with the current order
 * @author  Johnny
 * @param   {int} orderID the current order identification number
 */
const updateRevenue = (orderID) => {
    pool.query(
        "UPDATE revenue SET revenue = revenue + (SELECT amount FROM orders WHERE orderid = $1) WHERE date = (CURRENT_DATE)",
        [orderID]
    );
};

/**
 * Main function calling helper function to complete and record the order
 * @author  Johnny
 */
const checkoutOperator = (req, res) => {
    const { cart, totalPrice } = req.body;
    const itemCount = cart.length;

    const order = addToOrders(totalPrice, itemCount);
    order.then(function (result) {
        const orderID = result["rows"][0].orderid;
        addOrderInfo(orderID, cart);
        updateRevenue(orderID);
    });
    res.status(200).send("[SUCCESS] Added Order to Database");
};


/**
 * Updates the inventory in PSQL respective to what was ordered
 * @author  Will
 */
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
};

module.exports = {
    decreaseIngredientInventory,
    checkoutOperator,
};
