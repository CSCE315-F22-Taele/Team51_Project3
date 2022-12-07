const { Router } = require("express");
const controller = require("../controllers/checkoutController");

const router = Router();

router.patch("/:id", controller.decreaseIngredientInventory);
router.post("/", controller.checkoutOperator);

module.exports = router;
