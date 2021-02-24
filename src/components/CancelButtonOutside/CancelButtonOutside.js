import React from "react";
// import "./CancelButtonOutside.scss";

export const CancelButtonOutside = (props) => {
  return (
    <div className="cancel-btn-holder">
      <button
        className="cancel-btn"
        type="button"
        onClick={() => props.toggleThat()}
        style={{height: "6vh" ,marginLeft: "10px"}}
      >
        Cancel
      </button>
    </div>
  );
};