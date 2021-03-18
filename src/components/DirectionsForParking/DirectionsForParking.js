import React from "react";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

export const DirectionsForParking = (props) => {
  console.log("props: ", props);
      console.log("my path to parking outer: ", encodeURIComponent(pathToParking));

  const [isRouteSelected, setIsRouteSelected] = React.useState(false);
  const [pathToParking, setPathToParking] = React.useState([]);
  const [response, setResponse] = React.useState(null);
  console.log("directions for parking response: ", response);

  const directionsCallback = React.useCallback((response) => {
    if (response !== null) {
      if (response.status === "OK") {
        console.log("Status Code 200 Response directionsCallback: ", response);
        setResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
  }, []);

  let myPathToParking = [];

  React.useEffect(() => {
    if (response !== null) {
      myPathToParking = response.routes[0]["overview_polyline"]
      setPathToParking(myPathToParking);
    }
    console.log("my path to parking: ", encodeURIComponent(pathToParking));
  }, [response]);

  React.useEffect(() => {
    setIsRouteSelected(true);
    setResponse(null);
    console.log("response: ", response);
  }, [props.geoCordsParking]);

  const miguels = {
    lat: 37.7831,
    lng: -83.6828,
  };

  // const hideBottomDrawer = (val) => {
  //   console.log("attempting to not render bottom drawer")
  //   props.setShouldShowDirectionsBtnCb(false);
  // }

  return (
    <div>
      {isRouteSelected &&
        props.geoCordsParking.length > 0 &&
        response === null && (
          <DirectionsService
            options={{
              destination:
                props.geoCordsParking[0] + "," + props.geoCordsParking[1],
              origin: miguels,
              travelMode: "DRIVING",
            }}
            callback={directionsCallback}
            // onLoad={(ds) => hideBottomDrawer(ds)}
            // optional
            onUnmount={(ds) => {
              console.log("DirectionsService unmount: ", ds);
              setIsRouteSelected(false);
              // props.setShouldShowDirectionsBtnCb(false);
            }}
          />
        )}
      {response !== null && (
        <DirectionsRenderer
          options={{ directions: response, markerOptions: { visible: false } }}
        />
      )}
    </div>
  );
};
