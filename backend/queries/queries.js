//INGREDIENTS (for inventory/manager)
const getIngredients = "SELECT * FROM ingredients";
const getIngredientById = "SELECT * FROM ingredients WHERE id = $1";
const checkIngredientExists = "SELECT i FROM ingredients i WHERE i.id = $1";
const addIngredient = "INSERT INTO ingredients (id, name, inventory) VALUES ($1, $2, $3)";
const removeIngredient = "DELETE FROM ingredients WHERE id = $1";
const decrementInventoryById = "UPDATE ingredients SET inventory = inventory - 1 WHERE id = $1"
const editInventoryById = "Update ingredients set inventory = $1 where id = $1"

//MENU ITEMS (For POS)
const getMenuItems = "SELECT * FROM menu";
const getMenuItemById = "SELECT * FROM menu WHERE id = $1";
const checkMenuItemExists = "SELECT i FROM menu i where i.id = $1";
const addMenuItem = "INSERT INTO menu (category, name, price, ingredients, png, options, id) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const removeMenuItem = "DELETE FROM menu WHERE id = $1"; 


//REVENUE (SALES REPORT)
const getAllRevenueDates = "SELECT * FROM revenue";
const getRevenueByDate = "SELECT * FROM revenue where date = $1";

module.exports = {
    getMenuItems,
    getMenuItemById,
    checkMenuItemExists,
    addMenuItem,
    removeMenuItem,
    getIngredients,
    getIngredientById,
    checkIngredientExists,
    addIngredient,
    removeIngredient,
    decrementInventoryById,
    editInventoryById,
    getAllRevenueDates,
    getRevenueByDate,
}