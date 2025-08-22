import { forwardRef, React, useEffect, useRef, useState } from "react";
import "./scss/Section1Component.scss";
import useCustomAlink from "../custom/useCustomALink";
const Section1Component = forwardRef((props, ref) => {
  const { onClickALink } = useCustomAlink();
  const [state, setState] = useState({
    slide: [],
  });
  const [cnt, setCnt] = useState(0);
  const [intervalID, setIntervalID] = useState(0);
  const slideWrap = useRef();
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
  let isMouseDown = useRef(false);
  let touchStart = useRef(0);
  let touchEnd = useRef(0);

  let dragStart = useRef(0);
  let dragEnd = useRef(0);
  const transitionEnd = (e) => {
    if (cnt >= 3) {
      autoTimer();
      setTimeout(() => {
        setCnt(1);
      }, 10);
      slideWrap.current && (slideWrap.current.style.transition = "none");
      slideWrap.current && (slideWrap.current.style.left = `${0 * -100}%`);
      return;
    }
    if (cnt < 0) {
      autoTimer();
      setTimeout(() => {
        setCnt(2);
      }, 10);
      slideWrap.current && (slideWrap.current.style.transition = "none");
      slideWrap.current && (slideWrap.current.style.left = `${3 * -100}%`);
      return;
    }
  };
  const mainSlide = () => {
    slideWrap.current && (slideWrap.current.style.transition = "left 0.5s");
    slideWrap.current && (slideWrap.current.style.left = `${cnt * -100}%`);
  };

  const countDown = () => {
    setCnt((cnt) => cnt - 1);
  };
  const countUp = () => {
    setCnt((cnt) => cnt + 1);
  };

  useEffect(() => {
    mainSlide();
    // eslint-disable-next-line
  }, [cnt]);

  const autoTimer = () => {
    clearInterval(intervalID);
    const timerID = setInterval(countUp, 3000);
    setIntervalID(timerID);
    return () => clearInterval(intervalID);
  };

  const clickPrev = (e) => {
    e.preventDefault();
    countDown();
    autoTimer();
  };
  const clickNext = (e) => {
    e.preventDefault();
    countUp();
    autoTimer();
  };

  const mouseDown = (e) => {
    autoTimer();
    touchStart.current = e.clientX;
    isMouseDown.current = true;
    dragStart.current =
      e.clientX -
      (slideWrap.current.getBoundingClientRect().left + window.innerWidth);
  };
  const touchStartE = (e) => {
    autoTimer();
    touchStart.current = e.changedTouches[0].clientX;
    isMouseDown.current = true;
    dragStart.current =
      e.clientX -
      (slideWrap.current.getBoundingClientRect().left + window.innerWidth);
  };

  const mouseUp = (e) => {
    autoTimer();
    touchEnd.current = e.clientX;
    if (touchStart.current - touchEnd.current > window.innerWidth / 2) {
      countUp();
    } else {
      mainSlide();
    }
    if (touchStart.current - touchEnd.current < -(window.innerWidth / 2)) {
      countDown();
    } else {
      mainSlide();
    }
    mouseDown.current = false;
  };

  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      touchEnd.current = e.clientX;
      if (touchStart.current - touchEnd.current > window.innerWidth / 2) {
        countUp();
      } else {
        mainSlide();
      }
      if (touchStart.current - touchEnd.current < -(window.innerWidth / 2)) {
        countDown();
      } else {
        mainSlide();
      }
      isMouseDown.current = false;

      autoTimer();
    });
    // eslint-disable-next-line
  }, []);

  const touchEndE = (e) => {};

  const mouseMove = (e) => {
    autoTimer();

    if (!isMouseDown.current) return;
    dragEnd.current = e.clientX;
    slideWrap.current.style.transition = "none";
    slideWrap.current.style.left = `${dragEnd.current - dragStart.current}px`;
  };
  const touchMove = (e) => {};
  useEffect(() => {
    autoTimer();
    //eslint-disable-next-line
  }, []);

  return (
    <section id="section1" className="section" ref={ref}>
      <div className="slide-container">
        <a href="/" onClick={clickPrev} className="prev-count slide-btn">
          03
        </a>
        <div className="slide-view">
          <ul
            className="slide-wrap"
            ref={slideWrap}
            onTransitionEnd={transitionEnd}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseMove={mouseMove}
            onTouchStart={touchStartE}
            onTouchEnd={touchEndE}
            onTouchMove={touchMove}
          >
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
        <a href="/" onClick={clickNext} className="next-count slide-btn">
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
});

export default Section1Component;
