const { dbURL, NODE_ENV } = require("./selectdb");
const { Client } = require("pg"); 


const categoriesSQL = `
CREATE TABLE IF NOT EXISTS categories(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  category TEXT
);

INSERT INTO categories (category)
VALUES 
  ('handgun'), 
  ('semi automatic rifle'), 
  ('rifle'), 
  ('shotgun');
`;

const ammunitionsSQL = `
CREATE TABLE IF NOT EXISTS ammunitions(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  ammunition TEXT
);  

INSERT INTO ammunitions (ammunition)
VALUES 
  ('9mm'),
  ('.45 ACP'),
  ('5.56x45mm'),
  ('7.62x39mm'),
  ('.308 Winchester'),
  ('12ga');
`; 

const productsSQL = `
CREATE TABLE IF NOT EXISTS products(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  model TEXT, 
  price INTEGER, 
  quantity INTEGER, 
  category_id INTEGER, 
  ammunition_id INTEGER 
); 

INSERT INTO products (model, price, quantity, category_id, ammunition_id)
VALUES 
  ('Glock 17', 15000, 12, 1, 1), 
  ('AR 15', 27000, 14, 2, 3), 
  ('Beretta m9', 19000, 12, 1, 1);
`; 

async function main(table, sql) {
  console.log(`seeding ${table} in ${NODE_ENV} database ...`);

  const client = new Client({
    connectionString: dbURL,
  });  

  await client.connect();  
  await client.query(sql);  
  console.log(`${table} table created`)
  await client.end();  
  console.log("done");  
};

main("products", productsSQL);