const { Router } = require("express");
const controller = require("../controllers/initializeController");

const router = Router();

router.post("/", controller.initialDatabase);

module.exports = router;
