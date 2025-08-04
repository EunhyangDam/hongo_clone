import React from "react";
import "./scss/Section2Component.scss";

function Section2Component(props) {
  const [state, setState] = React.useState({
    gallery: [],
  });
  React.useEffect(() => {
    fetch("./json/main/section2/gallery.json", { method: "GET" })
      .then((result) => result.json())
      .then((data) => {
        setState({
          gallery: data.gallery,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("error!");
      });
  }, []);
  return (
    <section id="section2" className="section">
      <div className="container">
        <div className="content">
          <ul>
            {state.gallery.map((el, idx) => (
              <li className={`col col${idx + 1}`} key={el.id} data-key={el.id}>
                <img src={`./images/${el.img}`} alt="" />
                {el.h2 && (
                  <div className="txt">
                    <h2>
                      {el.h2.split(" ")[0]}
                      <br />
                      {el.h2.split(" ")[1]}
                    </h2>
                    <a href="!#">SHOP NOW</a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Section2Component;
