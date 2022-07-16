const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(morgan("tiny"));

const uri = "mongodb://localhost/test";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connection established successfully");
});

const userRouter = require("./routes/user");
const testRouter = require("./routes/test");
app.use("/api/user", userRouter);
app.use("/api/test", testRouter);

const testSchema = new mongoose.Schema({
  // testId: Number,
  // startTime: Date,
  endDate: Date,
  duration: Number,
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

app.use("/testing", async (req, res) => {
  console.log(req.body);
  const test = await testSchema.findOne({
    endDate: req.body.endDate,
    duration: req.body.duration,
    questions: req.body.questions,
  });
  if (test) {
    res.send("test already exists");
  } else {
    res.send("test not exists");
  }
});

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));

  app.all("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, console.log(`listing at port ${port}`));
