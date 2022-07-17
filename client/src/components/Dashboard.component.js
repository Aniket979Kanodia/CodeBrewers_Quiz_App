import React, { useState, useEffect, Fragment } from "react";
import Test from "./TestElement.component";
import styles from "../componentsStyles/Dashboard.module.css";
import axios from "axios";
import Modal from "react-modal";
import modalstyles from "../componentsStyles/Modal.module.css";
import teststyles from "../componentsStyles/Testelement.module.css";
import { useHistory } from "react-router-dom";
import resultstyles from "../componentsStyles/TestResult.module.css";
function Dashboard() {
  let history = useHistory();
  if (!localStorage.getItem("auth-token")) {
    localStorage.clear();
    history.push("/");
  }
  const [tests, setTests] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [topic, settopic] = useState("");
  const [amount, setamount] = useState("");
  const [time, settime] = useState("");
  const [expiry, setexpiry] = useState(new Date());

  const options = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/test/gettests", {}, options)
      .then((res) => {
        setTests(res.data);
      })
      .catch((err) => {
        if (!localStorage.getItem("auth-token")) history.push("/");
        else alert("couldn't fetch please reload");
      });
  }, [modalIsOpen]);
  function addTest() {
    history.push("/addtest");
  }
  return (
    <React.Fragment>
      <div>
        <h1
          className={styles.heading}
          style={{ background: "white", fontSize: "2em", padding: "2%" }}
        >
          Welcome {localStorage.getItem("name")}
        </h1>
      </div>
      <div className={teststyles.parent}>
        <div className={resultstyles.row}>
          <div className={teststyles.element}>
            <strong>Pin</strong>
          </div>
          <div className={teststyles.element}>
            <strong>No. of Ques</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Time Duration (Mins)</strong>
          </div>
          <div className={teststyles.element}>
            <strong>Expiry</strong>
          </div>
        </div>
        <div className={styles.testcontainer}>
          {tests.map((test) => (
            <Test data={test} />
          ))}
        </div>
      </div>

      <button
        className={styles.buttons}
        style={{ float: "left", display: "block" }}
        onClick={addTest}
      >
        + Add Test
      </button>

      <br />
      <br />
      <br />
      <br />
      <br />
    </React.Fragment>
  );
}

export default Dashboard;
