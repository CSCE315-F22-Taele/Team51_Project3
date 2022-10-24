const Pool = require("pg").Pool;

const pool = new Pool({
    user: "",
    password: "",
    host: "csce-315-db.engr.tamu.edu",
    port: 5432,
    database: "csce331_904_51"

});

module.exports = pool;