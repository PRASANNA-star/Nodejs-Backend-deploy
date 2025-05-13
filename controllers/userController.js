const User = require('../models/userModel');
const { generateToken } = require('../utils/jwt');

exports.createUser = (req, res) => {
    const { name, email } = req.body;

    User.findByEmail(email, (err, users) => {
        if (users.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        User.create({ name, email }, (err, result) => {
            if (err) return res.status(500).json({ message: 'Failed to create user', err });

            const newUser = { id: result.insertId, email };
            const token = generateToken(newUser);
            res.status(201).json({ message: 'User created', token });
        });
    });
};

exports.login = (req, res) => {
    const { email } = req.body;

    User.findByEmail(email, (err, users) => {
        if (err || users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const token = generateToken(user);
        res.json({ message: 'Login successful', token });
    });
};

exports.getAllUsers = (req, res) => {
    User.getAll((err, users) => {
        if (err) return res.status(500).json({ message: 'Error fetching users' });
        res.json(users);
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;

    User.getById(id, (err, users) => {
        if (err || users.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(users[0]);
    });
};

exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;

    User.update(id, { name, email }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Failed to update user' });
        res.json({ message: 'User updated' });
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.delete(id, (err) => {
        if (err) return res.status(500).json({ message: 'Failed to delete user' });
        res.json({ message: 'User deleted' });
    });
};
