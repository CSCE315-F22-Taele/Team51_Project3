const dotenv = require("dotenv").config({ path: "../.env" });
const Pool = require("pg").Pool;

const pool = new Pool({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: 5432,
    
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


module.exports = pool;
