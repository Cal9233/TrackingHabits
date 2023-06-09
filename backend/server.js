const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const users = require('./routes/userRoutes');
const habits = require('./routes/habitRoutes');
const { errorHandler }= require('./middleware/errorMiddleware');

//Connect to Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', users);
app.use('/api/habits', habits);

//serve FrontEnd
if(process.env.NODE_ENV === 'production'){
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to Habit Tracker API' })
  })
}
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server starts on ${PORT}`));