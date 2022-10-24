const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/revpos", async (req, res) => {
    try {
        const allIngredients = await pool.query("SELECT * FROM ingredients");
        res.json(allIngredients.rows);
    } catch (error) {
        console.error(err.message);
    }
})


app.listen(5000, () => {
    console.log("Server has started on Port 5000");
});