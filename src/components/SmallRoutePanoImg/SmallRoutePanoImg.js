import React from "react";

import "./SmallRoutePanoImg.css";

export default function SmallRoutePanoImg(props) {
  console.log("props route name length: ", props.routeName.length);

  const cords = {
    lat: "37.7831",
    lng: "-83.6828",
  };

  const doThis = (val) => {
    console.log("click: ", props);
    props.SmallRoutePanoImgClicked(val);
  };

  let name = props.routeName + ".jpg";
  return (
    <div className="pano-route-img-container">
      {props.routeName.length > 0 && (
        <img
          id="pano-route-img"
          alt="panoramic route image"
          src={
            process.env.GOOGLE_CLOUD_STORAGE_BUCKET_URL + `${name}`
          }
          onClick={() => doThis()}
        ></img>
      )}
    </div>
  );
}
