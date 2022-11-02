const { Router } = require('express');
const controller = require('../controllers/revenueController');

const router = Router();

router.get("/", controller.getAllRevenueDates);
router.get("/:date", controller.getRevenueByDate);

module.exports = router;