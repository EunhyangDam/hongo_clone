import { React, useEffect } from "react";
import "../scss/HeaderComponent.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../../store/signIn";
import axios from "axios";
import useCustomAlink from "./custom/useCustomALink";

function HeaderComponent(props) {
  const { onClickALink } = useCustomAlink();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const userData = useSelector((state) => state.signIn.name);
  const userID = useSelector((state) => state.signIn.ID);

  useEffect(() => {
    // GNB
    const _header = document.querySelector("#header");
    const mainBtn = document.querySelectorAll("#header .main-btn");
    const sub = document.querySelectorAll("#header .sub");
    const subBtn = document.querySelectorAll("#header .sub-btn");
    const col2 = document.querySelector("#header .col.col2");
    const toggle = document.querySelector("#header .toggle");

    let state = {
      curNum: 0,
    };
    let { curNum } = state;

    /** # header menu */

    /** ## header 초기화 함수*/
    let desktopHeaderHeight = Array(mainBtn.length).fill(0);
    const init = () => {
      mainBtn.forEach((el) => {
        el.classList.remove("active");
      });
      sub.forEach((el, idx) => {
        desktopHeaderHeight[idx] = el.scrollHeight;
        el.style.height = 0;
        el.classList.remove("active");
      });
      subBtn.forEach((remove) => {
        remove.classList.remove("active");
        document.querySelectorAll(".sub-sub").forEach((subEl) => {
          subEl.classList.remove("active");
        });
      });
    };

    const mainBtnHandler = (e, idx) => {
      init();
      e.target.classList.add("active");
      e.target.style.transition = "height 0s";
      sub[idx].classList.add("active");
      sub[idx].style.height = `${desktopHeaderHeight[idx]}px`;
      curNum = idx;
    };

    const desktop = () => {
      /**## header menu mouseenter*/

      mainBtn.forEach((el, idx) => {
        el.addEventListener("mouseenter", (e) => mainBtnHandler(e, idx));
      });

      /**## header menu mouseleave */
      document
        .querySelector("#header #gnb")
        .addEventListener("mouseleave", () => {
          if (document.documentElement.clientWidth <= 991) return;
          init();
          mainBtn[curNum].style.transition = "all 0.3s";
          sub[curNum].style.transition = "all 0.3s";
        });
    };
    const desktopInit = () => {};

    /** ## mobile toggle event */
    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      col2.classList.contains("active")
        ? col2.classList.remove("active")
        : col2.classList.add("active");
    });

    const mobile = () => {
      let subHeight = Array(mainBtn.length).fill(0);
      let t = Array(mainBtn.length).fill(false);
      mainBtn.forEach((el, idx) => {
        subHeight[idx] = sub[idx].scrollHeight;
        /**### desktop mouse event remove */
        el.removeEventListener("mouseenter", (e) => mainBtnHandler(e, idx));
        el.addEventListener("click", (e) => {
          e.preventDefault();
          if (t[idx] === true) {
            t[idx] = false;
            init();
            return;
          }
          init();
          t[idx] = true;
          sub[idx].style.height = `${subHeight[idx]}px`;
          sub[idx].classList.add("active");
          e.target.style.transition = "height 0s";
        });
      });
    };

    const mobileInit = () => {
      col2.classList.remove("active");
      init();
    };

    const resizeFn = () => {
      if (document.documentElement.clientWidth <= 991) {
        desktopInit();
        mobile();
      }
      if (document.documentElement.clientWidth > 991) {
        mobileInit();
        desktop();
      }
    };
    resizeFn();
    window.addEventListener("resize", () => resizeFn());

    /**header scroll event */
    let prevScroll = 0;
    let curScroll = 0;
    function transparent() {
      if (curScroll === 0) {
        _header.classList.add("tns");
      } else {
        _header.classList.remove("tns");
      }
    }
    transparent();

    window.addEventListener("scroll", function () {
      prevScroll = curScroll;
      curScroll = this.scrollY;
      if (curScroll - prevScroll < 0) {
        /**scroll up */
        _header.classList.remove("active");
      } else if (curScroll - prevScroll > 0) {
        /**scroll down */
        col2.classList.remove("active");
        _header.classList.add("active");
      }
      transparent();
    });
  }, []);
  const clickLogOut = (e) => {
    e.preventDefault();
    dispatch(logOutAction());
  };

  // eslint-disable-next-line
  const clickUserName = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userID", userID);
    axios({
      url: "/hongo_sign_up/sign_up_select.php",
      method: "POST",
      data: formData,
    })
      .then((res) => {
        navigate("/sub10SignUpUpdate", { state: res.data });
      })
      .catch((err) => {
        alert("ERROR");
        console.log(err);
      });
  };
  return (
    <>
      <header id="header">
        <div className="col col1">
          <h1>
            <a
              href="/"
              title="hongo"
              onClick={(e) => onClickALink(e, "https://www.google.com/")}
            >
              <img src="./images/logo.png" alt="" />
            </a>
          </h1>
        </div>
        <div className="col col2">
          <nav id="gnb">
            <ul>
              <li>
                <a href="./" className="main-btn" title="Home">
                  <span>Home</span>
                </a>
                <div className="sub home">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="img-container"
                        >
                          <img src="./images/fashion-menu-1.jpg" alt="" />
                        </a>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="txt-container"
                        >
                          <p>Fashion</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="img-container"
                        >
                          <img src="./images/furniture-menu.jpg" alt="" />
                        </a>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="txt-container"
                        >
                          <p>Furniture</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="img-container"
                        >
                          <img src="./images/jewellery-menu.jpg" alt="" />
                        </a>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="txt-container"
                        >
                          <p>Jewellery</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="img-container"
                        >
                          <img src="./images/watch-menu.jpg" alt="" />
                        </a>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="txt-container"
                        >
                          <p>watch</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="img-container"
                        >
                          <img src="./images/electronic-menu.jpg" alt="" />
                        </a>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="txt-container"
                        >
                          <p>electronic</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="img-container"
                        >
                          <img src="./images/decor-menu.jpg" alt="" />
                        </a>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="txt-container"
                        >
                          <p>decor</p>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="img-container"
                        >
                          <img src="./images/sports-menu.jpg" alt="" />
                        </a>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="txt-container"
                        >
                          <p>sports</p>
                          <span className="new">New</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="img-container"
                        >
                          <img src="./images/lingerie-menu.jpg" alt="" />
                        </a>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="txt-container"
                        >
                          <p>lingerie</p>
                        </a>
                      </li>
                    </ul>
                    <a href="!#">view all demos</a>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="/sub01NewProduct"
                  className="main-btn"
                  title="Shop"
                  onClick={(e) => onClickALink(e, "/sub01NewProduct")}
                >
                  <span>New Product</span>
                </a>
                <div className="sub text shop">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl>
                          <dt>Shop style</dt>
                          <dd>
                            <a href="!#">Shop – classNameic </a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – Minimalist</a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – Metro</a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – Flat</a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – Modern</a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – Clean</a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – Masonry</a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – Standard</a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – List</a>
                          </dd>
                          <dd>
                            <a href="!#"> Shop – Simple</a>
                          </dd>
                          <dd className="needFlex">
                            <a href="!#"> Shop – Boxed</a>
                            <span className="new">New</span>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Product page style</dt>
                          <dd>
                            <a href="!#"> Product – classNameic</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Right content</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Carousel</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Left content</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Default</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Sticky</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Modern</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Extended descriptions</a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Product types</dt>
                          <dd>
                            <a href="!#"> Product – Simple</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Variable</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Grouped</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – External / Affiliate</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Sale</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Out of stock</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Video</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – New</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – 360° degree</a>
                          </dd>
                          <dd>
                            <a href="!#"> Product – Countdown deal</a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Shop style</dt>
                          <dd>
                            <a href="!#"> User dashboard</a>
                          </dd>
                          <dd>
                            <a href="!#"> My account</a>
                          </dd>
                          <dd>
                            <a href="!#"> Order tracking</a>
                          </dd>
                          <dd>
                            <a href="!#"> Cart</a>
                          </dd>
                          <dd>
                            <a href="!#"> Checkout</a>
                          </dd>
                          <dd>
                            <a href="!#"> Wishlist</a>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                    <div className="sub-img-container">
                      <div className="col col1">
                        <a href="!#">
                          <img src="./images/menu-banner-01.jpg" alt="" />
                        </a>
                      </div>
                      <div className="col col2">
                        <a href="!#">
                          <img src="./images/menu-banner-02.jpg" alt="" />
                        </a>
                      </div>
                      <div className="col col3">
                        <a href="!#">
                          <img src="./images/menu-banner-03.jpg" alt="" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="/sub02BestProduct"
                  className="main-btn"
                  title="Best Product"
                  onClick={(e) => onClickALink(e, "/sub02BestProduct")}
                >
                  <span>Best Product</span>
                </a>
                <div className="sub sale text">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl className="icon">
                          <dt>Product categories</dt>
                          <dd>
                            <div className="img-container">
                              <a href="!#">
                                <img
                                  src="/images/category-1-64x64.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            Casual shirts
                          </dd>
                          <dd>
                            <div className="img-container">
                              <a href="!#">
                                <img
                                  src="/images/category-2-64x64.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            Leather bags
                          </dd>
                          <dd>
                            <div className="img-container">
                              <a href="!#">
                                <img
                                  src="/images/category-3-64x64.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            Men's shorts
                          </dd>
                          <dd>
                            <div className="img-container">
                              <a href="!#">
                                <img
                                  src="/images/category-4-64x64.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            Polo t-shirts
                          </dd>
                          <dd>
                            <div className="img-container">
                              <a href="!#">
                                <img
                                  src="/images/category-5-64x64.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            Short skirts
                          </dd>
                          <dd>
                            <div className="img-container">
                              <a href="!#">
                                <img
                                  src="/images/category-8-64x64.jpg"
                                  alt=""
                                />
                              </a>
                            </div>
                            Winter jackets
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl className="product">
                          <dt>Featured products</dt>
                          <dd>
                            <img src="images/image-hotspot-02.jpg" alt="" />
                            <div className="txt-container">
                              <p className="heading">
                                <a href="!#">Stylish shirt</a>
                              </p>
                              <div className="rated">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                              </div>
                              <div className="price">$120.00</div>
                            </div>
                          </dd>
                          <dd>
                            <img
                              src="images/fashion-featured-products-01.jpg"
                              alt=""
                            />
                            <div className="txt-container">
                              <p className="heading">
                                <a href="!#">Cotton Polo T-Shirt </a>
                              </p>
                              <div className="rated">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                              </div>
                              <div className="price">
                                <span className="original">$150.00</span>
                                <span className="sale">$130.00</span>
                              </div>
                            </div>
                          </dd>
                          <dd>
                            <img
                              src="images/fashion-featured-products-02.jpg"
                              alt=""
                            />
                            <div className="txt-container">
                              <p className="heading">
                                <a href="!#">Crewneck T-shirt </a>
                              </p>
                              <div className="rated">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                              </div>
                              <div className="price">$10.00</div>
                            </div>
                          </dd>
                        </dl>
                      </li>
                      <li className="image">
                        <a href="!#">
                          <img src="./images/sale-banner-02.jpg" alt="" />
                        </a>
                      </li>
                      <li className="image">
                        <a href="!#">
                          <img src="./images/sale-banner-01.jpg" alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="/sub03FleaMarket"
                  className="main-btn"
                  title="Flea Market"
                  onClick={(e) => onClickALink(e, "/sub03FleaMarket")}
                >
                  <span>Flea Market</span>
                </a>
                <div className="sub page text">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl>
                          <dt>Basic pages</dt>
                          <dd>
                            <a href="!#">About classNameic</a>
                          </dd>
                          <dd>
                            <a href="!#">About modern</a>
                          </dd>
                          <dd>
                            <a href="!#">The team</a>
                          </dd>
                          <dd>
                            <a href="!#">Our services</a>
                          </dd>
                          <dd>
                            <a href="!#">Our brands</a>
                          </dd>
                          <dd>
                            <a href="!#">Get the voucher</a>
                          </dd>
                          <dd>
                            <a href="!#">Pricing plans</a>
                          </dd>
                          <dd>
                            <a href="!#">Store locator</a>
                          </dd>
                          <dd>
                            <a href="!#">Contact classNameic</a>
                          </dd>
                          <dd>
                            <a href="!#">Contact modern</a>
                          </dd>
                          <dd>
                            <a href="!#">Testimonials</a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Information pages</dt>
                          <dd>
                            <a href="!#">Terms and conditions</a>
                          </dd>
                          <dd>
                            <a href="!#">Privacy policy</a>
                          </dd>
                          <dd>
                            <a href="!#">Size guide</a>
                          </dd>
                          <dd>
                            <a href="!#">Help and support</a>
                          </dd>
                          <dd>
                            <a href="!#">Payment method</a>
                          </dd>
                          <dd>
                            <a href="!#">Shipping and delivery</a>
                          </dd>
                          <dd>
                            <a href="!#">Returns and refunds</a>
                          </dd>
                          <dd>
                            <a href="!#">FAQs</a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Extra pages</dt>
                          <dd>
                            <a href="!#">404 error</a>
                          </dd>
                          <dd>
                            <a href="!#">Coming soon</a>
                          </dd>
                          <dd>
                            <a href="!#">Maintenance</a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <a href="!#">
                          <img src="./images/menu-banner-04.jpg" alt="" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="blog">
                <a
                  href="/sub04SpecialOffer"
                  className="main-btn"
                  title="Special Offer"
                  onClick={(e) => onClickALink(e, "/sub04SpecialOffer")}
                >
                  <span>Special Offer</span>
                </a>
                <div className="sub">
                  <div className="sub-container sub-width">
                    <ul>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog standard</span>
                          <i className="bi bi-heart-fill"></i>
                        </a>
                        <div className="sub-sub">
                          <div className="sub-sub-container sub-width">
                            <ul>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Blog full width"
                                >
                                  <span>Blog full width</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Blog left sidebar"
                                >
                                  <span>Blog left sidebar</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Blog right sidebar"
                                >
                                  <span>Blog right sidebar</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog side image</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog masonry</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog grid</span>{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog clean</span>{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog modern</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog text only</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog overlay image</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Blog image</span>{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Post layout</span>
                          <i className="bi bi-chevron-right"></i>
                        </a>
                        <div className="sub-sub">
                          <div className="sub-sub-container sub-width">
                            <ul>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Layout – Styles 01"
                                >
                                  <span>Layout – Styles 01</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Layout – Styles 02"
                                >
                                  <span>Layout – Styles 02</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Layout – Styles 03"
                                >
                                  <span>Layout – Styles 03</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Layout – Styles 04"
                                >
                                  <span>Layout – Styles 04</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Layout – Styles 05"
                                >
                                  <span>Layout – Styles 05</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <a
                          href="!#"
                          onClick={(e) => onClickALink(e, null)}
                          className="sub-btn"
                        >
                          <span>Post type</span>
                          <i className="bi bi-chevron-rightt"></i>
                        </a>
                        <div className="sub-sub">
                          <div className="sub-sub-container sub-width">
                            <ul>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Standard post"
                                >
                                  <span>Standard post</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Gallery post"
                                >
                                  <span>Gallery post</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Images slider post"
                                >
                                  <span>Images slider post</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="HTML5 video post"
                                >
                                  <span>HTML5 video post</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Youtube video post"
                                >
                                  <span>Youtube video post</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Vimeo video post"
                                >
                                  <span>Vimeo video post</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Audio post"
                                >
                                  <span>Audio post</span>
                                </a>
                              </li>
                              <li>
                                <a
                                  href="!#"
                                  onClick={(e) => onClickALink(e, null)}
                                  title="Blockquote post"
                                >
                                  <span>Blockquote post</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="/sub12NoticeBoardList"
                  className="main-btn"
                  title="Elements"
                  onClick={(e) => onClickALink(e, "/sub12NoticeBoardList")}
                >
                  <span>Notices</span>
                </a>
                <div className="sub text">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl>
                          <dt>Shop elements</dt>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-list-task"></i>Product list
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              className="needFlex"
                            >
                              <i className="bi bi-battery"></i>Product carousel
                              <span className="new">New</span>
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-menu-button-wide"></i>Product
                              widget
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              className="needFlex"
                            >
                              <i className="bi bi-list-task"></i>Category
                              listing
                              <span className="new">New</span>
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-folder2"></i>Product tab
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-cart"></i> Best selling
                              products
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-bookmark"></i>Featured
                              products
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-box-seam"></i>New products
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-truck"></i>On sale product
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-dropbox"></i>Recent products
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-award-fill"></i>Top rated
                              products
                            </a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>General elements</dt>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-substack"></i>Accordions
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-mouse-fill"></i>Buttons
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-person"></i>Team
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-sliders2"></i>Team carousel
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-arrows-move"></i>Brands
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-sliders2"></i>Brands carousel
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              className="needFlex"
                            >
                              <i className="bi bi-bookmark-fill"></i>Subscribe
                              <span className="new">New</span>
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-headset"></i>Call to action
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-folder2"></i>Tab
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-geo-alt-fill"></i>Google map
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-clipboard-fill"></i>Contact
                              form
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-images"></i>Image gallery
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-instagram"></i>Instagram
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-stack"></i>Popup
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-share-fill"></i>Social icons
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-chat-fill"></i>Testimonials
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-chat-text-fill"></i>
                              Testimonials carousel
                            </a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Infographics / Interactive</dt>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-hourglass-split"></i>
                              Process bar
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-cassette-fill"></i> Icon with
                              text
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-square-half"></i>Custom icon
                              with text
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-stopwatch"></i>Counters
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-stopwatch-fill"></i> Countdown
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-badge-cc-fill"></i> Text box
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-cassette-fill"></i>Fancy text
                              box
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-camera-video-fill"></i>Video
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-card-image"></i>Interactive
                              banners
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-card-image"></i>Shop banner
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-grid-3x2-gap-fill"></i>Info
                              banners
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-arrow-repeat"></i>Rotate box
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-arrows-vertical"></i>Process
                              step
                            </a>
                          </dd>
                          <dd>
                            <a href="!#">
                              <i className="bi bi-wifi"></i>Image hotspot
                            </a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Text & containers</dt>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Heading"
                            >
                              <i className="bi bi-fonts"></i>Heading
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Dropcaps"
                            >
                              <i className="bi bi-menu-button-wide"></i>Dropcaps
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Columns"
                            >
                              <i className="bi bi-layout-three-columns"></i>
                              Columns
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Blockquote"
                            >
                              <i className="bi bi-quote"></i>Blockquote
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Highlights"
                            >
                              <i className="bi bi-type-underline"></i>Highlights
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Message box"
                            >
                              <i className="bi bi-chat-left-fill"></i>Message
                              box
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Lists"
                            >
                              <i className="bi bi-list-ul"></i>Lists
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Separators"
                            >
                              <i className="bi bi-list"></i>Separators
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Pricing table"
                            >
                              <i className="bi bi-table"></i>Pricing table
                            </a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              title="Tables"
                            >
                              <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                              Tables
                            </a>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a
                  href="!#"
                  onClick={(e) => onClickALink(e, null)}
                  className="main-btn"
                  title="Features"
                >
                  <span>Features</span>
                </a>
                <div className="sub text">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl>
                          <dt>Header style</dt>
                          <dd>
                            <a href="!#">Transparent header</a>
                          </dd>
                          <dd>
                            <a href="!#">White header</a>
                          </dd>
                          <dd>
                            <a href="!#">Dark header</a>
                          </dd>
                          <dd>
                            <a href="!#">Left navigation</a>
                          </dd>
                          <dd>
                            <a href="!#">Header with sticky top bar</a>
                          </dd>
                          <dd>
                            <a href="!#">Header with push</a>
                          </dd>
                          <dd>
                            <a href="!#">Center navigation</a>
                          </dd>
                          <dd>
                            <a href="!#">Center logo</a>
                          </dd>
                          <dd>
                            <a href="!#">Top logo</a>
                          </dd>
                          <dd>
                            <a href="!#">One page navigation</a>
                          </dd>
                          <dd>
                            <a href="!#">Left menu</a>
                          </dd>
                          <dd>
                            <a href="!#">Hamburger</a>
                          </dd>
                          <dd>
                            <a href="!#">With categories menu</a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Title style</dt>
                          <dd>
                            <a href="!#">Left alignment</a>
                          </dd>
                          <dd>
                            <a href="!#">Right alignment</a>
                          </dd>
                          <dd>
                            <a href="!#">Center alignment</a>
                          </dd>
                          <dd>
                            <a href="!#">classNameic title style</a>
                          </dd>
                          <dd>
                            <a href="!#">Modern title style</a>
                          </dd>
                          <dd>
                            <a href="!#">Clean title style</a>
                          </dd>
                          <dd>
                            <a href="!#">Parallax image background</a>
                          </dd>
                          <dd>
                            <a href="!#">Gallery background</a>
                          </dd>
                          <dd>
                            <a href="!#">Background video</a>
                          </dd>
                          <dd>
                            <a href="!#">Mini version</a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Shop features</dt>
                          <dd>
                            <a href="!#">Left sidebar</a>
                          </dd>
                          <dd>
                            <a href="!#">Right sidebar</a>
                          </dd>
                          <dd>
                            <a href="!#">Without sidebar</a>
                          </dd>
                          <dd>
                            <a href="!#">Top filter</a>
                          </dd>
                          <dd>
                            <a href="!#">Off canvas filter</a>
                          </dd>
                          <dd>
                            <a href="!#">Infinity scroll</a>
                          </dd>
                          <dd>
                            <a href="!#">Sticky add to cart</a>
                          </dd>
                          <dd>
                            <a href="!#">Product image gallery</a>
                          </dd>
                        </dl>
                        <dl>
                          <dt>Shop layout</dt>
                          <dd>
                            <a href="!#">Two columns grid</a>
                          </dd>
                          <dd>
                            <a href="!#">Three columns grid</a>
                          </dd>
                          <dd>
                            <a href="!#">Four columns grid</a>
                          </dd>
                          <dd>
                            <a href="!#">Five columns grid</a>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Footer style</dt>
                          <dd>
                            <a href="!#">Footer – Style 01</a>
                          </dd>
                          <dd>
                            <a href="!#">Footer – Style 02</a>
                          </dd>
                          <dd>
                            <a href="!#">Footer – Style 03</a>
                          </dd>
                          <dd>
                            <a href="!#">Footer – Style 04</a>
                          </dd>
                          <dd>
                            <a href="!#">Footer – Style 05</a>
                          </dd>
                          <dd>
                            <a href="!#">Footer – Style 06</a>
                          </dd>
                          <dd>
                            <a href="!#">Footer – Style 07</a>
                          </dd>
                          <dd>
                            <a href="!#">Footer – Style 08</a>
                          </dd>
                          <dd>
                            <a href="!#">Footer – Style 09</a>
                          </dd>
                          <dd>
                            <a
                              href="!#"
                              onClick={(e) => onClickALink(e, null)}
                              className="needFlex"
                            >
                              Footer – Style 10<span className="new">New</span>
                            </a>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
          <div className="toggle">
            <a href="!#">
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
        </div>
        <div className="col col3">
          <aside id="aside">
            <ul>
              <li className="toggle-box">
                <span></span>
                <span></span>
                <span></span>
              </li>
              {userData && (
                <>
                  <li style={{ color: "#a2c153" }}>{userData} 님.</li>
                  <li>
                    <button onClick={clickLogOut}>log out</button>
                  </li>
                </>
              )}
              <li>
                <a href="!#" onClick={(e) => onClickALink(e, null)} title="">
                  <i className="bi bi-search"></i>
                </a>
              </li>
              <li>
                {userData ? (
                  <a
                    href="!#"
                    onClick={(e) => onClickALink(e, "/sub10SignUpUpdate")}
                    title=""
                  >
                    <i className="bi bi-person-fill"></i>
                  </a>
                ) : (
                  <a
                    href="/sub11signInForm"
                    title=""
                    onClick={(e) => onClickALink(e, "/sub11signInForm")}
                  >
                    <i className="bi bi-person-fill"></i>
                  </a>
                )}
              </li>
              <li>
                <a
                  href="/subWishList"
                  title=""
                  onClick={(e) => onClickALink(e, "/subWishList")}
                >
                  <i className="bi bi-heart-fill"></i>
                </a>
              </li>
              <li>
                <a
                  href="/sub06Cart"
                  title=""
                  onClick={(e) => onClickALink(e, "/sub06Cart")}
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </a>
                {cart.length > 0 && (
                  <span className="length">{cart.length}</span>
                )}
              </li>
            </ul>
          </aside>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default HeaderComponent;
