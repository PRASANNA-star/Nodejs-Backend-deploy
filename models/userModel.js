const db = require('../config/db');

const User = {
    getAll: (cb) => db.query('SELECT * FROM users', cb),
    getById: (id, cb) => db.query('SELECT * FROM users WHERE id = ?', [id], cb),
    findByEmail: (email, cb) => db.query('SELECT * FROM users WHERE email = ?', [email], cb),
    create: (data, cb) => db.query('INSERT INTO users (name, email) VALUES (?, ?)', [data.name, data.email], cb),
    update: (id, data, cb) => db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [data.name, data.email, id], cb),
    delete: (id, cb) => db.query('DELETE FROM users WHERE id = ?', [id], cb)
};

module.exports = User;
