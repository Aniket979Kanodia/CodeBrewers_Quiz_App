const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new mongoose.Schema({
  //pin is primary key
  pin: {
    type: String,
    required: true,
    unique: true,
  },

  // testId: Number,
  // startTime: Date,
  endDate: Date,
  duration: String,
  //response_code: Number,
  // adminId: Number,
  // users: Number,
  questions: [
    {
      options: Array,
      question: String,
      correct_answer: String,
      incorrect_answers: Array,
    },
  ],
});

const test = mongoose.model("test", testSchema);

module.exports = test;
