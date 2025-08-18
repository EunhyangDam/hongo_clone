import React, { useEffect, useState } from "react";
import "./scss/Sub12NoticeBoard.scss";
import { useLocation, useNavigate } from "react-router-dom";
export default function Sub12NoticeBoard(props) {
  const location = useLocation();
  const navigation = useNavigate();

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
  const clickViewList = (e) => {
    e.preventDefault();
    navigation(-1);
  };
  const clickEdit = (e) => {
    e.preventDefault();
    navigation(
      { pathname: "/sub12NoticeBoardUpdate", search: `${state.wIDX}` },
      { state: state }
    );
  };
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
            {state.wContent.split("\n").map((el, idx) => (
              <p key={el}>
                {state.wContent.split("\n")[idx] === "&nbsp;"
                  ? "　"
                  : state.wContent.split("\n")[idx]}
              </p>
            ))}
          </div>
          <div className="foot">
            <div className="btn-container">
              <button onClick={clickEdit}>Edit</button>
              <button onClick={clickViewList}>View List</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
