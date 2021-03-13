import React from "react";
import './DirectionsButton.css';

export default function DirectionsButton(props) {

  const doThis = (val) => {
    console.log("val: ", val);
    props.setShouldShowDirectionsCb(val);
    props.onDrawerClose(false);
  }

  return (
    <div id="dir-btn-container">
      <button id="dir-btn"
        onClick={() => doThis(true)}
      >
              Directions
      </button>
    </div>
  );
}
