const Pool = require("pg").Pool;

const pool = new Pool({
    database: "csce331_904_51",
    user: "csce331_904_will",
    password: "tamuWILL24(!)",
    host: "csce-315-db.engr.tamu.edu",
    port: 5432,
    
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


module.exports = pool;