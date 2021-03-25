import React from "react";

import "./ModalRouteImage.css";

export default function ModalRouteImage() {

    let src = document.getElementById("small-route-thumb-nail").src;
  return (
    <div id="myModal" className="modal">
      <span className="close"></span>
      <img
        className="modal-content"
        id="img01"
        src={src}
      ></img>
    </div>
  );
};
