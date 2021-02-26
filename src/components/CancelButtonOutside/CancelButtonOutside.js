import React from "react";

export const CancelButtonOutside = (props) => {
  return (
    <div className="cancel-btn-holder">
      <button
        className="cancel-btn"
        type="button"
        onClick={() => props.toggleThat()}
        style={{marginLeft: "15px", height: "4.5vh"}}
      >
        Cancel
      </button>
    </div>
  );
};