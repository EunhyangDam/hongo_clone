import React, { useEffect, useState } from "react";
import "./scss/Sub12NoticeBoardWrite.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Sub12NoticeBoardWrite(props) {
  const location = useLocation();
  const nav = useNavigate();

  const [state, setState] = useState({
    wType: "",
    wSubject: "",
    wContent: "",
    wID: "",
    wDel: 0,
    wHit: 1,
  });

  const changeSelect = (e) => {
    setState({
      ...state,
      wType: e.target.value,
    });
  };
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

  const clickViewList = (e) => {
    e.preventDefault();
    nav("/sub12NoticeBoardList");
  };
  const submitWirte = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("type", state.wType);
    formData.append("id", state.wID);
    formData.append("subject", state.wSubject);
    formData.append("content", state.wContent);
    formData.append("del", state.wDel);
    formData.append("hit", state.wHit);

    axios({
      url: "/hongo_sign_up/noticeWrite.php",
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
  return (
    <main id="sub12NoticeBoardWrite">
      <div className="container">
        <h2>Notification</h2>
        <div className="title">
          <h3>Category</h3>
          <select name="selectType" id="selectType" onChange={changeSelect}>
            <option value="normal">normal</option>
            <option value="notice">notice</option>
          </select>
        </div>
        <div className="title">
          <h3>제목</h3>
          <input type="text" value={state.wSubject} onChange={changeSubject} />
        </div>
        <form onSubmit={submitWirte}>
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
              <button type="submit">Regist</button>
              <button onClick={clickViewList}>View List</button>
              <button>Delete</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
