import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useContext } from "react";
import "../componentsStyles/TestWindow.component.css";

const TestWindow = () => {
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
      setScore(score + 1);
    }
    console.log(score);
  };
  async function collect() {
    const res = await Axios.post("http://localhost:5000/api/test/nakul", {
      pin: "47373420000",
    });

    setQuestions(res.data.questions);
    console.log(res.data.questions);
  }
  collect();

  return (
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
  );
};

export default TestWindow;
