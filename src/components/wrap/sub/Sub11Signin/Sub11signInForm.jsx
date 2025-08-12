import React, { useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub11signInForm.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInAction } from "../../../../store/signIn";
import { modalAction } from "../../../../store/confirmModal";
export default function Sub11signInForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    ID: "",
    password: "",
  });

  const changeForm = (e) => {
    let value = e.target.value;
    setState({ ...state, [e.target.dataset.name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();

    const data = [
      { asset: state.ID, messege: "아이디를 입력하세요" },
      { asset: state.password, messege: "비밀번호를 입력하세요" },
    ];
    for (const { asset, messege } of data) {
      if (asset === "") {
        const obj = {
          messege: messege,
          isOn: true,
          isConfirm: false,
        };
        dispatch(modalAction(obj));
        return;
      }
    }

    const formData = new FormData();
    formData.append("userID", state.ID);
    formData.append("userPW", state.password);

    axios({
      url: "/hongo_sign_up/sign_in.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data === 0) {
            const obj = {
              messege: "아이디가 일치하지 않습니다.",
              isOn: true,
              isConfirm: false,
            };
            dispatch(modalAction(obj));
          } else if (res.data === 1) {
            const obj = {
              messege: "비밀번호가 일치하지 않습니다.",
              isOn: true,
              isConfirm: false,
            };
            dispatch(modalAction(obj));
          } else {
            dispatch(signInAction(res.data));
            navigate("/mainComponent");
          }
        }
      })
      .catch((err) => {
        alert("ERROR");
        console.log(err);
      });
  };
  return (
    <main id="sub11signInForm">
      <div className="container">
        <div className="col col1">
          <div className="img-container">
            <img src="./images/sub11/log-in.png" alt="" />
          </div>
        </div>
        <div className="col col2">
          <form method="post">
            <div className="text-box">
              <h2>Welcome Back</h2>
              <p>nice to see you again!</p>
            </div>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="Email or ID"
              data-name="ID"
              onChange={changeForm}
              value={state.ID}
            />
            <input
              type="password"
              name="pw"
              id="pw"
              placeholder="Enter Password"
              data-name="password"
              onChange={changeForm}
              value={state.password}
            />
            <div className="remember-forgot">
              <div className="remember">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <div className="forgot">
                <button>Forgot Password?</button>
              </div>
            </div>
            <button type="submit" onClick={clickSubmit}>
              Log in
            </button>
            <p>
              Don't have an account?{" "}
              <Link to="/sub10SignUpWrite">Sign Up!</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
