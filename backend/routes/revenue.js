const { Router } = require('express');
const controller = require('../controllers/revenueController');

const router = Router();

router.get("/", controller.getAllRevenueDates);
router.get("/:firstDate/:secondDate", controller.getRevenueBetweenDates); //check params

module.exports = router;