const { Router } = require('express');
const controller = require("../controllers/inventoryController")

const router = Router();
z
router.get("/", controller.getIngredients);
router.patch("/:id", controller.updateIngredientInventory);
router.post("/", controller.addIngredient);
router.get("/:id", controller.getIngredientById);
router.delete("/:id", controller.removeIngredient);
router.patch("/:id", controller.decrementInventoryById)
router.patch("/:firstDate/:secondDate", controller.getExcessDates)

module.exports = router;