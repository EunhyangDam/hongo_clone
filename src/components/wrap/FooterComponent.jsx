import React from "react";
import "../scss/FooterComponent.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import useCustomAlink from "./custom/useCustomALink";
function FooterComponent(props) {
  const { onClickALink } = useCustomAlink();

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
      url: "/hongo_email2/insert_email.php",
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
    <footer id="footer">
      <div className="row row1">
        <div className="container">
          <div className="left">
            <p>Last Chance To Win Our Discount!</p>
            <form>
              <input
                type="email"
                name="footerEmail"
                id="footerEmail"
                placeholder="Enter your email..."
                onChange={changeEmail}
              />
              <button onClick={clickSubmit}>
                SUBSCRIBE<i className="bi bi-arrow-right-short"></i>
              </button>
            </form>
          </div>
          <div className="right">
            <p>On Social Networks</p>
            <div className="icon-container">
              <ul>
                <li>
                  <i className="bi bi-facebook"></i>
                </li>
                <li>
                  <i className="bi bi-twitter"></i>
                </li>
                <li>
                  <i className="bi bi-linkedin"></i>
                </li>
                <li>
                  <i className="bi bi-instagram"></i>
                </li>
                <li>
                  <i className="bi bi-pinterest"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row row2">
        <div className="container">
          <ul>
            <li className="col col1">
              <h1>
                <a href="/null" onClick={(e) => onClickALink(e, null)}>
                  <img src="./images/footer-logo.png" alt="" />
                </a>
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry lorem Ipsum is simply dummy text of industry lorem
                ipsum is simply dummy typesetting text.
              </p>
            </li>
            <li className="col col2">
              <dl>
                <dt>CATEGORIES</dt>
                <dd>Women collection</dd>
                <dd>Men collection</dd>
                <dd>Child collection</dd>
                <dd>Accessories</dd>
                <dd>Leather shoes</dd>
              </dl>
            </li>
            <li className="col col3">
              <dl>
                <dt>CUSTOMER</dt>
                <dd>Help and support</dd>
                <dd>Shipping and delivery</dd>
                <dd>Payment method</dd>
                <dd>Terms and conditions</dd>
                <dd>Privacy policy</dd>
              </dl>
            </li>
            <li className="col col4">
              <dl>
                <dt>COMPANY</dt>
                <dd>About company</dd>
                <dd>Our services</dd>
                <dd>Get the voucher</dd>
                <dd>Store locator</dd>
                <dd>Contact us</dd>
              </dl>
            </li>
            <li className="col col5">
              <dl>
                <dt>Follow us on Instagram</dt>
                <dd>
                  <a href="/null" onClick={(e) => onClickALink(e, null)}>
                    <img src="./images/infa-01.jpg" alt="" />
                    <i className="bi bi-instagram"></i>
                  </a>
                </dd>
                <dd>
                  <a href="/null" onClick={(e) => onClickALink(e, null)}>
                    <img src="./images/infa-02.jpg" alt="" />
                    <i className="bi bi-instagram"></i>
                  </a>
                </dd>
                <dd>
                  <a href="/null" onClick={(e) => onClickALink(e, null)}>
                    <img src="./images/infa-03.jpg" alt="" />
                    <i className="bi bi-instagram"></i>
                  </a>
                </dd>
                <dd>
                  <a href="/null" onClick={(e) => onClickALink(e, null)}>
                    <img src="./images/infa-04.jpg" alt="" />
                    <i className="bi bi-instagram"></i>
                  </a>
                </dd>
                <dd>
                  <a href="/null" onClick={(e) => onClickALink(e, null)}>
                    <img src="./images/infa-05.jpg" alt="" />
                    <i className="bi bi-instagram"></i>
                  </a>
                </dd>
                <dd>
                  <a href="/null" onClick={(e) => onClickALink(e, null)}>
                    <img src="./images/infa-06.jpg" alt="" />
                    <i className="bi bi-instagram"></i>
                  </a>
                </dd>
                <dd>
                  <a href="/null" onClick={(e) => onClickALink(e, null)}>
                    <img src="./images/infa-07.jpg" alt="" />
                    <i className="bi bi-instagram"></i>
                  </a>
                </dd>
                <dd>
                  <a href="/null" onClick={(e) => onClickALink(e, null)}>
                    <img src="./images/infa-08.jpg" alt="" />
                    <i className="bi bi-instagram"></i>
                  </a>
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
      <div className="row row3">
        <div className="container">
          <div className="col col1">
            © 2025 HONGO is Proudly Powered by{" "}
            <a href="/null" onClick={(e) => onClickALink(e, null)}>
              ThemeZaa
            </a>
          </div>
          <div className="col col2">
            <img src="./images/footer-payment-icon.png" alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
