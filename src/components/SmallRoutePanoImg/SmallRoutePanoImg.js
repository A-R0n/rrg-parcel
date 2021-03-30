import React from "react";

import "./SmallRoutePanoImg.css";

export default function SmallRoutePanoImg(props) {
  console.log("props route name length: ", props.routeName.length);

  const cords = {
    lat: "37.7831",
    lng: "-83.6828",
  };

  console.log("da process dot env google api street view: ", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const climbing_route_pic_default = require("../../../public/climbing.png")
  return (
    <div className="pano-route-img-container">
      {props.routeName.length > 0 && (
        <img
          id="pano-route-img"
          alt="panoramic route image"
          src={climbing_route_pic_default}
          // src={
          //   `https://maps.googleapis.com/maps/api/streetview?pano=AF1QipP2wOaFBeHPlw5E6IUSUjhvXUDfy3Gh7KtKVyDt&size=100x100&key=` +
          //   `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
          // }
          onClick={() => props.smallRoutePanoImgClicked(true)}
        ></img>
      )}
    </div>
  );
}
