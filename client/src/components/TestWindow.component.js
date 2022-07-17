import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useContext } from "react";
import "../componentsStyles/TestWindow.component.css";
import { useHistory } from "react-router-dom";
import Timer from "./Timer.component.js";

const TestWindow = () => {
  let history = useHistory();
  const [Questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const chooseOption = (option) => {
    setOptionChosen(option);
  };
  const nextQuestion = () => {
    if (Questions[currentQuestion].correct_answer == optionChosen) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };
  const prevQuestion = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
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
    history.push("/");
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
        setDuration(parseInt(res.data.duration));
      } else {
        alert("error");
        history.push("/");
      }
    }
    collect();
  }, []);

  const handleClick1 = () => {
    setIsActive1((current) => !current);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive4(false);
  };
  const handleClick2 = () => {
    setIsActive2((current) => !current);
    setIsActive1(false);
    setIsActive3(false);
    setIsActive4(false);
  };
  const handleClick3 = () => {
    setIsActive3((current) => !current);
    setIsActive1(false);
    setIsActive2(false);
    setIsActive4(false);
  };
  const handleClick4 = () => {
    setIsActive4((current) => !current);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive1(false);
  };
  const handleClickAll = () => {
    setIsActive4(false);
    setIsActive2(false);
    setIsActive3(false);
    setIsActive1(false);
  };
  if (Questions.length === 0 || duration === 0) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="mainBack">
      <div>
        <Timer mins={duration} sec={0} />
      </div>
      <div className="Quiz">
        <h1>{Questions[currentQuestion].question}</h1>
        <div className="lata">
          <button
            style={{
              backgroundColor: isActive1 ? "limegreen" : "",
              color: isActive1 ? "white" : "",
            }}
            onClick={() => {
              chooseOption(Questions[currentQuestion].options[0]);
              handleClick1();
            }}
          >
            {Questions[currentQuestion].options[0]}
          </button>
          <button
            style={{
              backgroundColor: isActive2 ? "limegreen" : "",
              color: isActive2 ? "white" : "",
            }}
            onClick={() => {
              chooseOption(Questions[currentQuestion].options[1]);
              handleClick2();
            }}
          >
            {Questions[currentQuestion].options[1]}
          </button>
          <button
            style={{
              backgroundColor: isActive3 ? "limegreen" : "",
              color: isActive3 ? "white" : "",
            }}
            onClick={() => {
              chooseOption(Questions[currentQuestion].options[2]);
              handleClick3();
            }}
          >
            {Questions[currentQuestion].options[2]}
          </button>
          <button
            style={{
              backgroundColor: isActive4 ? "limegreen" : "",
              color: isActive4 ? "white" : "",
            }}
            onClick={() => {
              chooseOption(Questions[currentQuestion].options[3]);
              handleClick4();
            }}
          >
            {Questions[currentQuestion].options[3]}
          </button>
        </div>
        <div className="button-div">
          <button onClick={prevQuestion} className="prev-btn">
            Prev Question
          </button>
          {currentQuestion == Questions.length - 1 ? (
            <button onClick={finishQuiz} id="nextQuestion">
              Finish Quiz
            </button>
          ) : (
            <button
              onClick={() => {
                nextQuestion();
                handleClickAll();
              }}
              id="nextQuestion"
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestWindow;
