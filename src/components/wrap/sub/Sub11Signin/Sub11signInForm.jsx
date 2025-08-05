import React from "react";
import "../scss/sub.scss";
import "./scss/Sub11signInForm.scss";
import { Link } from "react-router-dom";
export default function Sub11signInForm(props) {
  return (
    <main id="sub11signInForm">
      <div className="container">
        <div className="col col1">
          Eunhyang
          <br />
          Lee
        </div>
        <div className="col col2">
          <form action="" method="post">
            <h2>Welcome Back Exclusvie Member</h2>
            <input type="text" id="id" name="id" />
            <input type="password" name="pw" id="pw" />
            <div className="rember-forgot">
              <div className="remeber">
                <input type="checkbox" name="remember" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <div className="forgot">
                <button>Forgot Password?</button>
              </div>
            </div>
            <button type="submit">Log in</button>
            <p>
              Don't have an acoount?
              <Link to="/sub10SignUpWrite">Sign Up!</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
