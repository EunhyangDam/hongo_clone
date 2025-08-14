import React, { useEffect, useState } from "react";
import "./scss/Sub12NoticeBoard.scss";
import { useLocation } from "react-router-dom";
export default function Sub12NoticeBoard(props) {
  const location = useLocation();

  const [state, setState] = useState({
    wIDX: 0,
    wType: "",
    wSubject: "",
    wContent: "",
    wID: "",
    wDate: "",
    wUpdate: "",
    wDel: 0,
    wHit: 0,
  });
  useEffect(() => {
    setState(location.state);
  }, [location]);
  return (
    <main>
      <section id="sub12NoticeBoard">
        <div className="container">
          <h2>Notification</h2>
          <div className="title">
            <h3>{state.wSubject}</h3>
            <div className="date">{state.wDate}</div>
          </div>
          <div className="content">
            {Array(state.wContent.split("<br/>").length - 1)
              .fill()
              .map((el, idx) => (
                <p>{state.wContent.split("<br/>")[idx]}</p>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
