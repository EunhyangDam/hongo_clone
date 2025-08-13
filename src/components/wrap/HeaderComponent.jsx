import { React, useEffect } from "react";
import "../scss/HeaderComponent.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction, signInAction } from "../../store/signIn";
import axios from "axios";

function HeaderComponent(props) {
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
            <a href="./" title="hongo">
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
                        <Link to="/null" className="img-container">
                          <img src="./images/fashion-menu-1.jpg" alt="" />
                        </Link>
                        <Link to="/null" className="txt-container">
                          <p>Fashion</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="img-container">
                          <img src="./images/furniture-menu.jpg" alt="" />
                        </Link>
                        <Link to="/null" className="txt-container">
                          <p>Furniture</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="img-container">
                          <img src="./images/jewellery-menu.jpg" alt="" />
                        </Link>
                        <Link to="/null" className="txt-container">
                          <p>Jewellery</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="img-container">
                          <img src="./images/watch-menu.jpg" alt="" />
                        </Link>
                        <Link to="/null" className="txt-container">
                          <p>watch</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="img-container">
                          <img src="./images/electronic-menu.jpg" alt="" />
                        </Link>
                        <Link to="/null" className="txt-container">
                          <p>electronic</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="img-container">
                          <img src="./images/decor-menu.jpg" alt="" />
                        </Link>
                        <Link to="/null" className="txt-container">
                          <p>decor</p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="img-container">
                          <img src="./images/sports-menu.jpg" alt="" />
                        </Link>
                        <Link to="/null" className="txt-container">
                          <p>sports</p>
                          <span className="new">New</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="img-container">
                          <img src="./images/lingerie-menu.jpg" alt="" />
                        </Link>
                        <Link to="/null" className="txt-container">
                          <p>lingerie</p>
                        </Link>
                      </li>
                    </ul>
                    <Link to="/null">view all demos</Link>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/sub01NewProduct" className="main-btn" title="Shop">
                  <span>New Product</span>
                </Link>
                <div className="sub text shop">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl>
                          <dt>Shop style</dt>
                          <dd>
                            <Link to="/null">Shop – classNameic </Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – Minimalist</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – Metro</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – Flat</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – Modern</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – Clean</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – Masonry</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – Standard</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – List</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Shop – Simple</Link>
                          </dd>
                          <dd className="needFlex">
                            <Link to="/null"> Shop – Boxed</Link>
                            <span className="new">New</span>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Product page style</dt>
                          <dd>
                            <Link to="/null"> Product – classNameic</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Right content</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Carousel</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Left content</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Default</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Sticky</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Modern</Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              {" "}
                              Product – Extended descriptions
                            </Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Product types</dt>
                          <dd>
                            <Link to="/null"> Product – Simple</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Variable</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Grouped</Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              {" "}
                              Product – External / Affiliate
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Sale</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Out of stock</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Video</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – New</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – 360° degree</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Product – Countdown deal</Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Shop style</dt>
                          <dd>
                            <Link to="/null"> User dashboard</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> My account</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Order tracking</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Cart</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Checkout</Link>
                          </dd>
                          <dd>
                            <Link to="/null"> Wishlist</Link>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                    <div className="sub-img-container">
                      <div className="col col1">
                        <Link to="/null">
                          <img src="./images/menu-banner-01.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="col col2">
                        <Link to="/null">
                          <img src="./images/menu-banner-02.jpg" alt="" />
                        </Link>
                      </div>
                      <div className="col col3">
                        <Link to="/null">
                          <img src="./images/menu-banner-03.jpg" alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="/sub02BestProduct"
                  className="main-btn"
                  title="Best Product"
                >
                  <span>Best Product</span>
                </Link>
                <div className="sub sale text">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl className="icon">
                          <dt>Product categories</dt>
                          <dd>
                            <div className="img-container">
                              <Link to="/null">
                                <img
                                  src="/images/category-1-64x64.jpg"
                                  alt=""
                                />
                              </Link>
                            </div>
                            Casual shirts
                          </dd>
                          <dd>
                            <div className="img-container">
                              <Link to="/null">
                                <img
                                  src="/images/category-2-64x64.jpg"
                                  alt=""
                                />
                              </Link>
                            </div>
                            Leather bags
                          </dd>
                          <dd>
                            <div className="img-container">
                              <Link to="/null">
                                <img
                                  src="/images/category-3-64x64.jpg"
                                  alt=""
                                />
                              </Link>
                            </div>
                            Men's shorts
                          </dd>
                          <dd>
                            <div className="img-container">
                              <Link to="/null">
                                <img
                                  src="/images/category-4-64x64.jpg"
                                  alt=""
                                />
                              </Link>
                            </div>
                            Polo t-shirts
                          </dd>
                          <dd>
                            <div className="img-container">
                              <Link to="/null">
                                <img
                                  src="/images/category-5-64x64.jpg"
                                  alt=""
                                />
                              </Link>
                            </div>
                            Short skirts
                          </dd>
                          <dd>
                            <div className="img-container">
                              <Link to="/null">
                                <img
                                  src="/images/category-8-64x64.jpg"
                                  alt=""
                                />
                              </Link>
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
                                <Link to="/null">Stylish shirt</Link>
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
                                <Link to="/null">Cotton Polo T-Shirt </Link>
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
                                <Link to="/null">Crewneck T-shirt </Link>
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
                        <Link to="/null">
                          <img src="./images/sale-banner-02.jpg" alt="" />
                        </Link>
                      </li>
                      <li className="image">
                        <Link to="/null">
                          <img src="./images/sale-banner-01.jpg" alt="" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="/sub03FleaMarket"
                  className="main-btn"
                  title="Flea Market"
                >
                  <span>Flea Market</span>
                </Link>
                <div className="sub page text">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl>
                          <dt>Basic pages</dt>
                          <dd>
                            <Link to="/null">About classNameic</Link>
                          </dd>
                          <dd>
                            <Link to="/null">About modern</Link>
                          </dd>
                          <dd>
                            <Link to="/null">The team</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Our services</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Our brands</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Get the voucher</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Pricing plans</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Store locator</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Contact classNameic</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Contact modern</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Testimonials</Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Information pages</dt>
                          <dd>
                            <Link to="/null">Terms and conditions</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Privacy policy</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Size guide</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Help and support</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Payment method</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Shipping and delivery</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Returns and refunds</Link>
                          </dd>
                          <dd>
                            <Link to="/null">FAQs</Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Extra pages</dt>
                          <dd>
                            <Link to="/null">404 error</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Coming soon</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Maintenance</Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <Link to="/null">
                          <img src="./images/menu-banner-04.jpg" alt="" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="blog">
                <Link
                  to="/sub04SpecialOffer"
                  className="main-btn"
                  title="Special Offer"
                >
                  <span>Special Offer</span>
                </Link>
                <div className="sub">
                  <div className="sub-container sub-width">
                    <ul>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog standard</span>
                          <i className="bi bi-heart-fill"></i>
                        </Link>
                        <div className="sub-sub">
                          <div className="sub-sub-container sub-width">
                            <ul>
                              <li>
                                <Link to="/null" title="Blog full width">
                                  <span>Blog full width</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Blog left sidebar">
                                  <span>Blog left sidebar</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Blog right sidebar">
                                  <span>Blog right sidebar</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog side image</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog masonry</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog grid</span>{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog clean</span>{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog modern</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog text only</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog overlay image</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Blog image</span>{" "}
                        </Link>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Post layout</span>
                          <i className="bi bi-chevron-right"></i>
                        </Link>
                        <div className="sub-sub">
                          <div className="sub-sub-container sub-width">
                            <ul>
                              <li>
                                <Link to="/null" title="Layout – Styles 01">
                                  <span>Layout – Styles 01</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Layout – Styles 02">
                                  <span>Layout – Styles 02</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Layout – Styles 03">
                                  <span>Layout – Styles 03</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Layout – Styles 04">
                                  <span>Layout – Styles 04</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Layout – Styles 05">
                                  <span>Layout – Styles 05</span>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </li>
                      <li>
                        <Link to="/null" className="sub-btn">
                          <span>Post type</span>
                          <i className="bi bi-chevron-rightt"></i>
                        </Link>
                        <div className="sub-sub">
                          <div className="sub-sub-container sub-width">
                            <ul>
                              <li>
                                <Link to="/null" title="Standard post">
                                  <span>Standard post</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Gallery post">
                                  <span>Gallery post</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Images slider post">
                                  <span>Images slider post</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="HTML5 video post">
                                  <span>HTML5 video post</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Youtube video post">
                                  <span>Youtube video post</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Vimeo video post">
                                  <span>Vimeo video post</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Audio post">
                                  <span>Audio post</span>
                                </Link>
                              </li>
                              <li>
                                <Link to="/null" title="Blockquote post">
                                  <span>Blockquote post</span>
                                </Link>
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
                <Link to="/null" className="main-btn" title="Elements">
                  <span>Elements</span>
                </Link>
                <div className="sub text">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl>
                          <dt>Shop elements</dt>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-list-task"></i>Product list
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" className="needFlex">
                              <i className="bi bi-battery"></i>Product carousel
                              <span className="new">New</span>
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-menu-button-wide"></i>Product
                              widget
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" className="needFlex">
                              <i className="bi bi-list-task"></i>Category
                              listing
                              <span className="new">New</span>
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-folder2"></i>Product tab
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-cart"></i> Best selling
                              products
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-bookmark"></i>Featured
                              products
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-box-seam"></i>New products
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-truck"></i>On sale product
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-dropbox"></i>Recent products
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-award-fill"></i>Top rated
                              products
                            </Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>General elements</dt>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-substack"></i>Accordions
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-mouse-fill"></i>Buttons
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-person"></i>Team
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-sliders2"></i>Team carousel
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-arrows-move"></i>Brands
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-sliders2"></i>Brands carousel
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" className="needFlex">
                              <i className="bi bi-bookmark-fill"></i>Subscribe
                              <span className="new">New</span>
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-headset"></i>Call to action
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-folder2"></i>Tab
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-geo-alt-fill"></i>Google map
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-clipboard-fill"></i>Contact
                              form
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-images"></i>Image gallery
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-instagram"></i>Instagram
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-stack"></i>Popup
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-share-fill"></i>Social icons
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-chat-fill"></i>Testimonials
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-chat-text-fill"></i>
                              Testimonials carousel
                            </Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Infographics / Interactive</dt>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-hourglass-split"></i>
                              Process bar
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-cassette-fill"></i> Icon with
                              text
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-square-half"></i>Custom icon
                              with text
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-stopwatch"></i>Counters
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-stopwatch-fill"></i> Countdown
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-badge-cc-fill"></i> Text box
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-cassette-fill"></i>Fancy text
                              box
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-camera-video-fill"></i>Video
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-card-image"></i>Interactive
                              banners
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-card-image"></i>Shop banner
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-grid-3x2-gap-fill"></i>Info
                              banners
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-arrow-repeat"></i>Rotate box
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-arrows-vertical"></i>Process
                              step
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null">
                              <i className="bi bi-wifi"></i>Image hotspot
                            </Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Text & containers</dt>
                          <dd>
                            <Link to="/null" title="Heading">
                              <i className="bi bi-fonts"></i>Heading
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Dropcaps">
                              <i className="bi bi-menu-button-wide"></i>Dropcaps
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Columns">
                              <i className="bi bi-layout-three-columns"></i>
                              Columns
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Blockquote">
                              <i className="bi bi-quote"></i>Blockquote
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Highlights">
                              <i className="bi bi-type-underline"></i>Highlights
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Message box">
                              <i className="bi bi-chat-left-fill"></i>Message
                              box
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Lists">
                              <i className="bi bi-list-ul"></i>Lists
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Separators">
                              <i className="bi bi-list"></i>Separators
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Pricing table">
                              <i className="bi bi-table"></i>Pricing table
                            </Link>
                          </dd>
                          <dd>
                            <Link to="/null" title="Tables">
                              <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                              Tables
                            </Link>
                          </dd>
                        </dl>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/null" className="main-btn" title="Features">
                  <span>Features</span>
                </Link>
                <div className="sub text">
                  <div className="sub-container">
                    <ul>
                      <li>
                        <dl>
                          <dt>Header style</dt>
                          <dd>
                            <Link to="/null">Transparent header</Link>
                          </dd>
                          <dd>
                            <Link to="/null">White header</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Dark header</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Left navigation</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Header with sticky top bar</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Header with push</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Center navigation</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Center logo</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Top logo</Link>
                          </dd>
                          <dd>
                            <Link to="/null">One page navigation</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Left menu</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Hamburger</Link>
                          </dd>
                          <dd>
                            <Link to="/null">With categories menu</Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Title style</dt>
                          <dd>
                            <Link to="/null">Left alignment</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Right alignment</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Center alignment</Link>
                          </dd>
                          <dd>
                            <Link to="/null">classNameic title style</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Modern title style</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Clean title style</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Parallax image background</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Gallery background</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Background video</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Mini version</Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Shop features</dt>
                          <dd>
                            <Link to="/null">Left sidebar</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Right sidebar</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Without sidebar</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Top filter</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Off canvas filter</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Infinity scroll</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Sticky add to cart</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Product image gallery</Link>
                          </dd>
                        </dl>
                        <dl>
                          <dt>Shop layout</dt>
                          <dd>
                            <Link to="/null">Two columns grid</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Three columns grid</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Four columns grid</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Five columns grid</Link>
                          </dd>
                        </dl>
                      </li>
                      <li>
                        <dl>
                          <dt>Footer style</dt>
                          <dd>
                            <Link to="/null">Footer – Style 01</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Footer – Style 02</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Footer – Style 03</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Footer – Style 04</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Footer – Style 05</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Footer – Style 06</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Footer – Style 07</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Footer – Style 08</Link>
                          </dd>
                          <dd>
                            <Link to="/null">Footer – Style 09</Link>
                          </dd>
                          <dd>
                            <Link to="/null" className="needFlex">
                              Footer – Style 10<span className="new">New</span>
                            </Link>
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
            <Link to="/null">
              <span></span>
              <span></span>
              <span></span>
            </Link>
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
                <Link to="/null" title="">
                  <i className="bi bi-search"></i>
                </Link>
              </li>
              <li>
                {userData ? (
                  <a href="!#" title="" onClick={clickUserName}>
                    <i className="bi bi-person-fill"></i>
                  </a>
                ) : (
                  <Link to="/sub11signInForm" title="">
                    <i className="bi bi-person-fill"></i>
                  </Link>
                )}
              </li>
              <li>
                <Link to="/subWishList" title="">
                  <i className="bi bi-heart-fill"></i>
                </Link>
              </li>
              <li>
                <Link to="/sub06Cart" title="">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </Link>
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
