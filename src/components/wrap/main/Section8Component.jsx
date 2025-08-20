import React, { useState, useEffect } from "react";
import "./scss/Section8Component.scss";
import { Link } from "react-router-dom";
import useCustomAlink from "../custom/useCustomALink";

const Section8Component = React.forwardRef((props, ref) => {
  const { onClickALink } = useCustomAlink();

  const [state, setState] = useState({
    slide: [],
  });
  useEffect(() => {
    fetch("./json/main/section8/slide.json", { method: "GET" })
      .then((result) => result.json())
      .then((data) => {
        setState({
          slide: data.slide,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  useEffect(() => {
    const slideWrap = document.querySelector("#section8 .slide-wrap");

    /**count variable */
    let cnt = 0;

    const mainSlide = () => {
      slideWrap.style.transition = "left 0.6s";
      slideWrap.style.left = `${(-100 / 6) * cnt}%`;
    };
    const countUp = () => {
      cnt++;
      if (cnt >= 3) cnt = 0;
      mainSlide();
    };

    /**timer setter */
    let setId = null;
    const timer = () => {
      clearInterval(setId);
      setId = setInterval(countUp, 3000);
    };
    timer();

    let state = {
      mouseDown: null,
      mouseUp: null,
      isMouseDown: false,
    };
    let { mouseDown, mouseUp, isMouseDown } = state;

    const leftVar = slideWrap.getBoundingClientRect().left;
    slideWrap.addEventListener("click", (e) => e.preventDefault());
    slideWrap.addEventListener("mousedown", function (e) {
      isMouseDown = true;
      timer();
      mouseDown = e.clientX - (this.getBoundingClientRect().left - leftVar);
    });
    slideWrap.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      mouseUp = e.clientX;
      slideWrap.style.transition = "left linear 0s";
      slideWrap.style.left = `${mouseUp - mouseDown}px`;
    });
    slideWrap.addEventListener("mouseup", function (e) {
      cnt = Math.abs(Math.round((mouseUp - mouseDown) / 181.25));
      if (mouseUp - mouseDown > 0) {
        if (cnt >= 0) cnt = 0;
      }
      if (mouseUp - mouseDown < 0) {
        if (cnt >= 2) cnt = 2;
      }
      mainSlide();
      isMouseDown = false;
    });
    document.addEventListener("mouseup", function (e) {
      mainSlide();
      if (!isMouseDown) return;
      cnt = Math.abs(Math.round((mouseUp - mouseDown) / 181.25));
      if (mouseUp - mouseDown > 0) {
        if (cnt >= 0) cnt = 0;
      }
      if (mouseUp - mouseDown < 0) {
        if (cnt >= 2) cnt = 2;
      }
      mainSlide();
      isMouseDown = false;
    });
    slideWrap.addEventListener("touchstart", function (e) {
      isMouseDown = true;
      timer();
      mouseDown =
        e.changedTouches[0].clientX -
        (this.getBoundingClientRect().left - leftVar);
    });
    slideWrap.addEventListener("touchmove", (e) => {
      if (!isMouseDown) return;
      mouseUp = e.changedTouches[0].clientX;
      slideWrap.style.transition = "left linear 0s";
      slideWrap.style.left = `${mouseUp - mouseDown}px`;
    });
    slideWrap.addEventListener("touchend", function (e) {
      cnt = Math.abs(Math.round((mouseUp - mouseDown) / 181.25));
      if (mouseUp - mouseDown > 0) {
        if (cnt >= 0) cnt = 0;
      }
      if (mouseUp - mouseDown < 0) {
        if (cnt >= 2) cnt = 2;
      }
      mainSlide();
      isMouseDown = false;
    });
    document
      .querySelectorAll("img")
      .forEach((el) =>
        el.addEventListener("dragstart", (e) => e.preventDefault())
      );
  }, [state.slide]);
  return (
    <section id="section8" className="section" ref={ref}>
      <div className="container">
        <div className="title">#INSTAGRAM FASHION</div>
        <div className="slide-container">
          <div className="slide-view">
            <ul className="slide-wrap">
              {state.slide.map((el, idx) => (
                <li className={`slide slide${idx + 1}`} key={`slide${idx + 1}`}>
                  <a href="/" onClick={(e) => onClickALink(e, null)}>
                    <img src={`./images/${el}`} alt="" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Section8Component;
