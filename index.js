require('dotenv').config();
require('./init.js');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT ;
console.log("PORt",PORT)
const app = express();


app.use(bodyParser.json());
app.use('/users', userRoutes);

app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({ message: 'Internal server error', error: err });
  });

app.get('/', (req, res) => {
    res.send('Welcome to the User Management API');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    
});
