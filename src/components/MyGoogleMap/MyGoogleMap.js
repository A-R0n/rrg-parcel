import React, { memo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker} from "@react-google-maps/api";
import { DirectionsForParking } from "../DirectionsForParking/DirectionsForParking";
import { TrailPolyLine } from "../TrailPolyLine/TrailPolyLine";
// import { MyStreetView } from "../MyStreetView/MyStreetView";

import "./MyGoogleMap.css";

function MyGoogleMap(props) {
  console.log("props should show directions: ", props.shouldShowDirections);
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
        // let newLat = props.geoCordsParking[0] - 0.3;
      let lat = props.geoCordsParking[0];
      let lng = props.geoCordsParking[1];
      mapRef.current.panTo({
        lat,
        lng,
      });
    }
  }, [props.geoCordsParking]);

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  const parking_marker = require("../../../public/parking.svg");

  let newLat = props.geoCordsParking[0] - 0.2;

  console.log("geo cords parking lat: ", props.geoCordsParking[0]);

  console.log("new lat: ", newLat);

  return (
    <div className="google-container">
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={{ lat: 37.6, lng: -83.6828 }}
        onLoad={onMapLoad}
        // options={{ gestureHandling: "greedy" }}
      >
        <Marker
          id="user-location-outer"
          position={miguels}
          options={{
            icon: {
              path: "M 10, 20a 10,10 0 .2,.2 20,0a 10,10 0 .2,.2 -20,0",
              anchor: { x: 25, y: 25 },
              strokeColor: "white",
              strokeWeight: 4,
            },
          }}
        />
        <Marker
          id="user-location-inner"
          position={miguels}
          options={{
            icon: {
              anchor: { x: 15, y: 15 },
              url:
                'data:image/svg+xml;utf-8, \
              <svg width="20" height="20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"> \
              <path fill="deepskyblue" stroke="deepskyblue" stroke-width="3.0" d="M 100, 100m -75, 0a 75 75 0 1,0 150,0a 75,75 0 1,0 -150,0"/></svg>',
            },
            strokeWeight: 4,
          }}
          title="your location"
        />
        {props.geoCordsParking.length > 0 && (
          <Marker
            id="parking-marker"
            position={{
              lat: props.geoCordsParking[0],
              lng: props.geoCordsParking[1],
            }}
            icon={parking_marker}
            onLoad={onMarkerLoad}
            title= "parking"
          />
        )}
        {/* {props.isPanoImgExpand && (
          <MyStreetView geoCordsFinishLine={props.geoCordsFinishLine} />
        )} */}
        {props.shouldShowDirections && (
          <DirectionsForParking geoCordsParking={props.geoCordsParking} />
        )}
        {props.shouldShowDirections && <TrailPolyLine />}
      </GoogleMap>
    </div>
  );
}

export default memo(MyGoogleMap);
