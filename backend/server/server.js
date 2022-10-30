const express = require("express");
const posRoutes = require("../../frontend/src/POS/routes");
const app = express();
const port = 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("test");
});

//FOR FIXING CORS ERROR IN REACT
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
//end

app.use("/api/v1/pos", posRoutes);


app.listen(port, () => console.log(`app listening on port ${port}`));

