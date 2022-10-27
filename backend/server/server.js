const express = require("express");
const posRoutes = require("../../frontend/src/POS/routes");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("test");
});

app.use("/api/v1/pos", posRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));