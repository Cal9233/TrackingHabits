const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Habit = require('../models/habitModel');

//@Desc  Post Habit
//@Route  /api/habits/
//@Access  Private 
const createHabit = asyncHandler(async(req, res) => {
    const {task, status} = req.body;
    if(!task || !status){
        res.status(400);
        throw new Error('Please fill out the fields');
    }
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }
    const habit = await Habit.create({
        task,
        status,
        user: req.user.id
    })
    res.status(201).json(habit);
});

//@Desc  Get Habits
//@Route  /api/habits/
//@Access  Private 
const getHabits = asyncHandler(async(req, res) => {
    //Get User using jwt id
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const habits = await Habit.find({user: req.user.id});
    res.status(200).json(habits);
});

//@Desc  Get Single Habit
//@Route  /api/habits/:id
//@Access  Private 
const getSingleHabit = asyncHandler(async(req, res) => {
    //Get User using jwt id
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const habit = await Habit.findById(req.params.id);
    if(!habit){
        res.status(400);
        throw new Error('Habit not found')
    }

    if(habit.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not authorized');
    }

    res.status(200).json(habit);
});

//@Desc  Put Single Habit
//@Route  /api/habits/:id
//@Access  Private 
const updateSingleHabit = asyncHandler(async(req, res) => {
    //Get User using jwt id
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const habit = await Habit.findById(req.params.id);
    if(!habit){
        res.status(400);
        throw new Error('Habit not found')
    }

    if(habit.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not authorized');
    }

    const updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(201).json(updatedHabit);
});

//@Desc  Delete Single Habit
//@Route  /api/habits/:id
//@Access  Private 
const deleteSingleHabit = asyncHandler(async(req, res) => {
    //Get User using jwt id
    const user = await User.findById(req.user.id);
    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const habit = await Habit.findById(req.params.id);
    if(!habit){
        res.status(400);
        throw new Error('Habit not found')
    }

    if(habit.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not authorized');
    }

    await Habit.findByIdAndDelete(habit.id);

    res.status(200).json({success: true});
});

module.exports = {createHabit, getHabits, getSingleHabit, updateSingleHabit, deleteSingleHabit};