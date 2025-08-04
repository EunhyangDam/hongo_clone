import React from "react";
import Section1Component from "./main/Section1Component";
import Section2Component from "./main/Section2Component";
import Section3Component from "./main/Section3Component";
import Section4Component from "./main/Section4Component";
import Section5Component from "./main/Section5Component";
import Section6Component from "./main/Section6Component";
import Section7Component from "./main/Section7Component";
import Section8Component from "./main/Section8Component";
import "../scss/MainComponent.scss";

function MainComponent(props) {
  React.useEffect(() => {
    const winHeight = window.innerHeight * 0.6;
    const sections = document.querySelectorAll(".section");
    let sectionTop = [];
    sections.forEach((el, idx) => {
      sectionTop[idx] = el.offsetTop - winHeight;
    });
    window.addEventListener("scroll", () => {
      if (window.scrollY === 0) {
        sections.forEach((el) => el.classList.remove("active"));
      }
      /** 비동기 방식 async await function 함수 
      async function asyncSections(offsetTop, idx) {
        if (window.scrollY > offsetTop) {
          sections[idx].classList.add("active");
        }
    }
    */
      const parallaxFn = async (offsetTop, i) => {
        if (window.scrollY > offsetTop) sections[i].classList.add("active");
      };
      sectionTop.map(async (el, i) => await parallaxFn(el, i));
    });
  }, []);
  return (
    <main id="main">
      <Section1Component />
      <Section2Component />
      <Section3Component />
      <Section4Component />
      <Section5Component />
      <Section6Component />
      <Section7Component />
      <Section8Component />
    </main>
  );
}

export default MainComponent;
