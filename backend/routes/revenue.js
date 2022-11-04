const { Router } = require('express');
const controller = require('../controllers/revenueController');

const router = Router();

router.get("/", controller.getAllRevenueDates);
router.get("/:date,date", controller.getRevenueBetweenDates); //check params
router.get("/:date", controller.getRevenueByDate);
router.get("/", controller.getOrderIDsFromOrderHistory);
router.get("/:orderid", controller.getRevenueByOrderID);

//router.get("/:date", controller.getRevenueFromStartDate); //if date is 2022-10-27, get revenue on and after that date

module.exports = router;

