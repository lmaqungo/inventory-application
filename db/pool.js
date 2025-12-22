
const { Pool } = require("pg"); 
const { dbURL } = require("./selectdb"); 

module.exports = new Pool({
    connectionString: dbURL
});