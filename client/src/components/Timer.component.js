import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Timer(props) {
  const [allsecs, setallsecs] = useState(
    parseInt(props.mins) * 60 + parseInt(props.sec)
  );
  const [mins, setmins] = useState(parseInt(props.mins));
  const [secs, setsecs] = useState(parseInt(props.sec));
  const [helper, sethelper] = useState(0);
  let history = useHistory();

  const handle = () => {
    setallsecs(allsecs - 1);
    if (allsecs == 0) props.submithandler();
    else {
      let altmins = Math.floor(allsecs / 60).toString();
      if (altmins.length == 1) altmins = "0" + altmins;
      let altsecs = (allsecs % 60).toString();
      if (altsecs.length == 1) altsecs = "0" + altsecs;
      setmins(altmins);
      setsecs(altsecs);
    }
  };

  useEffect(() => {
    let altmins = Math.floor(allsecs / 60).toString();
    if (altmins.length == 1) altmins = "0" + altmins;
    let altsecs = (allsecs % 60).toString();
    if (altsecs.length == 1) altsecs = "0" + altsecs;
    setmins(altmins);
    setsecs(altsecs);
    // return () => {
    //   if (window.performance) {
    //     if (performance.navigation.type == 1) {
    //       alert("reloaded encountered, Submitting the test");
    //       props.submithandler();
    //     }
    //   }
    // };
  });

  useEffect(() => {
    sethelper(setInterval(handle, 1000));
    return () => {
      clearInterval(helper);
    };
  }, [allsecs]);

  return (
    <div
      style={{
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "140px",
        height: "70px",
        background: "rgb(162, 85, 249)",
      }}
    >
      <div
        style={{
          background: "rgb(162, 85, 249)",
          color: "white",
          // padding: "2% 2% 2% 2%",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{ marginTop: "0px", fontSize: "2.5em", marginBottom: "3px" }}
        >
          {mins}
        </h1>
      </div>
      <div
        style={{
          background: "rgb(162, 85, 249)",
          color: "white",
          borderRadius: "8px",
        }}
      >
        <h1
          style={{ marginTop: "0px", fontSize: "2.5em", marginBottom: "3px" }}
        >
          :
        </h1>
      </div>
      <div
        style={{
          background: "rgb(162, 85, 249)",
          color: "white",
          marginTop: "0px",
        }}
      >
        <h1
          style={{ marginTop: "0px", fontSize: "2.5em", marginBottom: "3px" }}
        >
          {secs}
        </h1>
      </div>
    </div>
  );
}

export default Timer;
