const pool = require('./config/db');

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);
`;

pool.query(createUsersTable, (err, result) => {
    if (err) {
        console.error('❌ Error creating users table:', err);
    } else {
        console.log('✅ Users table ensured (created if not exists).');
    }
    //pool.end(); // close connection--->while Deploying or Running in production, comment this line to close the connection it need not be closed`
});
