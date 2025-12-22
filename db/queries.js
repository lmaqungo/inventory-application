
const pool = require("./pool"); 

async function getAllCategories() {
    try{
        const { rows } = await pool.query("SELECT * FROM categories");
        console.log("categories ", rows);
    } catch(err){
        console.error(err)
    }
};

async function getAllAmmunitions() {
    try{
        const { rows } = await pool.query("SELECT * FROM ammunitions");
        console.log("ammunitions ", rows);
    } catch(err){
        console.error(err)
    }
};

async function getAllProducts() {
    const SQL = `
    SELECT products.id, products.model, products.price, products.quantity, categories.category, ammunitions.ammunition 
    FROM products
    INNER JOIN categories
    ON categories.id = products.category_id
    INNER JOIN ammunitions
    ON ammunitions.id = products.ammunition_id;
    `;
    try{
        const { rows } = await pool.query(SQL);
        console.log("products ", rows);
    } catch(err){
        console.error(err)
    }
};

module.exports = {
    getAllCategories,
    getAllAmmunitions,
    getAllProducts
};