import { React, useEffect, useState } from "react";
import "./scss/WishlistComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { heartAddAction, heartDelAction } from "../../../../store/wishlist";
import { cartAddAction } from "../../../../store/cart";

function WishlistComponent(props) {
  const dispatch = useDispatch();
  const heart = useSelector((state) => state.wishlist.wishlist);
  const cartAsset = useSelector((state) => state.cart.cart);
  const [state, setState] = useState({
    product: [],
    check: [],
  });
  const [cart, setCart] = useState({
    cart: [],
  });
  const [isDel, setIsDel] = useState(false);

  /**비우기 */
  const emptyClick = (e) => {
    setIsDel(true);
    setState({
      ...state,
      product: [],
    });
  };

  /**체크 이벤트 */
  const changeCheck = (e, id) => {
    let chkArr = state.check;
    if (e.target.checked) {
      chkArr = [...chkArr, id];
    } else {
      chkArr = chkArr.filter((el) => el !== id);
    }
    setState({
      ...state,
      check: chkArr,
    });
  };
  const changeAllChk = (e) => {
    if (e.target.checked) {
      setState({ ...state, check: state.product.map((el) => el.id) });
    } else {
      setState({
        ...state,
        check: [],
      });
    }
  };

  /**삭제 이벤트 */
  const clickDel = (e, id) => {
    setState({
      ...state,
      product: state.product.filter((el) => el.id !== id),
    });
    e.preventDefault();
    setIsDel(true);
  };
  const clickRemove = (e) => {
    e.preventDefault();
    setState({
      ...state,
      product: state.product.filter((el) => !state.check.includes(el.id)),
    });
    setIsDel(true);
  };

  /**장바구니 넣기 */
  const clickAddToCart = (e, data) => {
    e.preventDefault();
    let cartArr = cart.cart;
    let condition = false;
    cartArr.map((el) => el.id).includes(data.id) && (condition = true);
    if (condition) {
      cartArr = cartArr.map((el) =>
        el.id === data.id ? { ...data, quantity: data.quantity + 1 } : el
      );
      let del = state.product.filter((el) => el.id !== data.id);
      setState({ ...state, product: del });
      dispatch(heartDelAction(del));
    } else {
      cartArr = [data, ...cartArr];
    }
    setCart({
      ...cart,
      cart: cartArr,
    });
    dispatch(cartAddAction(cartArr));
  };
  useEffect(() => {
    if (isDel) {
      dispatch(heartDelAction(state.product));
      setIsDel(false);
    }
  }, [isDel]);

  return (
    <div id="wishlistComponent">
      <div className="container">
        <div className="title">
          <div className="inner">
            <div className="left">
              <h2>wishlist</h2>
            </div>
            <div className="right">
              <span className="asset home">home</span>
              <i>|</i>
              <span className="asset wishlist">wishlist</span>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="inner">
            <dl className="table">
              <dt>
                <ul className="col-box">
                  <li className="col col1">
                    <form action="GET">
                      <input
                        type="checkbox"
                        name="allChk"
                        id="allChk"
                        checked={
                          state.check.length > 0 &&
                          state.check.length === state.product.length
                        }
                        onChange={changeAllChk}
                      />
                    </form>
                  </li>
                  <li className="col col2"></li>
                  <li className="col col3">
                    <h3>Product Name</h3>
                  </li>
                  <li className="col col4">
                    <h3>Unit Price</h3>
                  </li>
                  <li className="col col5">
                    <h3>Stock Status</h3>
                  </li>
                  <li className="col col6"></li>
                  <li className="col col7"></li>
                </ul>
              </dt>
              {heart.length >= 1 ? (
                heart.map((el) => (
                  <dd key={el.id}>
                    <ul className="col-box">
                      <li className="col col1">
                        <form action="GET">
                          <input
                            type="checkbox"
                            name={`${el.id}Chk`}
                            id={`${el.id}Chk`}
                            onChange={(e) => {
                              changeCheck(e, el.id);
                            }}
                            checked={state.check.includes(el.id)}
                          />
                        </form>
                      </li>
                      <li className="col col2">
                        <Link to="/sub05ProductDetail" state={el}>
                          <img src={`./images/${el.front}`} alt="" />
                        </Link>
                      </li>
                      <li className="col col3">
                        <Link to="/sub05ProductDetail" state={el}>
                          {el.name}
                        </Link>
                      </li>
                      <li className="col col4">
                        {el.option
                          ? `${el["net price"][0].toFixed(2)}$ - ${el[
                              "net price"
                            ][1].toFixed(2)}$`
                          : el.sale
                          ? (el["net price"] * (1 - el.discount)).toFixed(2) +
                            "$"
                          : `${el["net price"].toFixed(2)}$`}
                      </li>
                      <li className="col col5">
                        <span>in stock</span>
                      </li>
                      <li className="col col6">
                        <button onClick={(e) => clickAddToCart(e, el)}>
                          ADD TO CART
                        </button>
                      </li>
                      <li className="col col7">
                        <button
                          onClick={(e) => {
                            clickDel(e, el.id);
                          }}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </li>
                    </ul>
                  </dd>
                ))
              ) : (
                <dd>
                  <h3>상품 없음</h3>
                </dd>
              )}
            </dl>
            <div className="bottom">
              <div className="col left">
                <button onClick={clickRemove}>REMOVE</button>
              </div>
              <div className="col right">
                <button onClick={emptyClick}>EMPTY WISHLIST</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistComponent;
