const { Router } = require('express');
const controller = require('../controllers/excessController');

const router = Router();

router.get("/:firstDate/:secondDate", controller.getExcessDates)

module.exports = router;