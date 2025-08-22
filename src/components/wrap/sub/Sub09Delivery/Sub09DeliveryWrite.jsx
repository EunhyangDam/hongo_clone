import React, { useEffect, useState } from "react";
import "./scss/Sub09DeliveryWrite.scss";
import InputComponent from "../../custom/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { postOpenAction } from "../../../../store/reactDaumPostcode";
export default function Sub09DeliveryWrite() {
  const dispatch = useDispatch();

  const adrAsset = useSelector((state) => state.reactDaumPostcode);

  const [state, setState] = useState({
    userID: "",
    dName: "",
    dHP: "",
    dDefaultADR: "",
    dPostNumber: "",
    dPostADR1: "",
    dPostADR2: "",
  });

  useEffect(() => {
    setState({
      ...state,
      dPostNumber: adrAsset.zoneCode,
      dPostADR1: adrAsset.adr,
      dPostADR2: adrAsset.adr2,
    });
  }, [adrAsset]);

  const changeName = (e) => {
    setState({
      dName: e.target.value,
    });
  };

  const clickAdrSearch = (e) => {
    e.preventDefault();
    dispatch(postOpenAction(true));
  };
  const changeAdr1 = (e) => {};
  const changeAdr2 = (e) => {};
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
                />
                <p></p>
              </div>
            </div>
            <div className="row row2">
              <label htmlFor="userName" className="col col1">
                Phone Number
              </label>
              <div className="col col2">
                <InputComponent
                  type="text"
                  name="userTel"
                  id="userTel"
                  placeholder="enter only number"
                  onChange={changeName}
                  value={state.dName}
                />
              </div>
            </div>
            <div className="row row3">
              <p class="col col1">Default Address</p>
              <div className="col col2 gender">
                <div className="male">
                  <InputComponent
                    type="radio"
                    name="userDefault"
                    id="userDefaultTrue"
                    value="1"
                  />
                  <label htmlFor="userGenderMale">YES</label>
                </div>
                <div className="female">
                  <InputComponent
                    type="radio"
                    name="userDefault"
                    id="userDefaultFalse"
                    value="0"
                  />
                  <label htmlFor="userGenderFemale" className="col col1">
                    NO
                  </label>
                </div>
              </div>
            </div>
            <div className="row row4">
              <p class="col col1">
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
          </div>
        </div>
      </div>
      {/* 
      dName
      dHP
      dDefaultADR
      dRequst
      dPostNumber
      dPostADR1
      dPostADR2
      */}
    </main>
  );
}
