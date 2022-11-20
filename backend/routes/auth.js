const { Router } = require("express");
const {
  getUsers,
  register,
  login,
  protected,
  logout,
} = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../middlewares/validateAuth");
const { validateAuthErrors } = require("../middlewares/validateAuthErrors");
const { userAuth, googleAuth, googleAuthCB } = require("../middlewares/auth");
const isAuth = require("../middlewares/isAuth");

const router = Router();

router.get("/get-users", getUsers);
router.get("/protected", userAuth, protected);
router.post("/register", registerValidation, validateAuthErrors, register);
router.post("/login", loginValidation, validateAuthErrors, login);
router.get("/login/google", googleAuth);
router.get("/auth/google/callback", googleAuthCB, (req, res) => {
});
router.get("/auth/user", isAuth, (req, res) => {
    res.json(req.user);
});
router.get("/logout", userAuth, logout);
