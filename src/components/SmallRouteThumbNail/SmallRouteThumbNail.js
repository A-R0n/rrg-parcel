import React from "react";

import "./SmallRouteThumbNail.css";

export default function SmallRouteThumbNail(props) {

  const doThis = (val) => {
    console.log("click: ", props);
    props.SmallRouteThumbNailClicked(val);
  };

  return (
    <div className="small-route-thumb-nail-container">
      {props.routeName.length > 0 && (
        <img
          id="small-route-thumb-nail"
          alt="route image"
          src={`https://storage.cloud.google.com/rrg-trails/route/super_slab/25E6FB3D-F9B4-4DC3-AE47-0EA00E544EE4.heic`}
          onClick={() => doThis()}
        ></img>
      )}
    </div>
  );
}
