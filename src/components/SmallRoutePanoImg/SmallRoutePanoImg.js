import React from "react";

import "./SmallRoutePanoImg.css";

export default function SmallRoutePanoImg(props) {
  console.log("props route name length: ", props.routeName.length);

  const doThis = () => {
    console.log("think of something: ");
    props.smallRoutePanoImgClicked(true);
  };

  // const climbing_route_pic_default = require("~/build/climbing.png");
  return (
    <div className="pano-route-img-container">
      {props.routeName.length > 0 && (
        <div
          id="pano-route-img"
          alt="panoramic route image"
          // src={climbing_route_pic_default}
          onClick={() => doThis()}
        ></div>
      )}
    </div>
  );
}
