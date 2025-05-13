const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,  // max connections in pool
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejscrud'
});

module.exports = pool;