const { Router } = require('express');
const controller = require('../controllers/pairController');

const router = Router();

// router.post("/", controller.createTable)
router.patch("/", controller.insertPair)
router.patch("/:firstDate/:secondDate", controller.insertPairDates)
router.get("/", controller.getPair)
// router.get("/:firstDate/:secondDate", controller.getPairDates)

module.exports = router;