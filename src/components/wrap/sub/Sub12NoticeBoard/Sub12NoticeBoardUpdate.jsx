import React, { useEffect, useState } from "react";
import "../scss/sub.scss";
import { useLocation } from "react-router-dom";
export default function Sub12NoticeBoardUpdate(props) {
  const location = useLocation();
  const [state, setState] = useState({
    wIDX: 0,
    wType: "",
    wSubject: "",
    wContent: "",
    wID: "",
    wDate: "",
    wUpdate: "",
    wDel: 0,
    wHit: 0,
  });
  useEffect(() => {
    setState(location.state);
  }, [location]);
  return (
    <main id="sub12NoticeBoardUpdate">
      <input type="text" value={state.wSubject} />
      {Array(state.wContent.split("<br/>").length)
        .fill()
        .map((el, idx) => (
          <p key={el}>
            {state.wContent.split("<br/>")[idx] === "&nbsp;"
              ? "　"
              : state.wContent.split("<br/>")[idx]}
          </p>
        ))}
    </main>
  );
}
