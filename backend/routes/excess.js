const { Router } = require("express");
const { getDailyInventory, getIngredientUsage } = require("../controllers/excessController");

const router = Router();

router.get("/dailyinventory/:date", getDailyInventory);
router.post("/ingredientusage/", getIngredientUsage)

module.exports = router;
