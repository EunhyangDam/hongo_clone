import React, { useState, useEffect } from "react";
import "./scss/Section7Component.scss";

function Section7Component(props) {
  const [state, setState] = useState({
    icon: [],
  });
  useEffect(() => {
    fetch("./json/main/section7/icon.json", { method: "GET" })
      .then((result) => result.json())
      .then((data) => {
        setState({
          icon: data.icon,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <section id="section7" className="section">
      <div className="container">
        <ul className="content">
          {state.icon.map((el) => (
            <li key={el.id} data-key={el.id}>
              <i className={`icon-${el.class}`}></i>
              <span>{el.span}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Section7Component;
