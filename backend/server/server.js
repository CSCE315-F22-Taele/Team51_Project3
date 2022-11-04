const dotenv = require("dotenv").config({ path: "../.env" });
const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

// Import Routes
const authRoutes = require("../routes/auth");
const posRoutes = require("../routes/menu");
const inventoryRoutes = require("../routes/inventory");
const revenueRoutes = require("../routes/revenue");

// FOR FIXING CORS ERROR IN REACT
const cors = require("cors");
const { application } = require("express");
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("RevPOS Application: Pinging Test to Server");
});

// Initialize Routes
app.use("/api/", authRoutes);
app.use("/api/v1/pos", posRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/revenue", revenueRoutes);

app.listen(port, () => console.log(`Server Started on Port ${port}`));
