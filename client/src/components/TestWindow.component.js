import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useContext } from "react";
import "../componentsStyles/TestWindow.component.css";
import { useHistory } from "react-router-dom";

const TestWindow = () => {
  let history = useHistory();
  const [Questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [score, setScore] = useState(0);
  const chooseOption = (option) => {
    setOptionChosen(option);
  };
  const nextQuestion = () => {
    if (Questions[currentQuestion].correct_answer == optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const finishQuiz = () => {
    if (Questions[currentQuestion].correct_answer == optionChosen) {
      console.log(optionChosen);
      setScore(score + 1);
    }
    let obj = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      pin: localStorage.getItem("pin"),
      score: score,
    };
    Axios.post("http://localhost:5000/api/test/submittest", obj)
      .then((res) => {
        console.log(res);
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    async function collect() {
      let obj = {
        pin: localStorage.getItem("pin"),
        email: localStorage.getItem("email"),
        name: localStorage.getItem("name"),
      };
      let res = await Axios.post(
        "http://localhost:5000/api/test/getQuestions",
        obj
      );
      if (res.status === 200) {
        setQuestions(res.data.questions);
      } else {
        alert("error");
        history.push("/");
      }
    }
    collect();
  }, []);
  if (Questions.length === 0) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="mainBack">
      <div className="Quiz">
        <h1>{Questions[currentQuestion].question}</h1>
        <div className="lata">
          <button
            onClick={() => {
              chooseOption(Questions[currentQuestion].options[0]);
            }}
          >
            {Questions[currentQuestion].options[0]}
          </button>
          <button
            onClick={() => {
              chooseOption(Questions[currentQuestion].options[1]);
            }}
          >
            {Questions[currentQuestion].options[1]}
          </button>
          <button
            onClick={() => {
              chooseOption(Questions[currentQuestion].options[2]);
            }}
          >
            {Questions[currentQuestion].options[2]}
          </button>
          <button
            onClick={() => {
              chooseOption(Questions[currentQuestion].options[3]);
            }}
          >
            {Questions[currentQuestion].options[3]}
          </button>
        </div>

        {currentQuestion == Questions.length - 1 ? (
          <button onClick={finishQuiz} id="nextQuestion">
            Finish Quiz
          </button>
        ) : (
          <button onClick={nextQuestion} id="nextQuestion">
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default TestWindow;
