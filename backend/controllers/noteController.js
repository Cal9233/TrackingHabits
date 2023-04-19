const asyncHandler = require('express-async-handler');

const Note = require('../models/noteModel');
const Habit = require('../models/habitModel');

// @desc    Get notes for a habit
// @route   GET /api/habits/:habitId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.habitId)

  if (habit.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ habit: req.params.habitId })

  res.status(200).json(notes)
})

// @desc    Create habit note
// @route   POST /api/habits/:habitId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const habit = await Habit.findById(req.params.habitId)

  if (habit.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    text: req.body.text,
    habit: req.params.habitId,
    user: req.user.id,
  });
  console.log(note);

  res.status(200).json(note)
})

module.exports = {
  getNotes,
  addNote,
}