import React from "react";
import { StreetViewPanorama } from "@react-google-maps/api";
// import ExtraInfo from "../ExtraInfo/ExtraInfo";

// the geo cords need to be the position of the x and y where the mouse/thumb is that the user drops the man
export const MyStreetView = () => {
  // console.log("my street view geo cords: ", props.geoCordsFinishLine["lat"]);

  // const dest = {
  //   lat: props.geoCordsFinishLine["lat"],
  //   lng: props.geoCordsFinishLine["lng"],
  // };

  const handleCloseClick = (e) => {
    console.log("handle close click", e);
  }

  let lengthy = "AF1QipP2wOaFBeHPlw5E6IUSUjhvXUDfy3Gh7KtKVyDt";
  console.log("length of pano id: ", lengthy.length);

  const center = {
    lat: 37.6528475,
    lng: -83.7246743,
  };

  return (
    <div>
      <StreetViewPanorama
        position={center}
        options={{
          // panoId: "AF1QipP2wOaFBeHPlw5E6IUSUjhvXUDfy3Gh7KtKVyDt",
          visible: true
        }}
        onCloseClick={(e) => handleCloseClick(e)}
      />
      {/* <ExtraInfo geoCordsParking={props.geoCordsParking} /> */}
    </div>
  );
};
