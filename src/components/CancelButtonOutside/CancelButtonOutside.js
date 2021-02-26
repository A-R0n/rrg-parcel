import React from "react";

export const CancelButtonOutside = (props) => {
  return (
    <div className="cancel-btn-holder">
      <div
        className="cancel-btn"
        type="button"
        onClick={() => props.toggleThat()}
        style={{marginLeft: "10px", height: "4.5vh"}}
      >
        Cancel
      </div>
    </div>
  );
};