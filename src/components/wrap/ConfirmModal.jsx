import React, { useState } from "react";
import "./scss/ConfirmModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { modalAction, returnAction } from "../../store/confirmModal";
export default function ConfirmModal(props) {
  const confirmModal = useSelector((state) => state.confirmModal);

  const dispatch = useDispatch();
  const [, setState] = useState({
    modal: "",
  });
  useState(() => {
    setState({
      modal: confirmModal,
    });
  }, []);
  const modalClose = (e) => {
    e.preventDefault();
    const obj = {
      messege: "",
      isOn: false,
      isConfirm: false,
    };
    dispatch(returnAction(false));
    dispatch(modalAction(obj));
  };
  const clickYes = (e) => {
    e.preventDefault();
    const obj = {
      messege: "",
      isOn: false,
      isConfirm: false,
    };
    dispatch(returnAction(true));
    dispatch(modalAction(obj));
  };
  return (
    <div id="confirmModal">
      <div className="container">
        <div className="content">
          <div className="heading-box">
            {confirmModal.isConfirm ? (
              <i className="fa-solid fa-circle-xmark"></i>
            ) : (
              <i className="fa-solid fa-circle-check"></i>
            )}

            <p>{confirmModal.messege}</p>
          </div>
          <div className="btn-box">
            {confirmModal.isConfirm ? (
              <div className="btn2">
                <button onClick={clickYes} className="yes">
                  YES
                </button>
                <button onClick={modalClose} className="no">
                  NO
                </button>
              </div>
            ) : (
              <div className="btn1">
                <button onClick={modalClose}>OK</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
