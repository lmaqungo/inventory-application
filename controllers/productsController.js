const db = require("../db/queries"); 

const { body, validationResult, matchedData } = require("express-validator"); 

const passwordError = 'Incorrect password';
const PASSWORD = 'admin';

const validatePassword = [
    body("password").trim()
    .equals(PASSWORD).withMessage(passwordError)
];

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
        categories: categories, 
    })
};

async function createProduct(req, res) {
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        const categories = await db.getAllCategories(); 
        const ammunitions = await db.getAllAmmunitions(); 
        return res.status(400).render("createNewProduct", {
            title: 'Create New Product',  
            ammunitions: ammunitions,  
            categories: categories, 
            errors: errors.array()
        });   
    }
    const { model, price, quantity, category, ammunition} = req.body; 
    console.log(model, price, quantity, category, ammunition);
    await db.createProduct({
        model, 
        price,
        quantity, 
        category_by_name: category, 
        ammunition_by_name: ammunition
    }); 
    res.redirect("/");
};

const createProductPost = [
    validatePassword, 
    createProduct
]; 

async function getProduct(req, res) {
    const { productId } = req.params;
    const product = await db.getProduct(productId);
    res.render("showProduct", {
        title: 'Product page',
        product
    })
};

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
};

async function updateProduct(req, res) {
    const errors = validationResult(req); 
    const { productId } = req.params;
    if(!errors.isEmpty()) {
        const product = await db.getProduct(productId);
        const categories = await db.getAllCategories();
        const ammunitions = await db.getAllAmmunitions();
        return res.status(400).render("updateProduct", {
            title: 'update product',
            product, 
            ammunitions,
            categories, 
            errors: errors.array()
        });
    }
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
};

const updateProductPost = [
    validatePassword, 
    updateProduct
]

async function deleteProduct(req, res) {
    const { productId } = req.params; 
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        const product = await db.getProduct(productId);
        return res.status(400).render("showProduct", {
            title: 'Product page',
            product, 
            errors: errors.array()
        })
    }
    await db.deleteProduct(productId); 
    res.redirect("/");
    // make an sql query to delete the row with the id
}; 

const deleteProductPost = [
    validatePassword, 
    deleteProduct
];

async function searchProductsGet(req, res){
    const { searchQuery } = req.query;
    const categories = await db.getAllCategories();
    const products = await db.searchProducts(searchQuery);
    res.render("index", {
        title: 'Home', 
        products: products, 
        categories: categories
    }); 
};

async function getAllProductsByCategoryGet(req, res) {
    const { categoryQuery } = req.query;  
    const categories = await db.getAllCategories();  
    let products;
    if(categoryQuery) {
        products = await db.getAllProductsByCategory(categoryQuery);
    } else {
        products = await db.getAllProducts();
    } 
    res.render("index", {
        title: 'Home', 
        products: products, 
        categories: categories
    });  
};

module.exports = {
    getAllProducts, 
    createProductGet, 
    createProductPost, 
    getProduct, 
    updateProductGet, 
    updateProductPost, 
    deleteProductPost, 
    searchProductsGet, 
    getAllProductsByCategoryGet
};