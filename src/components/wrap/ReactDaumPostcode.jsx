import React, { useEffect, useState } from "react";
import "./scss/ReactDaumPostcode.scss";
import Postcode from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";
import {
  adrBtnAction,
  postAction,
  postOpenAction,
} from "../../store/reactDaumPostcode";
import { modalAction } from "../../store/confirmModal";

export default function ReactDaumPostcode(props) {
  const dispatch = useDispatch();
  const returnYes = useSelector((state) => state.confirmModal.returnYes);
  const postStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    background: "#fff",
  };
  const [state, setState] = useState({
    adr: "",
    adr2: "",
    buildingName: "",
    zoneCode: "",
  });
  const clickClose = (e) => {
    e.preventDefault();
    dispatch(postOpenAction(false));
  };
  const completePost = (data) => {
    let extraAddr = "";
    if (data.userSelectedType === "R") {
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraAddr +=
          extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      if (extraAddr !== "") {
        extraAddr = ` ( ${extraAddr} )`;
      }
    }
    setState({
      ...state,
      adr: `${data.address} (${extraAddr})`,
      buildingName: data.buildingName,
      zoneCode: data.zonecode,
      serch: true,
    });
  };
  const chnageDetail = (e) => {
    setState({
      ...state,
      adr2: e.target.value,
    });
  };
  const clickSave = (e) => {
    e.preventDefault();
    if (state.adr2 === "") {
      const obj = {
        messege: "나머지 주소를 입력하지 않으셨습니다.",
        isOn: true,
        isConfirm: false,
        returnYes: false,
      };
      dispatch(modalAction(obj));
      return;
    }
    const obj = {
      adr: state.adr,
      adr2: state.adr2,
      buildingName: state.buildingName,
      zoneCode: state.zoneCode,
      isOn: true,
    };
    dispatch(postAction(obj));
    dispatch(postOpenAction(false));
  };
  const clickReSearch = (e) => {
    e.preventDefault();
    dispatch(postOpenAction(false));
    setTimeout(() => {
      dispatch(postOpenAction(true));
    }, 100);
  };
  return (
    <div id="reactDaumPostcode">
      <div className="container">
        <div className="window-title">
          <div className="col col1">
            <h1>
              <img src="./images/logo_icon.png" alt="" />
              <strong>HONGO FASHION</strong>
            </h1>
          </div>
          <div className="col col2">
            <button onClick={clickClose}>
              <i className="bi bi-x"></i>
            </button>
          </div>
        </div>
        <div className="content">
          <Postcode style={postStyle} onComplete={completePost} />
          <form action="">
            <div className="content">
              <div className="title">
                <h1>
                  <span>샛별배송</span> 지역입니다.
                </h1>
                <h2>매일 새벽, 문 앞까지 신선함을 전해드려요.</h2>
              </div>
              <div className="contents">
                <ul>
                  <li className="re-search">
                    <input
                      type="text"
                      name="inputAdr"
                      id="inputAdr"
                      value={state.adr}
                      disabled
                    />
                    <button onClick={clickReSearch}>
                      <i className="bi bi-search"></i> 재검색
                    </button>
                  </li>
                  <li className="detail">
                    <input
                      type="text"
                      placeholder="나머지 주소를 입력해 주세요"
                      onChange={chnageDetail}
                      value={state.adr2}
                    />
                  </li>
                  <li className="delivery">
                    ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.
                    <br />
                    로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
                  </li>
                  <li className="button">
                    <button onClick={clickSave}>저장</button>
                  </li>
                  <li className="info">
                    <div className="col col1">
                      <i className="bi bi-info-circle"></i>
                    </div>
                    <div className="col col2">
                      일부 관공서, 학교, 병원, 시장, 공단지역, 산간지역, 백화점
                      등은 현장 상황에 따라 샛별배송이 불가능할 수 있습니다.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
