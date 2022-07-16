import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import QuestionForm from "./components/QuestionForm.component";

ReactDOM.render(
  <BrowserRouter>
    {/* <App /> */}
    <QuestionForm />
  </BrowserRouter>,
  document.getElementById("root")
);
