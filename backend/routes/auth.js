const { Router } = require("express");
const { getUsers, register, login, protected, logout } = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../middlewares/validateAuth");
const { validateAuthErrors } = require("../middlewares/validateAuthErrors");
const { userAuth, googleAuth, googleAuthCB } = require("../middlewares/auth");

const router = Router();

router.get("/get-users", getUsers);
router.get("/protected", userAuth, protected);
router.post("/register", registerValidation, validateAuthErrors, register);
router.post("/login", loginValidation, validateAuthErrors, login);
router.get("/login/google", googleAuth);
router.get("/auth/google/callback", googleAuthCB, (req, res) => {
    console.log("Logged in");
});
router.get("/logout", userAuth, logout);

module.exports = router;
