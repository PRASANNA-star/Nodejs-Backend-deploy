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

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    
});
