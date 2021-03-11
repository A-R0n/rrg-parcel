import React, { memo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { DirectionsForParking } from "../DirectionsForParking/DirectionsForParking";
import { MyStreetView } from "../MyStreetView/MyStreetView";

import "./MyGoogleMap.css";

function MyGoogleMap(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    region: "1017894",
  });

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
    zIndex: 0,
  };

  const miguels = {
    lat: 37.7831,
    lng: -83.6828,
  };

  const onMarkerLoad = (marker) => {
    console.log("marker loaded: ", marker);
  };

  React.useEffect(() => {
    if (props.geoCordsParking.length > 0) {
      let lat = props.geoCordsParking[0];
      let lng = props.geoCordsParking[1];
      mapRef.current.panTo({
        lat,
        lng,
      });
    }
  }, [props.geoCordsParking]);

  const provideDirections = () => {
    props.shouldShowDirections(true);
  };

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  const image1 = require("../../../public/parking.svg");

  return (
    <div className="google-container">
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={miguels}
        onLoad={onMapLoad}
        options={{ gestureHandling: "greedy" }}
      >
        {props.geoCordsParking.length > 0 && (
          <Marker
            id="parking-marker"
            position={{
              lat: props.geoCordsParking[0],
              lng: props.geoCordsParking[1],
            }}
            icon={image1}
            onLoad={onMarkerLoad}
          />
        )}
        {props.isPanoImgExpand && (
          <MyStreetView geoCordsFinishLine={props.geoCordsFinishLine} />
        )}
        {!props.isPanoImgExpand && props.shouldShowDirections && (
          <DirectionsForParking
            geoCordsParking={props.geoCordsParking}
            setShouldShowDirectionsBtnCb={props.setShouldShowDirectionsBtnCb}
          />
        )}
      </GoogleMap>

      {/* <DirectionsButton /> */}
    </div>
  );
}

export default memo(MyGoogleMap);
