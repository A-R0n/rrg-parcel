import React from "react";
import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

export const DirectionsForParking = (fields) => {
  console.log("fields: ", fields);
  const [isRouteSelected, setIsRouteSelected] = React.useState(false);
  const [response, setResponse] = React.useState(null);

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

  React.useEffect(() => {
    setIsRouteSelected(true);
    setResponse(null);
    console.log("response: ", response);
  }, [fields.geoCordsParking]);

  const miguels = {
    lat: 37.7831,
    lng: -83.6828,
  };

  // const hideBottomDrawer = (val) => {
  //   console.log("attempting to not render bottom drawer")
  //   fields.setShouldShowDirectionsBtnCb(false);
  // }

  return (
    <div>
      {isRouteSelected && fields.geoCordsParking.length > 0 && response === null && (
        <DirectionsService
          options={{
            destination: fields.geoCordsParking[0] + "," + fields.geoCordsParking[1],
            origin: miguels,
            travelMode: "DRIVING",
          }}
          callback={directionsCallback}
          // onLoad={(ds) => hideBottomDrawer(ds)}
          // optional
          onUnmount={(ds) => {
            console.log("DirectionsService unmount: ", ds);
            setIsRouteSelected(false);
            // fields.setShouldShowDirectionsBtnCb(false);
          }}
        />
      )}
      {response !== null && (
        <DirectionsRenderer options={{ directions: response, markerOptions: {"visible": false} }} />
      )}
    </div>
  );
};
