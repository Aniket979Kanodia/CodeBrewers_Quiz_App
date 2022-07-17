import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import teststyles from "../componentsStyles/Testelement.module.css";
import axios from "axios";
import Resultelement from "./ResultElement.component";
import styles from "../componentsStyles/Dashboard.module.css";
import resultstyles from "../componentsStyles/TestResult.module.css";

function Testresult(props) {
  console.log(props.location.state.data);
  let history = useHistory();

  const [result, setresult] = useState([]);
  let expiry = new Date(props.location.state.data.endDate);

  useEffect(() => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .post(
        "http://localhost:5000/api/test/getresults",
        { pin: props.location.state.data.pin },
        options
      )
      .then((res) => setresult(res.data))
      .catch((err) => {
        alert("Couldn't Fetch!");
        history.push("/dashboard");
      });
  }, []);
  return (
    <Fragment>
      <button
        className={styles.buttons}
        style={{ float: "left", display: "block" }}
        onClick={() => history.goBack()}
      >
        &lt;- Back
      </button>
      <br />
      <br />
      <br />
      <br />
      <div className={teststyles.container}>
        <div className={resultstyles.info}>
          <h1 style={{ textAlign: "center" }}> About Test</h1>
          <strong>Pin: </strong> {props.location.state.data.pin}
          <br />
          <strong>No. of Ques: </strong>{" "}
          {props.location.state.data.questions.length}
          <br />
          <strong>Time Duration: </strong> {props.location.state.data.duration}{" "}
          <br />
          <strong>Expiry: </strong> {expiry.getDate()}-{expiry.getMonth()}-
          {expiry.getFullYear()}
          <br />
        </div>
        <div className={resultstyles.parent}>
          <div className={resultstyles.resultrow}>
            <div className={teststyles.element}>
              <strong>Name</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Email</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Score</strong>
            </div>
          </div>
          {result.length === 0 ? (
            <div className={resultstyles.resultrow}>
              <div
                className={teststyles.element}
                style={{ gridColumnStart: "2" }}
              >
                No result found!
              </div>
            </div>
          ) : (
            result.map((obj) => <Resultelement key={obj._id} {...obj} />)
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Testresult;
