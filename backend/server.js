const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const users = require('./routes/userRoutes');
const { errorHandler }= require('./middleware/errorMiddleware');

//Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello'});
});
app.use('/api/users', users);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server starts on ${PORT}`));