import React from "react";
import "../scss/GoTopComponent.scss";
import useCustomAlink from "./custom/useCustomALink";
function GoTopComponent(props) {
  const { onClickALink } = useCustomAlink();

  return (
    <div id="goTop">
      <div className="container">
        <a href="!#" onClick={(e) => onClickALink(e, "#wrap")}>
          <p>scroll up</p>
          <i className="bi bi-arrow-right-short"></i>
        </a>
      </div>
    </div>
  );
}

export default GoTopComponent;
