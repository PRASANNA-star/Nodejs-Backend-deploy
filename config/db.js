const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: false // Set to false unless using PlanetScale or similar
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error connecting to DB:', err);
    } else {
        console.log('✅ Connected to MySQL DB');
        connection.release();
    }
});

module.exports = pool;
