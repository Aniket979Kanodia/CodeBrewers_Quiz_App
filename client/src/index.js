import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import QuestionForm from "./components/QuestionForm.component";
import TestWindow from "./components/TestWindow.component";

ReactDOM.render(
  <BrowserRouter>
    <App />
    {/* <TestWindow /> */}
    {/* <QuestionForm /> */}
  </BrowserRouter>,
  document.getElementById("root")
);
