import React from "react";

import "./SmallRouteThumbNail.css";

export default function SmallRouteThumbNail(props) {


  return (
    <div className="small-route-thumb-nail-container">
      {props.routeName.length > 0 && (
        <img
          id="small-route-thumb-nail"
          alt="route image"
          src={`https://storage.googleapis.com/rrg-trails/route/super_slab/25E6FB3D-F9B4-4DC3-AE47-0EA00E544EE4_(1).jpg`}
          onClick={() => props.smallRouteThumbNailClicked(true)}
        ></img>
      )}
    </div>
  );
}
