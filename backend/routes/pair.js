const { Router } = require('express');
const controller = require('../controllers/pairController');

const router = Router();

router.get("/", controller.getPairs)
router.get("/:firstDate/:secondDate", controller.getPairDates)

module.exports = router;