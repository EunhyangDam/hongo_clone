import React, { useEffect, useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub05ProductDetail.scss";
import { Link, replace, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { heartAddAction } from "../../../../store/wishlist";
import { modalAction } from "../../../../store/confirmModal";
import { cartAddAction } from "../../../../store/cart";
import useCustomAlink from "../../custom/useCustomALink";
export default function Sub05ProductDetail(props) {
  const { onClickALink } = useCustomAlink;
  const location = useLocation();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const cartData = useSelector((state) => state.cart.cart);

  const [state, setState] = useState({ data: {} });
  const [wish, setWish] = useState({ data: [] });
  const [cart, setCart] = useState({ data: [] });

  useEffect(() => {
    setState({
      data: location.state,
    });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);
  useEffect(() => {
    setWish({
      data: wishlist,
    });
  }, [wishlist]);
  useState(() => {
    setCart({
      data: cartData,
    });
  }, [cartData]);
  const changeDigit = (e) => {
    console.log(state.data.inventory);
    const regExp = /^[0-9]/g;
    let quantity = e.target.value.replace(regExp, "");
    let product = {
      ...state.data,
      quantity:
        Number(quantity) > state.data.inventory
          ? state.data.inventory
          : Number(quantity),
    };
    setState({
      data: product,
    });
  };
  const clickPlus = (e) => {
    e.preventDefault();
    let product = {
      ...state.data,
      quantity:
        state.data.quantity + 1 > state.data.inventory
          ? state.data.inventory
          : state.data.quantity + 1,
    };

    setState({
      data: product,
    });
  };
  const clickMinus = (e) => {
    e.preventDefault();
    let product = {
      ...state.data,
      quantity: state.data.quantity - 1 < 1 ? 0 : state.data.quantity - 1,
    };

    setState({
      data: product,
    });
  };
  const clickWishlist = (e) => {
    e.preventDefault();
    let isClicked = false;
    let arr = wish.data;
    arr.map((el) => el.id).includes(state.data.id) && (isClicked = true);
    if (!isClicked) {
      arr = [state.data, ...arr];
      dispatch(heartAddAction(arr));
      const obj = {
        messege: "위시리스트에 등록되었습니다.",
        isOn: true,
        isConfirm: false,
      };
      dispatch(modalAction(obj));
    } else {
      const obj = {
        messege: "위시리스트에 등록된 상품입니다.",
        isOn: true,
        isConfirm: false,
      };
      dispatch(modalAction(obj));
    }
  };
  const clickCart = (e) => {
    e.preventDefault();
    let arr = cart.data;
    let isCliked = false;
    arr.map((el) => el.id).includes(state.data.id) && (isCliked = true);
    if (!isCliked) {
      arr = [state.data, ...arr];
      dispatch(heartAddAction(arr));
      const obj = {
        messege: "장바구니에 등록되었습니다.",
        isOn: true,
        isConfirm: false,
      };
      dispatch(modalAction(obj));
    } else {
      arr = arr.map((el) =>
        el.id === state.data.id
          ? { ...el, quantity: el.quantity + state.data.quantity }
          : { ...el }
      );
      const obj = {
        messege: "수량이 추가되었습니다.",
        isOn: true,
        isConfirm: false,
      };
      dispatch(modalAction(obj));
    }
    dispatch(cartAddAction(arr));
  };
  return (
    <main id="sub05ProductDetail">
      <div className="container">
        <div className="title hide">product</div>
        <div className="content">
          <section className="section" id="section1">
            <div className="col1 col">
              <div className="left">
                <ul>
                  {Object.keys(state.data).length > 0 &&
                    state.data.thumbnail.map((el, idx) => (
                      <li key={idx}>
                        <a href="!#">
                          <img src={`./images/sub05/${el}`} alt="" />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="right">
                <div className="img-container">
                  <img src={`./images/${state.data.front}`} alt="" />
                </div>
              </div>
            </div>
            <div className="col2 col">
              <div className="row row1">
                <div className="site">
                  <a href="!#" onClick={(e) => onClickALink(e, null)}>
                    <span>Home</span>
                  </a>
                  <i className="bi bi-chevron-right"></i>
                  <a href="!#" onClick={(e) => onClickALink(e, null)}>
                    <span>Jacket collection</span>
                  </a>
                  <i className="bi bi-chevron-right"></i>
                  <span>Top With Pleated</span>
                </div>
                <div className="title">
                  <h3>{state.data.name}</h3>
                  <p>{state.data["net price"]}$</p>
                </div>
              </div>
              <div className="row row2">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the standard dummy
                  text. Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="row row3">
                <div className="add">
                  <div className="number">
                    <input
                      type="number"
                      onChange={changeDigit}
                      value={state.data.quantity ?? 0}
                    />
                    <div className="btn-box">
                      <button onClick={clickPlus}>+</button>
                      <button onClick={clickMinus}>-</button>
                    </div>
                  </div>
                  <div className="button">
                    <button onClick={clickCart}>Add to cart</button>
                  </div>
                </div>
                <div className="button">
                  <button onClick={clickWishlist}>
                    <i
                      className={`bi bi-heart${
                        wishlist.map((el) => el.id).includes(state.data.id)
                          ? "-fill"
                          : ""
                      }`}
                    ></i>
                    Add to Wishlist
                  </button>
                </div>
              </div>
              <div className="row row4">
                <div className="left">
                  <div className="row category">
                    Categories: <a href="!#">Jacket collection</a>,
                    <a href="!#">Modern design</a>,{" "}
                    <a href="!#">Recent products</a>,
                    <a href="!#"> Runway bulb</a>,<a href="!#"> Study set</a>,
                    <a href="!#">Summer collection</a>,
                    <a href="!#">Table design</a>,{" "}
                    <a href="!#">Winter western</a>,
                    <a href="!#">Women accessories</a>
                  </div>
                  <div className="row tag">
                    Tag: <a href="!#">Polyester</a>
                  </div>
                  <div className="row brand">
                    Brand: <a href="!#">Locationer</a>
                  </div>
                </div>
                <div className="right">
                  <a href="!#">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="!#">
                    <i className="bi bi-twitter"></i>
                  </a>
                  <a href="!#">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="!#">
                    <i className="bi bi-pinterest"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="section" id="section2"></section>
          <section className="section" id="section3"></section>
        </div>
      </div>
    </main>
  );
}
