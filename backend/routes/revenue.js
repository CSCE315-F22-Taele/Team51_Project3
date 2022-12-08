const { Router } = require('express');
const controller = require('../controllers/revenueController');

const router = Router();

router.get("/", controller.getAllRevenue);
router.get("/:firstDate/:secondDate", controller.getRevenueBetweenDates); //check params

module.exports = router;