const dotenv = require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const port = 3001;
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors");

// FOR FIXING CORS ERROR IN REACT
const { application } = require("express");

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

// Import Routes
const authRoutes = require("../routes/auth");
const posRoutes = require("../routes/menu");
const inventoryRoutes = require("../routes/inventory");
const revenueRoutes = require("../routes/revenue");
const excessRoutes = require("../routes/excess");
const restockRoutes = require("../routes/restock");
const pairRoutes = require("../routes/pair");
const menuRoutes = require("../routes/menuManager");

app.get("/", (req, res) => {
    res.send("RevPOS Application: Pinging Test to Server");
});

// Initialize Routes
app.use("/api/", authRoutes);
app.use("/api/v1/pos", posRoutes);
// app.use("/api/v1/menu", posRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/revenue", revenueRoutes);
app.use("/api/v1/excess", excessRoutes);
app.use("/api/v1/restock", restockRoutes);
app.use("/api/v1/pair", pairRoutes);
app.use("/api/v1/menuManager", menuRoutes);

app.listen(port, () => console.log(`Server Started on Port ${port}`));
