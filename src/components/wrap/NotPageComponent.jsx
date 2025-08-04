import React from "react";
import "../scss/NoPageComponent.scss";
export default function NotPageComponent() {
  return (
    <div id="notPage">
      <div className="container">
        <img src="./images/404.png" alt="" />
        <p>Sorry we couldn't find that page.</p>
        <p>
          the link you follwed probably broken or the page has been removed.
        </p>
      </div>
    </div>
  );
}
