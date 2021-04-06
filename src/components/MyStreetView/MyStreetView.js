import React from "react";
import { StreetViewPanorama } from "@react-google-maps/api";
// import ExtraInfo from "../ExtraInfo/ExtraInfo";

// the geo cords need to be the position of the x and y where the mouse/thumb is that the user drops the man
export const MyStreetView = (props) => {

  const [is360ImgVisible, setIs360ImgVisible] = React.useState(true);
  const [lat, setLat] = React.useState();
  const [lng, setLng] = React.useState();

  let fp;

  React.useEffect(() => {
    fp = props.geoCordsFinishLine[0].split(",");
    console.log("hi")
    setLat(fp[0]);
    setLng(fp[1]);
    setIs360ImgVisible(true);
  }, [props]);

  return (
    <div>
      {props.geoCordsFinishLine[0].length > 0 && (
        <StreetViewPanorama
          position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
          visible={is360ImgVisible}
          onCloseClick={() => props.smallRoutePanoImgClicked(false)}
        />
      )}

      {/* <ExtraInfo geoCordsParking={props.geoCordsParking} /> */}
    </div>
  );
};
