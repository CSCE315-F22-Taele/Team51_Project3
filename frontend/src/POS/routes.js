const { Router } = require('express');
const controller = require("./controller")

const router = Router();

router.get("/", controller.getIngredients);
router.post("/", controller.addIngredient);
router.get("/:id", controller.getIngredientById);
router.delete("/:id", controller.removeIngredient);

module.exports = router;