import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scss/Sub12NoticeBoardUpdate.scss";
import axios from "axios";
export default function Sub12NoticeBoardUpdate(props) {
  const location = useLocation();
  const nav = useNavigate();
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

  const changeSubject = (e) => {
    setState({
      ...state,
      wSubject: e.target.value,
    });
  };
  const changeContent = (e) => {
    setState({
      ...state,
      wContent: e.target.value,
    });
  };

  const clickEdit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("idx", state.wIDX);
    formData.append("id", state.wID);
    formData.append("update", state.wUpdate);
    formData.append("subject", state.wSubject);
    formData.append("content", state.wContent);

    axios({
      url: "/hongo_sign_up/noticeUpdate.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          switch (res.data) {
            case 1:
              alert("수정완료");
              break;
            case 0:
              alert("실패");
              break;
            default:
              break;
          }
          console.log(res.data);
        }
      })
      .catch((err) => {
        alert("ERROR!");
        console.log(err);
      });
    nav("/sub12NoticeBoardList");
  };
  const clickViewList = (e) => {
    e.preventDefault();
    nav("/sub12NoticeBoardList");
  };
  return (
    <main id="sub12NoticeBoardUpdate">
      <div className="container">
        <h2>Notification</h2>
        <div className="title">
          <h3>제목</h3>
          <input type="text" value={state.wSubject} onChange={changeSubject} />
        </div>
        <div className="content">
          <h3>내용</h3>
          <textarea
            name=""
            id=""
            value={state.wContent
              .split("\n")
              .map((line) => (line === "&nbsp;" ? " " : line))
              .join("\n")}
            onChange={changeContent}
          ></textarea>
        </div>
        <div className="foot">
          <div className="btn-container">
            <button onClick={clickEdit}>Edit</button>
            <button onClick={clickViewList}>View List</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
    </main>
  );
}
