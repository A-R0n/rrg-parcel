import React from "react";

export default function DirectionsButton(props) {

  return (
    <div>
      <button id="dir-btn"
        style={{ background: "#0099ff", width: "200px", color: "white" }}
        onClick={() => console.log("directions button")}
      >
              Directions
      </button>
    </div>
  );
}
