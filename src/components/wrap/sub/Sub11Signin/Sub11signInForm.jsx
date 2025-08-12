import React from "react";
import "../scss/sub.scss";
import "./scss/Sub11signInForm.scss";
import { Link } from "react-router-dom";
export default function Sub11signInForm(props) {
  return (
    <main id="sub11signInForm">
      <div className="container">
        <div className="col col1">
          <div className="img-container">
            <img src="./images/sub11/log-in.png" alt="" />
          </div>
        </div>
        <div className="col col2">
          <form action="" method="post">
            <div className="text-box">
              <h2>Welcome Back</h2>
              <p>nice to see you again!</p>
            </div>
            <input type="text" id="id" name="id" placeholder="Email or ID" />
            <input
              type="password"
              name="pw"
              id="pw"
              placeholder="Enter Password"
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
            <button type="submit">Log in</button>
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
