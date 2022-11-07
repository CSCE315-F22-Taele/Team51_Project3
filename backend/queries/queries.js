//INGREDIENTS (for inventory/manager)
const getIngredients = "SELECT * FROM ingredients ORDER BY id";
const getIngredientById = "SELECT * FROM ingredients WHERE id = $1";
const checkIngredientExists = "SELECT i FROM ingredients i WHERE i.id = $1";
const addIngredient = "INSERT INTO ingredients (id, name, inventory) VALUES ($1, $2, $3)";
const removeIngredient = "DELETE FROM ingredients WHERE id = $1";
const decrementInventoryById = "UPDATE ingredients SET inventory = inventory - 1 WHERE id = $1";
const editInventoryById = "UPDATE ingredients set inventory = $1 where id = $1";

//MENU ITEMS (For POS)
const getMenuItems = "SELECT * FROM menu";
const getMenuItemById = "SELECT * FROM menu WHERE id = $1";
const checkMenuItemExists = "SELECT i FROM menu i where i.id = $1";
const addMenuItem = "INSERT INTO menu (category, name, price, ingredients, png, options, id) VALUES ($1, $2, $3, $4, $5, $6, $7)";
const removeMenuItem = "DELETE FROM menu WHERE id = $1"; 


//REVENUE (SALES REPORT)
const getAllRevenueDates = "SELECT * FROM revenue";
const getRevenueBetweenDates = "SELECT * FROM revenue WHERE date BETWEEN $1 and $2";
const getRevenueByDate = "SELECT * FROM revenue WHERE date = $1";
const getOrderIDsFromOrderHistory = "SELECT distinct orderid FROM orders;" //on the x axis
const getRevenueByOrderID = "SELECT amount FROM orderinfo where orderid = $1" //get corresponding price

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
    getRevenueByDate,
    getOrderIDsFromOrderHistory,
    getRevenueByOrderID,
    showRestock,
    pairReportDates,
    pairReport,
}