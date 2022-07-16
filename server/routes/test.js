const router = require("express").Router();
const test = require("../models/test.model");
const result = require("../models/result.model");
const axios = require("axios");
const verify = require("./verifyToken");
const mongoose = require("mongoose");

router.route("/nakul").post(async (req, res) => {
  console.log(req.body);
  const temp = await test.findOne({ pin: req.body.pin }).exec();
  if (!temp) {
    return res.status(400).send({ message: "Test doesn't exist!" });
  }
  if (Date.parse(temp.expiry) < Date.now()) {
    return res.status(400).send({ message: "Test has expired!! " });
  }
  res.send({
    message: "Test exists",
    questions: temp.questions,
    duration: temp.duration,
    endDate: temp.endDate,
  });
});

router.route("/submittest").post(async (req, res) => {
  const score = parseInt(req.body.score);
  const email = req.body.email.toLowerCase();
  const name = req.body.name;
  const pin = req.body.pin;

  const resultEntry = new result({ email, name, pin, score });
  resultEntry
    .save()
    .then(() => res.send("result added!"))
    .catch((err) => res.status(400).json("error : " + err));
});

// router.use("/gettests", verify);
// router.use("/getresults", verify);
// router.use("/addtest", verify);

router.route("/gettests").post(async (req, res) => {
  const email = req.user.email;
  try {
    const doc = await test.find({ email }).sort("-created").exec();
    return res.send(doc);
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
});

router.route("/getresults").post(async (req, res) => {
  const pin = req.body.pin;
  try {
    const resultdoc = await result.find({ pin }).exec();
    return res.send(resultdoc);
  } catch (err) {
    return res.status(400).send();
  }
});

router.route("/addtest").post(async (req, res) => {
  var last = await test.find({}).sort("-pin").limit(1).exec();
  var pin = last[0].pin + 100000;

  try {
    var obj = {
      ...req.body,
      pin: pin,
    };
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
  return res.send("test added!");
});

module.exports = router;
