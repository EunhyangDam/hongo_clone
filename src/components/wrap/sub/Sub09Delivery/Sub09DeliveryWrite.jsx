import React, { useEffect, useState } from "react";
import "./scss/Sub09DeliveryWrite.scss";
import InputComponent from "../../custom/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { postOpenAction } from "../../../../store/reactDaumPostcode";
import axios from "axios";
import { modalAction } from "../../../../store/confirmModal";
import { useNavigate } from "react-router-dom";
export default function Sub09DeliveryWrite() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const adrAsset = useSelector((state) => state.reactDaumPostcode);
  const userData = useSelector((state) => state.signIn.ID);
  const [state, setState] = useState({
    userID: "",
    dName: "",
    dHP: "",
    dDefaultADR: false,
    dPostNumber: "",
    dPostADR1: "",
    dPostADR2: "",
    dRequst: "",
  });

  useEffect(() => {
    setState({
      ...state,
      dPostNumber: adrAsset.zoneCode,
      dPostADR1: adrAsset.adr,
      dPostADR2: adrAsset.adr2,
    });
  }, [adrAsset]);
  useEffect(() => {
    setState({
      ...state,
      userID: userData,
    });
  }, [userData]);
  const changeName = (e) => {
    setState({
      ...state,
      dName: e.target.value,
    });
  };
  const changeTel = (e) => {
    setState({
      ...state,
      dHP: e.target.value,
    });
  };
  const clickAdrSearch = (e) => {
    e.preventDefault();
    dispatch(postOpenAction(true));
  };
  const changeAdr1 = (e) => {};
  const changeAdr2 = (e) => {};
  const changeDefault = (e) => {
    setState({
      ...state,
      dDefaultADR: Number(e.target.value),
    });
  };
  const changeRequset = (e) => {
    setState({
      ...state,
      dRequst: e.target.value,
    });
  };
  const submitEvent = (e) => {
    e.preventDefault();

    const {
      userID,
      dName,
      dHP,
      dDefaultADR,
      dPostNumber,
      dPostADR1,
      dPostADR2,
      dRequst,
    } = state;

    const switchData = [
      { condition: dName === "", messege: "이름을 입력하세요." },
      { condition: dHP === "", messege: "전화번호를 입력하세요." },
      { condition: dPostADR1 === "", messege: "주소를 입력하세요." },
    ];
    for (const { condition, messege } of switchData) {
      if (condition) {
        dispatch(
          modalAction({
            messege: messege,
            isOn: true,
            isConfirm: false,
          })
        );
        return;
      }
    }
    const formData = new FormData();

    const appendData = [
      { field: "userId", dataKey: userID },
      { field: "dName", dataKey: dName },
      { field: "dDefaultADR", dataKey: dDefaultADR ? 1 : 0 },
      {
        field: "dHP",
        dataKey: dHP,
      },
      { field: "dAdr1", dataKey: dPostADR1 },
      { field: "dAdr2", dataKey: dPostADR2 },
      { field: "dPostNumber", dataKey: dPostNumber },
      { field: "dRequst", dataKey: dRequst },
    ];
    appendData.forEach(({ field, dataKey }) => {
      formData.append(field, dataKey);
    });
    axios({
      url: "/hongo_sign_up/delivery_insert.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          let obj = {
            messege: "",
            isOn: true,
            isConfirm: false,
          };
          if (res.data === 1) {
            obj = {
              ...obj,
              messege: "배송지를 등록했습니다.",
            };
            dispatch(modalAction(obj));
            nav("/sub09Delivery");
          } else if (res.data === 0) {
            obj = {
              ...obj,
              messege: "정보 수정 실패.",
            };
            dispatch(modalAction(obj));
          }
        }
      })
      .catch((error) => {
        alert("전송 실패");
        console.log(error);
      });
  };
  return (
    <main id="sub09DeliveryWrite">
      <div className="container">
        <div className="title">
          <div className="inner">
            <div className="left">
              <h2>Delivery</h2>
            </div>
            <div className="right">
              <span className="asset home">home</span>
              <i>|</i>
              <span className="asset wishlist">Delivery</span>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="inner">
            <form onSubmit={submitEvent}>
              <div className="row row1">
                <label htmlFor="userName" className="col col1">
                  Name
                </label>
                <div className="col col2">
                  <InputComponent
                    type="text"
                    name="userName"
                    id="userName"
                    placeholder="enter full name"
                    onChange={changeName}
                    value={state.dName}
                  />
                  <p></p>
                </div>
              </div>
              <div className="row row2">
                <label htmlFor="userTel" className="col col1">
                  Phone Number
                </label>
                <div className="col col2">
                  <InputComponent
                    type="text"
                    name="userTel"
                    id="userTel"
                    placeholder="enter only number"
                    onChange={changeTel}
                    value={state.dHP}
                  />
                </div>
              </div>
              <div className="row row3">
                <p className="col col1">Default Address</p>
                <div className="col col2 gender">
                  <div className="male">
                    <InputComponent
                      type="radio"
                      name="userDefault"
                      id="userDefaultTrue"
                      value={1}
                      checked={state.dDefaultADR === 1}
                      onChange={changeDefault}
                    />
                    <label htmlFor="userDefaultTrue">YES</label>
                  </div>
                  <div className="female">
                    <InputComponent
                      type="radio"
                      name="userDefault"
                      id="userDefaultFalse"
                      value={0}
                      checked={state.dDefaultADR === 0}
                      onChange={changeDefault}
                    />
                    <label htmlFor="userDefaultFalse" className="col col1">
                      NO
                    </label>
                  </div>
                </div>
              </div>
              <div className="row row4">
                <p className="col col1">
                  Address<span className="rq">*</span>
                </p>
                <div className="col col2">
                  <InputComponent
                    type="text"
                    name="adr1"
                    id="adr1"
                    onChange={changeAdr1}
                    value={state.dPostADR1}
                  />
                  <InputComponent
                    type="text"
                    name="adr2"
                    id="adr2"
                    placeholder="enter detail Address"
                    onChange={changeAdr2}
                    value={state.dPostADR2}
                  />
                </div>
                <button onClick={clickAdrSearch}>
                  <i className="bi bi-search"></i> search
                </button>
              </div>
              <div className="row row5">
                <label htmlFor="request">
                  <p className="col col1">request</p>
                </label>
                <div className="col col2">
                  <textarea
                    name="request"
                    id="request"
                    onChange={changeRequset}
                    value={state.dRequst}
                  ></textarea>
                </div>
              </div>
              <div className="submit">
                <button type="submit">ADD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
