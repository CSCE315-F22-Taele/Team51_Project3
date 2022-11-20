//INGREDIENTS (for inventory/manager)
const getIngredients = "SELECT * FROM ingredients ORDER BY id";
const getIngredientById = "SELECT * FROM ingredients WHERE id = $1";
const checkIngredientExists = "SELECT i FROM ingredients i WHERE i.id = $1";
const addIngredient = "INSERT INTO ingredients (id, name, inventory) VALUES ($1, $2, $3)";
const removeIngredient = "DELETE FROM ingredients WHERE id = $1";
const decrementInventoryById = "UPDATE ingredients SET inventory = inventory - 1 WHERE id = $1";
const editInventoryById = "UPDATE ingredients set inventory = $1 where id = $1";
const decreaseIngredientInventory = "UPDATE ingredients WHERE id = $1 SET inventory = inventory - $2"

//MENU ITEMS (For POS)
const getMenuItems = "SELECT * FROM menu";
const getMenuItemById = "SELECT * FROM menu WHERE id = $1";
const checkMenuItemExists = "SELECT i FROM menu i where i.id = $1";
const addMenuItem = "INSERT INTO menu (category, name, price, ingredients, png, options, id) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const removeMenuItem = "DELETE FROM menu WHERE id = $1"; 


//REVENUE (SALES REPORT)
// const getAllRevenueDates = "SELECT orderid, date, amount FROM orders";
const getRevenueBetweenDates = "SELECT orderid, date, amount FROM orders WHERE date BETWEEN $1 AND $2";
const getAllRevenueDates = "SELECT * FROM orders";
//const getRevenueBetweenDates = "SELECT * FROM orders WHERE date BETWEEN $1 AND $2";

//RESTOCK REPORT
const showRestock = "SELECT * FROM ingredients where inventory < $1"

//PAIR REPORT
const pairReportDates = "select * from orders join orderinfo on orders.orderid = orderinfo.orderid where orders.date between $1 and $2";
const pairReport = "CREATE TABLE X (pid int, count int); INSERT INTO X (pid, count) SELECT productid, COUNT(*) FROM orderinfo WHERE orderid IN (SELECT orderid FROM orders WHERE Date BETWEEN $1 AND $2) GROUP BY productid ORDER BY count DESC; SELECT menu.name FROM menu JOIN X ON menu.id = X.pid; DROP TABLE X;";

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
    getRevenueBetweenDates,
    showRestock,
    pairReportDates,
    pairReport,
    decreaseIngredientInventory,
}