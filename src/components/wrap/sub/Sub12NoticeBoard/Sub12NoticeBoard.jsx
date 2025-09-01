import React, { useEffect, useState } from "react";
import "./scss/Sub12NoticeBoard.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../../../store/confirmModal";
export default function Sub12NoticeBoard(props) {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const returnYes = useSelector((state) => state.confirmModal.returnYes);
  const isAdmin = useSelector((state) => state.signIn.isAdmin);
  const [state, setState] = useState({
    IDX: 0,
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
      { pathname: "/sub12NoticeBoardUpdate", search: `${state.IDX}` },
      { state: state }
    );
  };
  const clickDelete = (e) => {
    e.preventDefault();
    dispatch(
      modalAction({
        messege: "삭제하시겠습니까?",
        isOn: true,
        isConfirm: true,
      })
    );
  };
  useEffect(() => {
    if (!returnYes) return;
    let formData = new FormData();
    formData.append("idx", state.IDX);
    axios({
      url: "/hongo_sign_up/noticeDelete.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            let obj = {
              messege: "",
              isOn: true,
              isConfirm: false,
            };
            console.log(res.data);
            switch (res.data) {
              case 1:
                obj = { ...obj, messege: "삭제되었습니다." };
                navigation("/sub12NoticeBoardList");
                break;

              case 0:
                obj = { ...obj, messege: "삭제 실패" };
                break;

              default:
                break;
            }
            dispatch(modalAction(obj));
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        alert("ERROR");
      });
  }, [returnYes]);
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
              <p key={idx}>
                {state.wContent.split("\n")[idx] === "\r"
                  ? "　"
                  : state.wContent.split("\n")[idx]}
              </p>
            ))}
          </div>
          <div className="foot">
            <div className="btn-container">
              {isAdmin && <button onClick={clickEdit}>Edit</button>}
              <button onClick={clickViewList}>View List</button>
              {isAdmin && <button onClick={clickDelete}>Delete</button>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
