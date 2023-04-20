const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Habit',
    },
    text: {
      type: String,
      required: [true, 'Please add some text'],
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Note', noteSchema)