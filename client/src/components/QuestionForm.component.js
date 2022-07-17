import React from "react";
import styles from "../componentsStyles/QuestionForm.module.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

const QuestionForm = () => {
  let history = useHistory();
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
      email: localStorage.getItem("email"),
    };
    const response = await fetch("http://localhost:5000/api/test/addtest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(obj),
    });
    history.push("/dashboard");
  }
  return (
    <div className={styles.form}>
      <div class="container">
        <div class="row justify-content">
          <div class= "col-md-6 text-center"> <h1>Add Test</h1> </div>
        </div>
       
      <div class="row">
        <div class="col-md-3">
        <div className={styles.form_control}>
          <label>
            
          <div className={styles.Labels}>Last Date of Submition:</div>
          </label>
          <input
            type="date"
            name=""
            value={endDate}
            onChange={(e) => {
              setendDate(e.target.value);
            }}
            className={styles.inputDate}
          />
          </div>
          
          </div>
        
        <div class="col-md-3">
        

        <div className={styles.form_control}>
          {/* <label>
          Duration</label> */}
          <label>
          <div className={styles.Labels}>Duration:</div>
          </label>
          <input
            type="number"
            name=""
            value={duration}
            onChange={(e) => {
              setduration(e.target.value);
            }}
            className={styles.duration}
            placeholder="00"
          />
        </div>
        </div>
        
      </div>
      </div>
      
      <div className={styles.questionSlot}>
        <h3>Questions</h3>
        {questions.map((ele, id) => {
          return (
            <div className={styles.form_control}>
              <input
                onChange={(e) => {
                  addQuestion(id, e.target.value);
                }}
                type="text"
                placeholder="Question Description"
                value={ele.question}
                className={styles.ques}
              />
              {/* </div>*/}
               <div className={styles.options}> 

              {ele.options.map((element, index) => {
                return (
                  <div className={styles.option}>
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
              </div>
              <select
                onChange={(e) => {
                  answer(e.target.value, id);
                }}
              >
                <option value="4">Choose correct option</option>
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
const labels = document.querySelectorAll(".form-control label");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay: ${idx * 50}ms">${letter}</span>`
    )
    .join("");
});
export default QuestionForm;
