const { dbURL, NODE_ENV } = require("./selectdb");
const { Client } = require("pg"); 


const categoriesSQL = `
CREATE TABLE IF NOT EXISTS categories(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  category TEXT
);

INSERT INTO categories (category)
VALUES 
  ('pistol'), 
  ('assault rifle'), 
  ('long rifle'), 
  ('shotgun'), 
  ('submachine');
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
  ('12ga'),
  ('7.62x51mm');
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
  ('Heckler & Koch HK416', 27000, 14, 2, 3), 
  ('M16', 27000, 14, 2, 3), 
  ('Colt M1911', 17000, 10, 1, 2), 
  ('Glock 19', 19000, 100, 1, 1),
  ('Sig Sauer M17', 18900, 250, 1, 1),
  ('M4 Carbine', 34000, 124, 2, 3), 
  ('Mossberg 500', 23000, 200, 4, 6), 
  ('Heckler & Koch HKMP5', 26000, 100, 5, 1), 
  ('Remington 870', 31000, 240, 4, 6),
  ('Beretta m9', 19000, 12, 1, 1), 
  ('Barrett Mk22', 120000, 5, 3, 7),
  ('FN Scar', 47000, 25, 2, 7), 
  ('AK 47', 35000, 10000, 2, 4), 
  ('Benelli M4', 32500, 145, 4, 6),
  ('Remington 700', 84000, 5, 3, 5), 
  ('SVD Dragunov', 69000, 600, 3, 7); 
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

main("categories", categoriesSQL);
main("ammunitions", ammunitionsSQL);
main("products", productsSQL);