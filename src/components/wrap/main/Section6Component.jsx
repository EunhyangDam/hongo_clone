import { React, useEffect } from "react";
import "./scss/Section6Component.scss";
import { Link } from "react-router-dom";
import useCustomAlink from "../custom/useCustomALink";

function Section6Component(props) {
  const { onClickALink } = useCustomAlink();

  useEffect(() => {
    const days = document.querySelector(".days");
    const hours = document.querySelector(".hours");
    const minutes = document.querySelector(".minutes");
    const seconds = document.querySelector(".seconds");
    let start = new Date("2025-06-05 14:43:00");
    const sale = 365;
    start.setDate(start.getDate() + sale);
    setInterval(() => {
      let left = start - new Date();
      let _seconds = Math.floor((left / 1000) % 60);
      let _minutes = Math.floor(left / (1000 * 60)) % 60;
      let _hours = Math.floor(left / (1000 * 60 * 60)) % 24;
      let _days = Math.floor(left / (1000 * 60 * 60 * 24));
      seconds.textContent = _seconds.toString().padStart(2, "0");
      minutes.textContent = _minutes.toString().padStart(2, "0");
      hours.textContent = _hours.toString().padStart(2, "0");
      hours.textContent = _hours.toString().padStart(2, "0");
      days.textContent = _days;
    }, 1000);
  }, []);
  return (
    <section id="section6" className="section">
      <div className="container">
        <div className="title">
          <p>We offer a hot deal offer every festival</p>
          <h2>Deal of the day!</h2>
        </div>
        <div className="content">
          <div className="timer-container">
            <div className="timer-box">
              <p className="days">00</p>
              <p>Days</p>
            </div>
            <div className="timer-box">
              <p className="hours">00</p>
              <p>Hours</p>
            </div>
            <div className="timer-box">
              <p className="minutes">00</p>
              <p>Minutes</p>
            </div>
            <div className="timer-box">
              <p className="seconds">00</p>
              <p>Seconds</p>
            </div>
          </div>
          <a href="/" onClick={(e) => onClickALink(e, null)}>
            {" "}
            SHOP COLLECTION{" "}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Section6Component;
