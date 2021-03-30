import React from "react";
import useFetch from "./useFetch";
import { ComboboxOption } from "@reach/combobox";

const useRouteListItems = (routeItem) => {
  let [parkingLotId, setParkingLotId] = React.useState();
  let [geocoords, setgeocoords] = React.useState();


  // i want to memoize the value to avoid subsequent calls to the db
  const provideParkingLotIdInfo = React.useCallback((id, gc) => {
    setParkingLotId(parseInt(id));
    setgeocoords(gc);
  }, []);

  const URL = process.env.REACT_APP_GET_ROUTES;
  const allRoutes = useFetch(URL);

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
            onClick={() => provideParkingLotIdInfo(`${route.parkinglotid}`, `${route.geocoords}`)}
          />
        );
      });

  return [routeListItems, parkingLotId, geocoords];
};

export default useRouteListItems;
