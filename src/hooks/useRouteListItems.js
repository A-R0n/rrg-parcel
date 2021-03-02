import React from "react";
import useFetch from "./useFetch";
import { ComboboxOption } from "@reach/combobox";

 function font() {
   return "normal normal 400 20px Arial ";
 }

const useRouteListItems = (routeItem) => {
  let [parkingLotId, setParkingLotId] = React.useState();


  // i want to memoize the value to avoid subsequent calls to the db
  const provideParkingLotIdInfo = React.useCallback((val) => {
    // e.preventDefault();
    setParkingLotId(parseInt(val));
    

  }, []);
  const URL = process.env.REACT_APP_GET_ROUTES;

  // console.log("URL, ", URL);

  const allRoutes = useFetch(URL);

  const handleTouchStart = (e) => {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    ctx.font = font();
    var fullText = (e.innerText + e.outerText);
    console.log("fullText: ", fullText);
    var txtWidth = ctx.measureText(fullText).width;

    console.log("ctx", e.outerText);
  }

  let routeListItems =
    routeItem &&
    allRoutes["data"]
      .filter((route) => {
        return (
          routeItem.length > 2 &&
          route.routename.toLowerCase().includes(routeItem.toLowerCase())
        );
      })
      .map((route, index) => {
        return (
          <ComboboxOption
            key={index}
            value={`${route.routename}, ${route.difficulty}`}
            onClick={() => provideParkingLotIdInfo(`${route.parkinglotid}`)}
            // onTouchStart={(e) => handleTouchStart(e.target)}
          />
        );
      });

  return [routeListItems, parkingLotId];
};

export default useRouteListItems;
