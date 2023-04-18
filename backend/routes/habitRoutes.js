const express = require('express');
const router = express.Router();
const {addHabit} = require('../controllers/habitController');
const {protect} = require('../middleware/authMiddleware');

router.post('/add', protect, addHabit);

module.exports = router;