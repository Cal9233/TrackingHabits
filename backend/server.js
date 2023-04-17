const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express();
const users = require('./routes/userRoutes');

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello'});
});
app.use('/api/users', users);

app.listen(PORT, () => console.log(`Server starts on ${PORT}`));