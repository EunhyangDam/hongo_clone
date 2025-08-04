import React from "react";
import "./scss/Section4Component.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function Section4Component(props) {
  const [state, setState] = React.useState({
    email: "",
  });
  const changeEmail = (e) => {
    setState({
      email: e.target.value,
    });
  };
  const clickSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userEmail", state.email);
    axios({
      url: "hongo_email2/insert_email.php",
      method: "POST",
      data: formData,
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <section id="section4" className="section">
      <div className="container">
        <div className="content">
          <ul>
            <li>
              <img src="./images/home-page-fashion-look-book-new.jpg" alt="" />
              <div className="txt">
                <p>The new collections</p>
                <h2>
                  LOOK <br />
                  BOOK
                </h2>
                <Link to="/null">the lookbook</Link>
              </div>
            </li>
            <li>
              <img src="./images/home-page-fashion-newsletter-bg.jpg" alt="" />
              <div className="txt">
                <h2>HURRY!</h2>
                <span>NEWSLETTER AND GET DISCOUNT 25% OFF</span>
                <p>
                  Sign up for newsletter and
                  <br />
                  get 10% cash back offer
                </p>
                <form>
                  <input
                    type="email"
                    name=""
                    id=""
                    placeholder="Enter your email..."
                    onChange={changeEmail}
                  />
                  <button onClick={clickSubmit}>
                    SUBSCRIBE<i className="bi bi-arrow-right-short"></i>
                  </button>
                </form>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Section4Component;
