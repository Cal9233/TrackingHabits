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
            required: [true, 'Please enter title of Habit']
        },
        status: {
            type: String,
            required: true,
            enum: ['Complete', 'Incomplete'],
            default: 'Incomplete'
        }
    },
    {
        timestamp: true,
    }
);

module.exports = mongoose.model('Habit', habitSchema);