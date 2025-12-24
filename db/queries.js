
const pool = require("./pool"); 

async function getAllCategories() {
    try{
        const { rows } = await pool.query("SELECT * FROM categories");
        console.log("categories ", rows);
        return rows;
    } catch(err){
        console.error(err)
    }
};

async function getAllAmmunitions() {
    try{
        const { rows } = await pool.query("SELECT * FROM ammunitions");
        console.log("ammunitions ", rows);
        return rows;
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
    ON ammunitions.id = products.ammunition_id
    ORDER BY id ASC;
    `;
    try{
        const { rows } = await pool.query(SQL);
        console.log("products ", rows);
        return rows;
    } catch(err){
        console.error(err)
    }
};

async function createProduct(productObj) {
    const {
        model, 
        price,
        quantity, 
        category_by_name, 
        ammunition_by_name
    } = productObj; 
    const category_id = await getId("categories", "category", category_by_name); 
    const ammunition_id = await getId("ammunitions", "ammunition", ammunition_by_name);

    const SQL = `
    INSERT INTO products (model, price, quantity, category_id, ammunition_id)
    VALUES 
      ($1, $2, $3, $4, $5);
    `; 
    await pool.query(SQL, [model, price, quantity, category_id, ammunition_id]); 
    console.log(`${model} added!`); 
};

async function updateProduct(productObj, id) {
    const {
        model, 
        price,
        quantity, 
        category_by_name, 
        ammunition_by_name
    } = productObj; 

    const category_id = await getId("categories", "category", category_by_name); 
    const ammunition_id = await getId("ammunitions", "ammunition", ammunition_by_name);

    const SQL = `
    UPDATE products
    SET model = $1, 
        price = $2, 
        quantity = $3, 
        category_id = $4, 
        ammunition_id = $5
    WHERE id = $6;
    `; 

    await pool.query(SQL, [model, price, quantity, category_id, ammunition_id, id]); 
    console.log(`${model} updated!`);
};

async function getId(table, column, value) {
    const SQL =  `
    SELECT id FROM ${table}
    WHERE ${column} = '${value}'
    `
    const { rows } = await pool.query(SQL); 
    return rows[0].id;
};

async function getProduct(id) {
    const SQL =  `
    SELECT products.id, products.model, products.price, products.quantity, categories.category, ammunitions.ammunition 
    FROM products
    INNER JOIN categories
    ON categories.id = products.category_id
    INNER JOIN ammunitions
    ON ammunitions.id = products.ammunition_id
    WHERE products.id = ${id};
    `; 
    const { rows } = await pool.query(SQL); 
    return rows[0];
};

async function deleteProduct(id) {
    const SQL = `
    DELETE FROM products
    WHERE id = $1
    `; 
    await pool.query(SQL, [id]); 
}; 

async function searchProducts(query) {
    const SQL = `
    SELECT products.id, products.model, products.price, products.quantity, categories.category, ammunitions.ammunition 
    FROM products
    INNER JOIN categories
    ON categories.id = products.category_id
    INNER JOIN ammunitions
    ON ammunitions.id = products.ammunition_id
    WHERE products.model LIKE '%${query}%'
    ORDER BY id ASC;
    `;
    try{
        const { rows } = await pool.query(SQL);
        console.log("products ", rows);
        return rows;
    } catch(err){
        console.error(err)
    }
}; 

async function getAllProductsByCategory(categoryQuery){
    const SQL = `
    SELECT products.id, products.model, products.price, products.quantity, categories.category, ammunitions.ammunition 
    FROM products
    INNER JOIN categories
    ON categories.id = products.category_id
    INNER JOIN ammunitions
    ON ammunitions.id = products.ammunition_id
    WHERE categories.category = '${categoryQuery}'
    ORDER BY id ASC;
    `;
    try{
        const { rows } = await pool.query(SQL);
        console.log("products ", rows);
        return rows;
    } catch(err){
        console.error(err)
    }
}


module.exports = {
    getAllCategories, 
    getAllAmmunitions, 
    getAllProducts, 
    createProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct, 
    searchProducts, 
    getAllProductsByCategory
};

