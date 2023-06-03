import React, { useEffect, useState } from "react";
import "./loader.css";

const Loader = () => {
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();

  const clock = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    setHour(hours * 30);
    setMinute(minutes * 6);
    setSecond(seconds * 6);
  };

  useEffect(() => {
    clock();
    setInterval(clock, 1000);
  }, []);

  return (
    <div className="container-clock">
      <div class="clock">
        <div class="wrap">
          <span class="hour" style={{ transform: `rotate(${hour}deg)` }}></span>
          <span
            class="minute"
            style={{ transform: `rotate(${minute}deg)` }}
          ></span>
          <span
            class="second"
            style={{ transform: `rotate(${second}deg)` }}
          ></span>
          <span class="dot"></span>
        </div>
        <h1>LOADING...</h1>
      </div>
    </div>
  );
};

export default Loader;
