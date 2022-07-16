const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/QuizzApp",{ useNewUrlParser: true, useUnifiedTopology: true  })
.then(()=>console.log("connection successful....."))
.catch((err)=>console.log(err));

const adminSchema = new mongoose.Schema({
   name: String,
   email: String,
   pass: String,
   quizzDetails: [{
    testId: Number,
    status: Boolean

   }]
})

const userSchema = new mongoose.Schema({
   name: String,
   email: String,

   quizzes: [{
    testId: Number,
    marks: Number,
   }]
})

const testSchema = new mongoose.Schema({
    // testId: Number,
    // startTime: Date,
     endDate: Date,
    duration: Number,
    //response_code: Number,
   // adminId: Number,
   // users: Number,
    questions: [{
        options: Array,
        question: String,
        correct_answer: String,
        incorrect_answers: Array
    }]
})

function insertTest(endDate,duration,questions){
    newTest= new testSchema({
        
    endDate: endDate,
    duration: duration,
    question: questions
    })
    newTest.save();
}




