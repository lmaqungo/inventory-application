const express = require("express"); 
const app = express();
const path = require("node:path"); 
const productsRouter = require("./routes/productsRouter");
const port = 3000; 

const assetsPath = path.join(__dirname, "public"); 
app.use(express.static(assetsPath)); 

app.use(express.urlencoded({ extended: true })); 

app.set("views", path.join(__dirname, "views"));  
app.set("view engine", "ejs"); 

app.use("/", productsRouter);

app.listen(port, (error)=> {
    if(error){
        throw error;
    }
    console.log(`inventory application, listening on port ${port}`)
});