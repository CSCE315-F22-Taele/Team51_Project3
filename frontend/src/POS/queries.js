const getIngredients = "SELECT * FROM ingredients";
const getIngredientById = "SELECT * FROM ingredients WHERE id = $1";
const checkIngredientExists = "SELECT i FROM ingredients i WHERE i.id = $1";
const addIngredient = "INSERT INTO ingredients (id, name, price, calories, inventory) VALUES ($1, $2, $3, $4, $5);"
const removeIngredient = "DELETE FROM ingredients WHERE id = $1"

module.exports = {
    getIngredients,
    getIngredientById,
    checkIngredientExists,
    addIngredient,
    removeIngredient,
}