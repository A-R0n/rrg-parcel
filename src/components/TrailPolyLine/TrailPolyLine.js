import React from 'react';
import { Polyline } from "@react-google-maps/api";

export const TrailPolyLine = (props) => {


    const onLoad = (polyline) => {
      console.log("polyline: ", polyline);
    };

    const path = [
        { lat: 37.72452, lng: -83.63471 },
        { lat: 37.732, lng: -83.637 },
        { lat: 37.7356, lng: -83.64148 }
    ];

    const options = {
      strokeColor: "#654321",
      strokeOpacity: 0.85,
      strokeWeight: 6,
      fillColor: "#654321",
      fillOpacity: 0.85,
      clickable: false,
      draggable: false,
      editable: false,
      visible: true,
      radius: 30000,
      paths: path,
      zIndex: 1,
    };
    return (
      <div>
        <Polyline onLoad={onLoad} path={path} options={options} />
      </div>
    );
}