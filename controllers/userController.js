const User = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  User.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send("User not found");
    res.json(results[0]);
  });
};

exports.createUser = (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    const newUser = { id: result.insertId, ...req.body };
    //const token = generateToken(newUser);
    // res.status(201).send({ user: newUser, token });
    res.status(201).send({"message": "User created successfully"});
  });
};

exports.updateUser = (req, res) => {
  User.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send("User not found");
    res.send("User updated successfully");
  });
};

exports.deleteUser = (req, res) => {
  User.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0)
      return res.status(404).send("User not found");
    res.send("User deleted successfully");
  });
};

exports.login = (req, res) => {
  const { email } = req.body;
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0)
      return res.status(401).send("Invalid credentials");
    const user = results[0];
    const token = generateToken(user);
    res.json({ message: "Login successful", token });
  });
};
