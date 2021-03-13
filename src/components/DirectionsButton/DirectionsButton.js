import React from "react";
import './DirectionsButton.css';

export default function DirectionsButton(props) {

  const doThis = (val) => {
    console.log("val: ", val);
    props.setShouldShowDirectionsCb(val);
    props.onDrawerClose(false);
  }

  return (
    <div>
      <button id="dir-btn"
        style={{ background: "#0099ff", width: "200px", color: "white" }}
        onClick={() => doThis(true)}
      >
              Directions
      </button>
    </div>
  );
}
