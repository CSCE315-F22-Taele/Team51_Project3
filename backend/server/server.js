const express = require("express");
const posRoutes = require("../routes/menu");
const inventoryRoutes = require("../routes/inventory");
const app = express();
const port = 3001;

app.use(express.json());

// FOR FIXING CORS ERROR IN REACT
const cors=require("cors");
const { application } = require("express");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

app.get("/", (req, res) => {
    res.send("RevPOS Application: Pinging Test to Server");
});

app.use("/api/v1/pos", posRoutes);
app.use("/api/v1/inventory", inventoryRoutes);


app.listen(port, () => console.log(`Server Started on Port ${port}`));

