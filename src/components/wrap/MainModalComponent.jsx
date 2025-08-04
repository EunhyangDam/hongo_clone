import React, { useEffect, useState } from "react";
import "./scss/MainModalComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { mainModalAction } from "../../store/mainModal";
import { useCookies } from "react-cookie";
export default function MainModalComponent(props) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const asset = useSelector((state) => state.mainModal);
  const dispatch = useDispatch();
  const [chk, setchk] = useState(false);

  const clickCloseModal = (e) => {
    e.preventDefault();
    const obj = {
      imgSrc: "",
      isOn: false,
    };
    if (chk) {
      let today = new Date();
      today.setDate(today.getDate() + 1);
      setCookie("HONGO_MAIN_MODAL", "main_modal_close_1day", {
        path: "/",
        expires: today,
      });
    }
    dispatch(mainModalAction(obj));
  };
  /**하루동안 열리지 않음 쿠키 설정*/
  const changeSetCookie = (e) => {
    if (e.target.checked) {
      setchk(true);
    } else {
      setchk(false);
    }
  };
  return (
    <div id="mainModalComponent">
      <div className="container">
        <div className="content">
          <div className="img-container">
            <a href="!#">
              <img src={`./images/main_modal/${asset.imgSrc}`} alt="" />
            </a>
          </div>
          <div className="txt-container">
            <div className="col col1">
              Join our newsletter
              <br />
              and get 20% discount
            </div>
            <div className="col col2">
              <form action="GET">
                <div className="email-box">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    required
                  />
                  <button type="submit">
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </div>
              </form>
              <div className="label">
                <input
                  type="checkbox"
                  name="prevent"
                  id="prevent"
                  onChange={changeSetCookie}
                />
                <label htmlFor="prevent">Prevent This Pop-up</label>
              </div>
            </div>
          </div>
          <button className="close" onClick={clickCloseModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
