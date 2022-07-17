import React from "react";
import { Fragment } from "react";
import { Link, Route } from "react-router-dom";
import styles from "../componentsStyles/Testelement.module.css";

function Testelement(props) {
  let expiry = props.data.endDate;
  let date = new Date(expiry);
  console.log(props);
  return (
    <Fragment>
      <Link
        to={{ pathname: "/abouttest", state: { ...props } }}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={styles.row}>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Pin : </strong>
            </span>
            {props.data.pin}
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>No. of Ques : </strong>
            </span>
            {props.data.questions.length}
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Time Duration (Mins) : </strong>
            </span>
            {props.data.duration} mins
          </div>
          <div className={styles.element}>
            <span className={styles.mobileinfo}>
              <strong>Expiry : </strong>
            </span>
            {date.toDateString()}
          </div>
        </div>
      </Link>
    </Fragment>
  );
}

export default Testelement;
