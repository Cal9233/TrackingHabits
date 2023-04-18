const asyncHandler = require('express-async-handler');
const Habit = require('../models/habitModel');

//@Desc  Create Habit
//@Route  /api/habit/add
//@Access  Public 
const addHabit = asyncHandler(async(req, res) => {
    const {task, completed} = req.body;
    if(!task || !completed){
        res.status(400);
        throw new Error('Fields are empty');
    }
    const habit = await Habit.create({
        task,
        completed,
        user: req.user.id
    });

    res.status(201).json(habit);
});


module.exports = {addHabit};