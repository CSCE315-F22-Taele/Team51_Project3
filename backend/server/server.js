const dotenv = require("dotenv").config({ path: "../.env" });
const expressSession = require("express-session");
const express = require("express");
const app = express();
const port = 3001;
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

app.use(
    expressSession({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
// Import Middlewares
require("../middlewares/passport");
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

// Import Routes
const authRoutes = require("../routes/auth");
const posRoutes = require("../routes/menu");
const inventoryRoutes = require("../routes/inventory");
const revenueRoutes = require("../routes/revenue");
const excessRoutes = require("../routes/excess");
const restockRoutes = require("../routes/restock");
const pairRoutes = require("../routes/pair");
const menuRoutes = require("../routes/menuManager");
const checkoutRoutes = require("../routes/checkout");

app.get("/", (req, res) => {
    res.send("RevPOS Application: Pinging Test to Server");
});

// Initialize Routes
app.use("/api/", authRoutes);
app.use("/api/pos", posRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/excess", excessRoutes);
app.use("/api/restock", restockRoutes);
app.use("/api/pair", pairRoutes);
app.use("/api/menuManager", menuRoutes);
app.use("/api/checkout", checkoutRoutes);

app.listen(port, () => console.log(`Server Started on Port ${port}`));
