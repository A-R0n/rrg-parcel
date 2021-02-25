import React from "react";
// import "./CancelButtonOutside.scss";

export const CancelButtonOutside = (props) => {
  return (
    <div className="cancel-btn-holder">
      <button
        className="cancel-btn"
        type="button"
        onClick={() => props.toggleThat()}
        style={{ fontSize: ".75em", marginLeft: "10px", height: "6vh" }}
      >
        Cancel
      </button>
    </div>
  );
};