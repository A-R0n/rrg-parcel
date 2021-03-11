import React from "react";
import { StreetViewPanorama } from "@react-google-maps/api";
import ExtraInfo from "../ExtraInfo/ExtraInfo";

// the geo cords need to be the position of the x and y where the mouse/thumb is that the user drops the man
export const MyStreetView = (props) => {
  console.log("my street view geo cords: ", props.geoCordsFinishLine["lat"]);

  const dest = {
    lat: props.geoCordsFinishLine["lat"],
    lng: props.geoCordsFinishLine["lng"],
  };

  const handleCloseClick = (e) => {
    console.log("handle close click", e);
  }

  return (
    <div>
      <StreetViewPanorama options={{ position: dest, visible: true }} onCloseClick={(e) => handleCloseClick(e)}/>
      <ExtraInfo geoCordsParking={props.geoCordsParking}/>
    </div>
  );
};
