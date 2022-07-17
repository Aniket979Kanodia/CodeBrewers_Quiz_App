import React, { useState } from "react";
import axios from "axios";
import styles from "../componentsStyles/LoginRegister.module.css";
import { useHistory } from "react-router-dom";
import Logo from "../images/TallyLogo.png";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  if (localStorage.getItem("auth-token")) history.push("/dashboard");

  const onSubmit = (event) => {
    event.preventDefault();

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "http://localhost:5000/api/user/login",
        { email, password },
        options
      )
      .then((res) => {
        localStorage.setItem("loggedin", true);
        localStorage.setItem("auth-token", res.headers["auth-token"]);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("email", email);
        props.setloggedin(true);
        history.push("/dashboard");
      })
      .catch((err) => {
        alert("Wrong Credentials!");
      });
  };

  return (
    <div className={styles.parent}>
      <div className={styles.child}>
        <img src={Logo} className={styles.logoImg} alt="papu" />
        <form onSubmit={onSubmit}>
          <label className={styles.labels} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.inputs}
            id="email"
            name="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className={styles.labels} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.inputs}
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className={styles.buttons}>
            Login
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}

export default Login;
