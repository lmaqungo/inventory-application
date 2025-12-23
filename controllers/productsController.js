const db = require("../db/queries"); 

async function getAllProducts(req, res) {
    const categories = await db.getAllCategories();
    const products = await db.getAllProducts();
    res.render("index", {
        title: 'Home', 
        products: products, 
        categories: categories
    });
};

async function createProductGet(req, res) {
    const categories = await db.getAllCategories();
    const ammunitions = await db.getAllAmmunitions();
    res.render("createNewProduct", {
        title: 'Create New Product', 
        ammunitions: ammunitions,
        categories: categories
    })
};

async function createProductPost(req, res) {
    const { model, price, quantity, category, ammunition } = req.body;  
    await db.createProduct({
        model, 
        price,
        quantity, 
        category_by_name: category, 
        ammunition_by_name: ammunition
    })
    res.redirect("/");
};

async function getProduct(req, res) {
    const { productId } = req.params;
    const product = await db.getProduct(productId);
    res.render("showProduct", {
        title: 'Product page',
        product
    })
}

async function updateProductGet(req, res) {
    const { productId } = req.params;
    const product = await db.getProduct(productId);
    const categories = await db.getAllCategories();
    const ammunitions = await db.getAllAmmunitions();
    res.render("updateProduct", {
        title: 'update product',
        product, 
        ammunitions,
        categories
    });
    /* load update form, query the database to get the product, like the function above, 
    so that the form has the 'value' attributes prepopulated
    */
}

async function updateProductPost(req, res) {
    const { productId } = req.params; 
    console.log("product id after sending post request: ", productId);
    const { model, price, quantity, category, ammunition } = req.body; 
    await db.updateProduct({
        model, 
        price,  
        quantity,  
        category_by_name: category, 
        ammunition_by_name: ammunition  
    }, productId); 
    res.redirect("/");
    // make the sql query to update the row, then redirect
}

async function deleteProductPost(req, res) {
    return
    // make an sql query to delete the row with the id
}

module.exports = {
    getAllProducts, 
    createProductGet, 
    createProductPost, 
    getProduct, 
    updateProductGet, 
    updateProductPost, 
    deleteProductPost
};