const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,       // Replace with actual values for local testing
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,  // Optional
    ssl: {
        rejectUnauthorized: false     // Needed for services like PlanetScale
    }
});

module.exports = pool;