import React from "react";

import "../DirectionsButton/DirectionsButton";
import DirectionsButton from "../DirectionsButton/DirectionsButton";

export default function ExtraInfo(props) {
  return (
    <div
      id="extra-info"
      style={{
        width: "90vw",
        height: "20vh",
        background: "white",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        margin: 0,
        opacity: 0.7,
      }}
    >
      <p>Extra Info</p>
      <DirectionsButton
        geoCordsParking={props.geoCordsParking}
        clickSmallRoutePanoImg={props.clickSmallRoutePanoImg}
      />
    </div>
  );
}
