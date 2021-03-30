import React from "react";

import "./SmallRoutePanoImg.css";

export default function SmallRoutePanoImg(props) {
  console.log("props route name length: ", props.routeName.length);

  const cords = {
    lat: "37.7831",
    lng: "-83.6828",
  };

  // const climbing_route_pic_default = require("~/public/climbing.png")
  return (
    <div className="pano-route-img-container">
      {props.routeName.length > 0 && (
        <img
          id="pano-route-img"
          alt="panoramic route image"
          // src={climbing_route_pic_default}
          onClick={() => props.smallRoutePanoImgClicked(true)}
        ></img>
      )}
    </div>
  );
}
