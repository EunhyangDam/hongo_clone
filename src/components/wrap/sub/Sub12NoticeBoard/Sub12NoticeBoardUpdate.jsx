import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scss/Sub12NoticeBoardUpdate.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../../../store/confirmModal";
export default function Sub12NoticeBoardUpdate(props) {
  const location = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const returnYes = useSelector((state) => state.confirmModal.returnYes);

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

  const submitEdit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("idx", state.IDX);
    formData.append("subject", state.wSubject);
    formData.append("content", state.wContent);

    axios({
      url: "/hongo_sign_up/noticeUpdate.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          let obj = {
            messege: "",
            isOn: true,
            isConfirm: false,
          };
          switch (res.data) {
            case 1:
              obj = {
                ...obj,
                messege: "수정이 완료되었습니다.",
              };
              break;
            case 0:
              obj = {
                ...obj,
                messege: "수정 실패.",
              };
              break;
            default:
              break;
          }
          dispatch(modalAction(obj));
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
                nav("/sub12NoticeBoardList");
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
    <main id="sub12NoticeBoardUpdate">
      <div className="container">
        <h2>Notification</h2>
        <div className="title">
          <h3>제목</h3>
          <input type="text" value={state.wSubject} onChange={changeSubject} />
        </div>
        <form onSubmit={submitEdit}>
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
              <button type="submit">Edit</button>
              <button onClick={clickViewList}>View List</button>
              <button onClick={clickDelete}>Delete</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
