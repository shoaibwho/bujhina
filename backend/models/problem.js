const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,  
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  payment: {
    type: Number,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  bids: [{
    teacher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Problem', problemSchema);
