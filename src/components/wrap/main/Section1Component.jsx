import { React, useEffect, useState } from "react";
import "./scss/Section1Component.scss";
import useCustomAlink from "../custom/useCustomALink";
function Section1Component(props) {
  const { onClickALink } = useCustomAlink();
  const [state, setState] = useState({
    slide: [],
  });
  useEffect(() => {
    fetch("./json/main/section1/slide.json", { method: "GET" })
      .then((result) => result.json())
      .then((data) => {
        setState({
          slide: data.slide,
        });
      })
      .catch((err) => {
        alert("Error!");
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const slideWrap = document.querySelector("#section1 .slide-wrap");
    const prevBtn = document.querySelector("#section1 .prev-count");
    const nextBtn = document.querySelector("#section1 .next-count");
    /**count */
    let cnt = 0;
    /**timer */
    let setId = null;

    /**slideBtn */
    const countDownBtn = (n) => {
      prevBtn.textContent = `0${n === 0 ? 3 : n}`;
    };
    const countUpBtn = (n) => {
      nextBtn.textContent = `0${n === 4 ? 1 : n}`;
    };

    function mainSlide() {
      slideWrap.style.transition = "left 0.3s ease-in-out";
      slideWrap.style.left = `${cnt * -100}%`;
      slideWrap.addEventListener("transitionend", () => {
        if (cnt >= 3) cnt = 0;
        if (cnt < 0) cnt = 2;
        slideWrap.style.transition = "left 0s";
        slideWrap.style.left = `${cnt * -100}%`;
        countDownBtn(cnt + 1 - 1);
        countUpBtn(cnt + 1 + 1);
        for (const i of slideWrap.children) {
          if (i.className.split(" ")[0] === `slide${cnt + 1}`) {
            i.classList.add("active");
          } else {
            i.classList.remove("active");
          }
        }
      });
    }
    function countUp() {
      cnt++;
      mainSlide();
    }
    function countDown() {
      cnt--;
      mainSlide();
    }
    function timer() {
      clearInterval(setId);
      setId = setInterval(countUp, 3000);
    }
    timer();
    /**swipe */
    let mouseDown = null;
    let mouseUp = null;
    /**drag and drop */
    let isMouseDown = false;
    let dragDown = null;
    slideWrap.addEventListener("mousedown", (e) => {
      mouseDown = e.clientX;
      isMouseDown = true;
      dragDown =
        mouseDown -
        (slideWrap.getBoundingClientRect().left + window.innerWidth);
      timer();
    });
    slideWrap.addEventListener("mouseup", (e) => {
      mouseUp = e.clientX;
      if (mouseDown - mouseUp > window.innerWidth / 2) {
        countUp();
      } else {
        mainSlide();
      }
      if (mouseDown - mouseUp < -(window.innerWidth / 2)) {
        countDown();
      } else {
        mainSlide();
      }
      isMouseDown = false;
    });
    document.addEventListener("mouseup", (e) => {
      if (!isMouseDown) return;
      mouseUp = e.clientX;
      if (mouseDown - mouseUp > window.innerWidth / 2) {
        countUp();
      } else {
        mainSlide();
      }
      if (mouseDown - mouseUp < -(window.innerWidth / 2)) {
        countDown();
      } else {
        mainSlide();
      }
      isMouseDown = false;
    });
    slideWrap.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      slideWrap.style.left = `${e.clientX - dragDown}px`;
    });
    slideWrap.addEventListener("touchstart", (e) => {
      mouseDown = e.changedTouches[0].clientX;
      isMouseDown = true;
      dragDown =
        mouseDown -
        (slideWrap.getBoundingClientRect().left + window.innerWidth);
      timer();
    });
    slideWrap.addEventListener("touchend", (e) => {
      mouseUp = e.changedTouches[0].clientX;
      if (mouseDown - mouseUp > window.innerWidth / 2) {
        countUp();
      } else {
        mainSlide();
      }
      if (mouseDown - mouseUp < -(window.innerWidth / 2)) {
        countDown();
      } else {
        mainSlide();
      }
      isMouseDown = false;
    });
    slideWrap.addEventListener("touchmove", (e) => {
      if (!isMouseDown) return;
      slideWrap.style.left = `${e.changedTouches[0].clientX - dragDown}px`;
    });
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      timer();
      countDown();
    });
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      timer();
      countUp();
    });
  }, [state.slide]);
  return (
    <section id="section1" className="section">
      <div className="slide-container">
        <a
          href="/"
          onClick={(e) => onClickALink(e, null)}
          className="prev-count slide-btn"
        >
          03
        </a>
        <div className="slide-view">
          <ul className="slide-wrap">
            {state.slide.map((el) => (
              <li className={el.class} key={el.id} data-key={el.id}>
                <img src={`./images/${el.img}`} alt="" />
                <div className="txt">
                  <p className="collection">2019 NEW COLLECTION</p>
                  <h2>
                    {el.h2.split(" ")[0]}
                    <br />
                    {el.h2.split(" ")[1]}
                  </h2>
                  <p className="explain">
                    Fashion should be a form of escapism
                    <br />
                    and not a form of imprisonment
                  </p>
                  <a
                    href="/"
                    onClick={(e) => onClickALink(e, null)}
                    title="SHOP COLLECTION"
                  >
                    SHOP COLLECTION
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="/"
          onClick={(e) => onClickALink(e, null)}
          className="next-count slide-btn"
        >
          02
        </a>
      </div>
      <div className="direct-box">
        <a href="!#" onClick={(e) => onClickALink(e, "#section3")}>
          <i className="fa-solid fa-angles-down"></i>
        </a>
      </div>
    </section>
  );
}

export default Section1Component;
