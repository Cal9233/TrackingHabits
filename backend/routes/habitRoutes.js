const express = require('express');
const router = express.Router();
const {getHabits, createHabit, getSingleHabit, updateSingleHabit, deleteSingleHabit} = require('../controllers/habitController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getHabits).post(protect, createHabit);
router.route('/:id').get(protect, getSingleHabit).put(protect, updateSingleHabit).delete(protect, deleteSingleHabit);

module.exports = router;