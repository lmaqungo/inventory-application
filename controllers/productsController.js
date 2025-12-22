const db = require("../db/queries"); 


async function getAllProducts(req, res) {
    const products = await db.getAllProducts(); 
    res.render("index", {
        title: 'Home', 
        products: products
    });
}

async function createProductGet(req, res) {
    res.render("createNewProduct", {
        title: 'Create New Product'
    })
}

async function createProductPost(req, res) {
    const { model, price, quantity, category, ammunition } = req.body; 
}

module.exports = {
    getAllProducts, 
    createProductGet, 
    createProductPost
}