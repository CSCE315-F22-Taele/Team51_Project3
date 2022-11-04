const { Router } = require("express");
const { getUsers, register } = require("../controllers/authController");
const { registerValidation } = require("../middlewares/validateAuth");
const { validateAuthErrors } = require("../middlewares/validateAuthErrors");

const router = Router();

router.get("/get-users", getUsers) 
router.post("/register", registerValidation, validateAuthErrors, register)

module.exports = router;