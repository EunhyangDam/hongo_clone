import React, { useEffect, useState } from "react";
import "./scss/Sub12NoticeBoardList.scss";
import { useNavigate } from "react-router-dom";
export default function Sub12NoticeBoardList(props) {
  const navigation = useNavigate();
  /**――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― */
  const [state, setState] = useState({
    notification: [],
    originData: [],
  });
  const [search, setSearch] = useState({
    data: "",
    type: "",
  });
  /**――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― */

  /**데이터 가져오기 */
  useEffect(() => {
    fetch("./json/sub/noitce.json", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        let align = data.notification;
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
      })
      .catch((err) => {
        alert("ERROR");
        console.log(err);
      });
  }, []);

  /**――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― */

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
                  <option value="wSubject" selected>
                    Title
                  </option>
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
              state.notification.map((el, idx) => (
                <dd key={el.wIDX}>
                  <div className="col col1">
                    <span>{state.notification.length - idx}</span>
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
                    <span>{el.wDate}</span>
                  </div>
                  <div className="col col6">
                    <span>{el.wHit}</span>
                  </div>
                </dd>
              ))
            )}
          </dl>
          <div className="button-box">
            <button onClick={clickWrite}>Write</button>
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
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
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
