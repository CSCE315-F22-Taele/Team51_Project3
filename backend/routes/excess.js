const { Router } = require("express");
const { getExcessDates } = require("../controllers/excessController");

const router = Router();

router.get("/:firstDate/:secondDate", getExcessDates);

module.exports = router;
