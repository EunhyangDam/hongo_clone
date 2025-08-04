import React from "react";
import "../scss/GoTopComponent.scss";
function GoTopComponent(props) {
  return (
    <div id="goTop">
      <div className="container">
        <a href="#wrap">
          <p>scroll up</p>
          <i className="bi bi-arrow-right-short"></i>
        </a>
      </div>
    </div>
  );
}

export default GoTopComponent;
