import React from "react";

export default function DirectionsButton(props) {
  //   const doThis = (val) => {
  //       console.log("props lcicu: ", props.clicker)
  //       props.smallRoutePanoImgClicked(false);
  //       props.setShouldShowDirectionsCb(true);
  // };
  return (
    <div>
      <button id="dir-btn"
        style={{ background: "#0099ff", width: "200px", color: "white" }}
        onClick={() => props.setShouldShowDirectionsCb(true)}
      >
              Directions
      </button>
    </div>
  );
}
