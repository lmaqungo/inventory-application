const { Client } = require("pg"); 
const { dbURL, NODE_ENV } = require("./selectdb"); 

async function main(table) {
    const SQL = `DROP TABLE IF EXISTS ${table};`;
    console.log(`deleting ${table} table from ${NODE_ENV} database ...`); 
    const client = new Client({
        connectionString: dbURL
    }); 
    await client.connect(); 
    await client.query(SQL); 
    await client.end(); 
    console.log(`done`); 
};

main("products"); 