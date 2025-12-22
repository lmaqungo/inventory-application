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

const guns = [
    {
        model: 'Glock 17', 
        price: '15000', 
        quantity: '12', 
        category: 'handgun', 
        ammunition: '9mm'
    }, 
    {
        model: 'AR 15', 
        price: '27000', 
        quantity: '14', 
        category: 'semi automatic rifle', 
        ammunition: '5.56x45mm'
    }, 
    {
        model: 'Beretta m9', 
        price: '19000', 
        quantity: '12', 
        category: 'handgun', 
        ammunition: '9mm'
    }, 
];

app.get("/", (req, res) => {
    res.render("index", {
        title: 'Home', 
        guns: guns
    });
});

app.get("/new", (req, res)=> {
    res.render("createNewProduct", {
        title: 'Create New Product'
    })
}); 

app.post("/new", (req, res)=> {
    const { model, price, quantity, category, ammunition } = req.body; 
    guns.push({ 
        model, 
        price,
        quantity,
        category, 
        ammunition
     }); 
     res.redirect("/");

});

app.listen(port, (error)=> {
    if(error){
        throw error;
    }
    console.log(`mini message board, listening on port ${port}`)
});