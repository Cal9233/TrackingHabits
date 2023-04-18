const mongoose = require('mongoose');

const habitSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        task: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model('Habit', habitSchema);