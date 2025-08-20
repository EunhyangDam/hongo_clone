import React, { useState, useEffect } from "react";
import "./scss/Section5Component.scss";
import { Link } from "react-router-dom";
import useCustomAlink from "../custom/useCustomALink";

const Section5Component = React.forwardRef((props, ref) => {
  const { onClickALink } = useCustomAlink();

  const [state, setState] = useState({
    blog: {
      h2: "",
      p: "",
      content: [],
    },
  });
  useEffect(() => {
    fetch("./json/main/section5/blogs.json", { method: "GET" })
      .then((result) => result.json())
      .then((data) => {
        setState({
          blog: {
            h2: data.blog.h2,
            p: data.blog.p,
            content: data.blog.content,
          },
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <section id="section5" className="section" ref={ref}>
      <div className="container">
        <div className="title">
          <div className="red-line"></div>
          <h2>{state.blog.h2}</h2>
          <p>
            {state.blog.p.split("/")[0]}
            <br />
            {state.blog.p.split("/")[1]}
          </p>
        </div>
        <div className="content">
          <ul>
            {state.blog.content.map((el) => (
              <li key={el.id} data-key={el.id}>
                <a to="/null" onClick={(e) => onClickALink(e, null)}>
                  <img src={`./images/${el.img}`} alt="" />
                </a>
                <div className="txt">
                  <div className="txt-container"></div>
                  <div className="blk">
                    <p className="adventure">
                      <a href="/null" onClick={(e) => onClickALink(e, null)}>
                        {el.type}
                      </a>
                    </p>
                    <p className="heading">
                      <a href="/null" onClick={(e) => onClickALink(e, null)}>
                        {el.heading}
                      </a>
                    </p>
                  </div>
                  <div className="white">
                    <p className="date">{el.date}</p>
                    <i>|</i>
                    <p className="name">
                      By
                      <a to="/null" className="name">
                        {el.name}
                      </a>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default Section5Component;
