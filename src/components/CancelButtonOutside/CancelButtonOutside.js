import React from "react";

export const CancelButtonOutside = (props) => {
  return (
    <div className="cancel-btn-holder">
      <button
        className="cancel-btn"
        type="button"
        onTouchStart={() => props.toggleThat()}
        style={{marginLeft: "15px", height: "6vh", fontSize: "1.5em"}}
      >
        Cancel
      </button>
    </div>
  );
};