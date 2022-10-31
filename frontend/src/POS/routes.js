const { Router } = require('express');
const controller = require("./controller")

const router = Router();

/*router.get("/", controller.getIngredients);
router.post("/", controller.addIngredient);
router.get("/:id", controller.getIngredientById);
router.delete("/:id", controller.removeIngredient);*/

router.get("/", controller.getMenuItems);
router.post("/", controller.addMenuItem);
router.get("/:id", controller.getMenuItemById);
router.delete("/:id", controller.removeMenuItem);
//router.patch("/:id", controller.decrementInventoryById)

module.exports = router;