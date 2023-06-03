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
      <div className="clock">
        <div className="wrap">
          <span
            className="hour"
            style={{ transform: `rotate(${hour}deg)` }}
          ></span>
          <span
            className="minute"
            style={{ transform: `rotate(${minute}deg)` }}
          ></span>
          <span
            className="second"
            style={{ transform: `rotate(${second}deg)` }}
          ></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
