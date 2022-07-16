import React from "react";
import styles from "../componentsStyles/QuestionForm.module.css";
import { useState } from "react";
import Axios from "axios";

const QuestionForm = () => {
  const [duration, setduration] = useState("");
  const [endDate, setendDate] = useState("");
  const [num, setnum] = useState(0);
  const [questions, setquestion] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correct_answer: "ans",
      incorrect_answers: ["x", "x", "x"],
    },
  ]);
  function increase() {
    setquestion([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correct_answer: "ANS",
        incorrect_answers: ["x", "x", "x"],
      },
    ]);
  }
  function addQuestion(index, e) {
    const temp = [...questions];
    temp[index].question = e;
    setquestion(temp);
    // console.log(questions[index].question);
  }
  function optionSet(index, e, id) {
    const temp = [...questions];
    temp[index].options[id] = e;
    setquestion(temp);
  }
  function answer(e, id) {
    const temp = [...questions];
    temp[id].incorrect_answers = [];
    temp[id].correct_answer = temp[id].options[parseInt(e)];
    for (let i = 0; i < 4; i++) {
      if (i !== parseInt(e)) {
        temp[id].incorrect_answers.push(temp[id].options[i]);
      }
    }
    setquestion(temp);
  }
  function deletQuestion(index) {
    let temp = [];
    console.log(index);
    for (let i = 0; i < questions.length; i++) {
      if (i !== index) {
        temp = [...temp, questions[i]];
      }
    }
    setquestion(temp);
  }
  async function check() {
    console.log(endDate);
    console.log(duration);
    console.log(questions);
    let obj = {
      duration: duration,
      endDate: endDate,
      questions: questions,
    };
    const response = await fetch("http://localhost:5000/api/test/addtest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const res = await Axios.post("http://localhost:5000/api/test/nakul", {
      pin: "651311",
    });
  }
  return (
    <div>
      <div>
        <label>
          Last Date of Submition:
          <input
            type="date"
            name=""
            value={endDate}
            onChange={(e) => {
              setendDate(e.target.value);
            }}
          />
        </label>
        <label>
          Duration :
          <input
            type="text"
            name=""
            value={duration}
            onChange={(e) => {
              setduration(e.target.value);
            }}
          />
        </label>
      </div>
      <div className={styles.questionSlot}>
        {questions.map((ele, id) => {
          return (
            <div>
              <input
                onChange={(e) => {
                  addQuestion(id, e.target.value);
                }}
                type="text"
                placeholder="Question Description"
                value={ele.question}
              />
              <ul>
                {ele.options.map((element, index) => {
                  return (
                    <div>
                      <input
                        className={styles.optionTag}
                        onChange={(e) => {
                          optionSet(id, e.target.value, index);
                        }}
                        type="text"
                        placeholder={"option " + `${index + 1}`}
                        value={element}
                      />
                    </div>
                  );
                })}
              </ul>
              <select
                onChange={(e) => {
                  answer(e.target.value, id);
                }}
              >
                <option value="0">A</option>
                <option value="1">B</option>
                <option value="2">C</option>
                <option value="3">D</option>
              </select>
              <button
                onClick={() => {
                  deletQuestion(id);
                }}
              >
                Remove Question
              </button>
            </div>
          );
        })}
      </div>
      <button onClick={increase} className="add-button">
        Add questions
      </button>
      <button onClick={check}> Submit </button>
    </div>
  );
};

export default QuestionForm;
