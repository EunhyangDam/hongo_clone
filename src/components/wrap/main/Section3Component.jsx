import React from "react";
import "./scss/Section3Component.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productAddAction } from "../../../store/viewProduct";
import { heartAddAction } from "../../../store/wishlist";
import { modalAction } from "../../../store/confirmModal";
import useCustomAlink from "../custom/useCustomALink";

const Section3Component = React.forwardRef((props, ref) => {
  const { onClickALink } = useCustomAlink();

  const dispatch = useDispatch();
  const nav = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const latestAsset = useSelector((state) => state.viewProduct.latest);
  const [state, setState] = React.useState({
    product: [],
  });
  const [wish, setWish] = React.useState({
    wishlist: [],
  });
  const [latest, setLatest] = React.useState({
    latest: [],
  });

  /** # data 가져오기 */
  /** ## 상품 JSON 파일 */
  React.useEffect(() => {
    fetch("./json/main/section3/product.json", { method: "GET" })
      .then((result) => result.json())
      .then((data) => {
        setState({
          product: data.product,
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  /** ## 위시리스트 */
  React.useEffect(() => {
    setWish({
      ...wish,
      wishlist: wishlist,
    });
  }, [wishlist]);
  /**## 최근 본 상품 */
  React.useEffect(() => {
    setLatest({
      latest: latestAsset,
    });
  }, [latestAsset]);

  /** # 이벤트 */
  const clickProduct = (e, data) => {
    e.preventDefault();
    let arr = latest.latest;
    let isCliked = false;
    arr.map((el) => el.id).includes(data.id) && (isCliked = true);
    if (!isCliked) {
      arr = [data, ...arr];
      dispatch(productAddAction(arr));
    }
    nav(
      {
        hash: "section1",
        pathname: "/sub05ProductDetail",
        search: `product=${data.id}`,
      },
      { state: data }
    );
    dispatch(productAddAction(arr));
  };
  const onClickWishList = (e, data) => {
    e.preventDefault();
    let arr = wish.wishlist;
    let isCliked = false;
    arr.map((el) => el.id).includes(data.id) && (isCliked = true);
    if (!isCliked) {
      arr = [data, ...arr];
      dispatch(heartAddAction(arr));
    }
    const obj = {
      messege: "위시리스트에 등록되었습니다.",
      isOn: true,
      isConfirm: false,
    };
    dispatch(modalAction(obj));
    dispatch(heartAddAction(arr));
  };
  return (
    <section id="section3" className="section" ref={ref}>
      <div className="container">
        <div className="title">
          <div className="red-line"></div>
          <h2>Great Selection</h2>
          <p>
            Follow the most popular trends and get
            <br />
            exclusive items from hongo shop
          </p>
        </div>
        <div className="content">
          <ul>
            {state.product.map((el) => (
              <li key={el.id} data-key={el.id}>
                <div className="gap">
                  <a href="!#" onClick={(e) => clickProduct(e, el)}>
                    <img src={`./images/${el.front}`} alt="" />
                    <img src={`./images/${el.back}`} alt="" />
                  </a>
                  {el.discount && <em>-{el.discount * 100}%</em>}
                  <a
                    href="!#"
                    className="heart-container"
                    onClick={(e) => onClickWishList(e, el)}
                  >
                    {wishlist.map((arr) => arr.id).includes(el.id) ? (
                      <i className="bi bi-heart-fill"></i>
                    ) : (
                      <i className="bi bi-heart"></i>
                    )}
                  </a>
                  <div
                    className="icon-container"
                    onClick={(e) => clickProduct(e, el)}
                  >
                    <div className="col col1">
                      <Link to="/null">
                        <i className={el.icon}></i>
                      </Link>
                      <span>{el["icon span"]}</span>
                    </div>
                    <div className="col col2">
                      <Link to="/null">
                        <i className="bi bi-eye"></i>
                      </Link>
                      <span>Quick View</span>
                    </div>
                  </div>
                </div>
                <div className="txt">
                  <h3
                    className="product-name"
                    onClick={(e) => clickProduct(e, el)}
                  >
                    {el.name}
                  </h3>
                  <div className="price">
                    {el.option ? (
                      `${el["net price"][0].toFixed(2)}$ - ${el[
                        "net price"
                      ][1].toFixed(2)}$`
                    ) : !el.discount ? (
                      `$${el["net price"].toFixed(2)}`
                    ) : (
                      <>
                        <span className="original">
                          ${el["net price"].toFixed(2)}
                        </span>
                        <span className="sale">
                          ${(el["net price"] * (1 - el.discount)).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default Section3Component;
