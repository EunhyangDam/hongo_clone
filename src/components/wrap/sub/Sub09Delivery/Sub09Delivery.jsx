import React, { useEffect, useState } from "react";
import "./scss/Sub09Delivery.scss";
import useCustomAlink from "../../custom/useCustomALink";
import axios, { Axios } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { modalAction } from "../../../../store/confirmModal";
import { useNavigate } from "react-router-dom";
export default function Sub09Delivery(props) {
  const { onClickALink } = useCustomAlink();

  const userAsset = useSelector((state) => state.signIn);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const [state, setState] = useState([
    {
      IDX: "",
      userID: "",
      dName: "",
      dHP: "",
      dDefaultADR: "",
      dRequst: "",
      dPostNumber: "",
      dPostADR1: "",
      dPostADR2: "",
      dDate: "",
      dUpdate: "",
      dDel: "",
    },
  ]);

  useEffect(() => {
    const formData = new FormData();
    formData.append("userID", userAsset.ID);
    axios({
      url: "./hongo_sign_up/delivery_select.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            if (res.data !== 0) {
              setState(res.data);
            }
            break;

          default:
            console.log("조회 실패");
            break;
        }
      })
      .catch((err) => {
        alert("ERROR");
        console.log(err);
      });
  }, [userAsset]);

  const clickDel = (e, idx, defaultAdr) => {
    e.preventDefault();
    if (defaultAdr === "1") {
      return dispatch(
        modalAction({
          messege: "기본 배송지는 삭제할 수 없습니다.",
          isOn: true,
        })
      );
    }
    const formData = new FormData();
    formData.append("userID", userAsset.ID);
    formData.append("Index", idx);
    axios({
      url: "/hongo_sign_up/delivery_delete.php",
      method: "POST",
      data: formData,
    }).then((res) => {
      if (res.status === 200) {
        if (res.data === 1) {
          dispatch(
            modalAction({
              messege: "배송지가 삭제되었습니다.",
              isOn: true,
            })
          );
          nav(0);
        } else if (res.data === 0) {
          alert("삭제 실패. 콘솔로그 확인");
          console.log(res.data);
        }
      }
    });
  };

  const clickEdit = (e, data) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userID", userAsset.ID);
    formData.append("IDX", data.IDX);

    nav("/sub09DeliveryUpdate", {
      state: { userID: userAsset.ID, IDX: data.IDX },
    });
  };
  return (
    <div id="sub09Delivery">
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
            <div className="contents">
              <ul>
                {state &&
                  state.map((el) => (
                    <li key={el.IDX}>
                      <dl>
                        {el.dDefaultADR === "1" && <dt>기본 배송지</dt>}
                        <dd className="adr">
                          ({el.dPostNumber}) {el.dPostADR1} {el.dPostADR2}
                        </dd>
                        <dd className="name-number">
                          {el.dName} {el.dHP}
                        </dd>
                        {el.dRequst && <dd>{el.dRequst}</dd>}
                      </dl>
                      <div className="button-container">
                        <button
                          onClick={(e) => clickDel(e, el.IDX, el.dDefaultADR)}
                        >
                          Delete
                        </button>
                        <i>|</i>
                        <button onClick={(e) => clickEdit(e, el)}>Edit</button>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="button-container">
              <button onClick={(e) => onClickALink(e, "/sub09DeliveryWrite")}>
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
