const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new mongoose.Schema({
  pin: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  endDate: Date,
  duration: String,
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
