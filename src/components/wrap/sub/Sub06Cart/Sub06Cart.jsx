import React, { useEffect, useState } from "react";
import "../scss/sub.scss";
import "./scss/Sub06Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { modalAction, returnAction } from "../../../../store/confirmModal";
import { cartAddAction } from "../../../../store/cart";
import useCustomAlink from "../../custom/useCustomALink";
export default function Sub06Cart(props) {
  const { onClickALink } = useCustomAlink();

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const returnYes = useSelector((state) => state.confirmModal.returnYes);
  const [state, setState] = useState({
    cart: [],
    subTotal: 0,
    toatlDiscount: 0,
    shipping: 0,
    total: 0,
  });
  const [product, setProduct] = useState({
    product: "",
  });
  const [event, setEvent] = useState("");
  useEffect(() => {
    setState({
      cart: cartData.cart,
      subTotal: cartData.subTotal,
      toatlDiscount: cartData.toatlDiscount,
      shipping: cartData.shipping,
      total: cartData.total,
    });
  }, [cartData]);
  /**# 장바구니 삭제 */
  /**## 일부 삭제 */
  const clickDelete = (e, data) => {
    e.preventDefault();
    const obj = {
      messege: "장바구니에서 삭제할까요?",
      isOn: true,
      isConfirm: true,
    };
    setProduct({
      product: data,
    });
    dispatch(modalAction(obj));
    setEvent("each");
  };
  /**## 전체 삭제 */
  const clickEmpty = (e) => {
    e.preventDefault();
    const obj = {
      messege: "장바구니를 비울까요?",
      isOn: true,
      isConfirm: true,
    };
    setEvent("all");
    dispatch(modalAction(obj));
  };
  useEffect(() => {
    if (returnYes) {
      if (event === "each") {
        let cart = state.cart.filter((el) => el.id !== product.product.id);
        dispatch(cartAddAction(cart));
        dispatch(returnAction(false));
      } else if (event === "all") {
        dispatch(cartAddAction([]));
        dispatch(returnAction(false));
      }
    }
  }, [returnYes]);
  /**# 증감 */
  const clickPlus = (e, data) => {
    e.preventDefault();
    let plus = state.cart;
    plus = plus.map((el) =>
      el.id === data.id
        ? {
            ...el,
            quantity:
              el.quantity + 1 >= el.inventory ? el.inventory : el.quantity + 1,
          }
        : { ...el }
    );
    dispatch(cartAddAction(plus));
  };
  const clickMinus = (e, data) => {
    e.preventDefault();
    let minus = state.cart;
    minus = minus.map((el) =>
      el.id === data.id
        ? { ...el, quantity: el.quantity - 1 <= 0 ? 0 : el.quantity - 1 }
        : { ...el }
    );
    dispatch(cartAddAction(minus));
  };
  const changeDigit = (e, data) => {
    let regExp = /[0-9]/g;
    let quantity = e.target.value.replace(regExp, "");
    let cart = state.cart;
    cart = cart.map((el) =>
      el.id === data.id
        ? {
            ...el,
            quantity:
              Number(quantity) > el.inventory ? el.inventory : Number(quantity),
          }
        : { ...el }
    );
    dispatch(cartAddAction(cart));
  };

  return (
    <main id="sub06Cart">
      <div className="container">
        <div className="title">
          <div className="inner">
            <div className="left">
              <h2>Cart</h2>
            </div>
            <div className="right">
              <span className="asset home">home</span>
              <i>|</i>
              <span className="asset wishlist">Cart</span>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="inner">
            <div className="col col1">
              <div className="table">
                <ul className="table-head">
                  <li className="col col1"></li>
                  <li className="col col2"></li>
                  <li className="col col3">
                    <p>Product</p>
                  </li>
                  <li className="col col4">
                    <p>Price</p>
                  </li>
                  <li className="col col5">
                    <p>Quantity</p>
                  </li>
                  <li className="col col6">
                    <p>Total</p>
                  </li>
                </ul>
                <ul className="table-content">
                  {state.cart.map((el, idx) => (
                    <li key={el.id}>
                      <ul className="asset">
                        <li className="col col1">
                          <button onClick={(e) => clickDelete(e, el)}>
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </li>
                        <li className="col col2">
                          <a
                            to="!#"
                            onClick={(e) =>
                              onClickALink(e, "/sub05ProductDetail", el)
                            }
                          >
                            <img src={`./images/${el.front}`} alt="" />
                          </a>
                        </li>
                        <li className="col col3">
                          <div className="col3-text">
                            <p className="name">
                              <a
                                to="!#"
                                onClick={(e) =>
                                  onClickALink(e, "/sub05ProductDetail", el)
                                }
                              >
                                {el.name}
                              </a>
                            </p>
                            <p className="size">
                              {/* {el.size.length === 0 ? "size:S" : el.size} */}
                            </p>
                          </div>
                        </li>
                        <li className="col col4"></li>
                        <li className="col col5">
                          <form action="GET">
                            <input
                              type="number"
                              name={`digit${idx + 1}`}
                              id={`digit${idx + 1}`}
                              step="1"
                              min="0"
                              max="125"
                              inputMode="numeric"
                              value={el.quantity}
                              onChange={(e) => changeDigit(e, el)}
                            />
                            <div className="change">
                              <button onClick={(e) => clickPlus(e, el)}>
                                +
                              </button>
                              <button onClick={(e) => clickMinus(e, el)}>
                                -
                              </button>
                            </div>
                          </form>
                        </li>
                        <li className="col col6">
                          {el.option
                            ? `${(el["net price"][0] * el.quantity).toFixed(
                                2
                              )}$`
                            : el.sale
                            ? (
                                el["net price"] *
                                (1 - el.discount) *
                                el.quantity
                              ).toFixed(2) + "$"
                            : `${(el["net price"] * el.quantity).toFixed(2)}$`}
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="empty">
                <button onClick={clickEmpty}>Empty Cart</button>
              </div>
            </div>
            <div className="col col2">
              <div className="heading">Cart totals</div>
              <ul>
                <li>
                  <div className="heading">Subtotal</div>
                  <div className="content">${state.subTotal.toFixed(2)}</div>
                </li>
                <li>
                  <div className="heading">Shipping</div>
                  <div className="content">${state.shipping.toFixed(2)}</div>
                </li>
                <li>
                  <div className="heading">discount</div>
                  <div className="content">
                    ${state.toatlDiscount.toFixed(2)}
                  </div>
                </li>
                <li className="total">
                  <div className="heading">Total</div>
                  <div className="content">
                    <h3>${state.total.toFixed(2).toLocaleString("en-GB")}</h3>
                    <p>(includes $7.14 Tax estimated for South Korea)</p>
                  </div>
                </li>
              </ul>
              <div className="btn-box">
                <Link to="/sub07Order">Proceed to checkout</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
