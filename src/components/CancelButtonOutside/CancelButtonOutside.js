import React from "react";

export const CancelButtonOutside = (props) => {
  return (
    <div className="cancel-btn-holder">
      <button
        className="cancel-btn"
        type="button"
        onClick={() => props.toggleThat()}
        style={{marginLeft: "10px", height: "35px"}}
      >
        Cancel
      </button>
    </div>
  );
};