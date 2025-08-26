import React, { useEffect, useState } from "react";
import "./scss/Sub12NoticeBoardList.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Sub12NoticeBoardList(props) {
  const admin = useSelector((state) => state.signIn.isAdmin);
  const navigation = useNavigate();
  /**――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― */
  const [state, setState] = useState({
    notification: [],
    originData: [],
    page: [],
  });
  const [search, setSearch] = useState({
    data: "",
    type: "",
  });
  const [curPage, setCurPage] = useState(1);
  const pageNum = 2;
  const start = (curPage - 1) * pageNum;
  const end = start + pageNum;
  const piece = state.notification.slice(start, end);
  /**――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― */

  /**데이터 가져오기 */
  useEffect(() => {
    axios({ url: "./hongo_sign_up/noticeSelect.php", method: "GET" })
      .then((res) => {
        if (res.status === 200) {
          let align = res.data;
          align = [
            ...align
              .filter((el) => el.wType === "notice")
              .sort((a, b) =>
                a.wDate > b.wDate ? -1 : a.wDate < b.wDate ? 1 : 0
              ),
            ...align
              .filter((el) => el.wType === "normal")
              .sort((a, b) =>
                a.wDate > b.wDate ? -1 : a.wDate < b.wDate ? 1 : 0
              ),
          ];
          setState({
            ...state,
            notification: align,
            originData: align,
          });
        }
      })
      .catch((err) => {
        alert("ERROR");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setState({
      ...state,
      page: [...Array(Math.ceil(state.notification.length / pageNum))].map(
        (el, idx) => idx + 1
      ),
    });
  }, [state.notification]);
  /**―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  /**검색 기능 */
  /**검색 기능 - 셀렉트 입력값 가져오기 */
  const changeSelect = (e) => {
    setSearch({ ...search, type: e.target.value });
  };
  /**검색 기능 - 인풋 입력값 가져오기 */
  const changeInput = (e) => {
    setSearch({ ...search, data: e.target.value });
  };
  /**검색 기능 - 인풋 입력값 필터링하기 */
  const searching = (e) => {
    e.preventDefault();
    if (search.data === "") {
      setSearch({ ...search, type: "wSubject" });
    }

    setState({
      ...state,
      notification: state.originData.filter((el) =>
        el[search.type === "" ? "wSubject" : search.type].includes(search.data)
      ),
    });
  };

  /**제목 클릭 */
  const clickSubject = (e, data) => {
    e.preventDefault();
    navigation(
      {
        hash: "sub12NoticeBoard",
        pathname: "/sub12NoticeBoard",
        search: `${data.wIDX}`,
      },
      { state: data }
    );
  };

  const clickWrite = (e) => {
    navigation("/sub12NoticeBoardWrite");
  };

  /**페이지 번호 클릭 */
  const clickNum = (e, n) => {
    e.preventDefault();
    setCurPage(n);
  };

  /**――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― */ return (
    <main id="sub12NoticeBoardList">
      <section id="section1">
        <div className="container">
          <h2>Notification</h2>
          <form className="search" onSubmit={searching}>
            <div className="search-box">
              <div className="select">
                <select
                  name="select"
                  id="select"
                  onChange={changeSelect}
                  value={search.type}
                >
                  <option value="wSubject">Title</option>
                  <option value="wType">Type</option>
                  <option value="wID">Writer</option>
                </select>
              </div>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                placeholder="Enter Text"
                onChange={changeInput}
                value={search.data}
              />
              <button type="submit">Search</button>
            </div>
          </form>
          <dl>
            <dt>
              <div className="col col1">
                <span>Index</span>
              </div>
              <div className="col col2">
                <span>Type</span>
              </div>
              <div className="col col3">
                <span>Title</span>
              </div>
              <div className="col col4">
                <span>Writer</span>
              </div>
              <div className="col col5">
                <span>Posted</span>
              </div>
              <div className="col col6">
                <span>Views</span>
              </div>
            </dt>
            {state.notification.length === 0 ? (
              <dd className="empty">데이터가 없습니다.</dd>
            ) : (
              piece.map((el, idx) => (
                <dd key={el.IDX} data-key={el.IDX}>
                  <div className="col col1">
                    {el.wType === "notice" ? (
                      <i className="fa-solid fa-circle-exclamation"></i>
                    ) : (
                      <span>{el.IDX}</span>
                    )}
                  </div>
                  <div className="col col2">
                    <span>{el.wType}</span>
                  </div>
                  <div className="col col3">
                    <a href="!#" onClick={(e) => clickSubject(e, el)}>
                      {el.wSubject}
                    </a>
                  </div>
                  <div className="col col4">
                    <span>{el.wID}</span>
                  </div>
                  <div className="col col5">
                    <span>{`${new Date(el.wDate).getFullYear()}.${
                      new Date(el.wDate).getMonth() + 1
                    }.${new Date(el.wDate).getDate()}`}</span>
                  </div>
                  <div className="col col6">
                    <span>{el.wHit}</span>
                  </div>
                </dd>
              ))
            )}
          </dl>
          <div className="button-box">
            {admin && <button onClick={clickWrite}>Write</button>}
          </div>
          <div className="pagination">
            <ul>
              <li className="button is-disable">
                <button>
                  <i className="fa-solid fa-angles-left"></i>
                </button>
                <button>
                  <i className="fa-solid fa-angle-left"></i>
                </button>
              </li>
              <li className="number">
                {state.page.map((el) => (
                  <button
                    key={el}
                    data-key={el}
                    className={el === curPage ? "active" : ""}
                    onClick={(e) => clickNum(e, el)}
                  >
                    {el}
                  </button>
                ))}
              </li>
              <li className="button">
                <button>
                  <i className="fa-solid fa-angles-right"></i>
                </button>
                <button>
                  <i className="fa-solid fa-angle-right"></i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
