import React, { useEffect, useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
} from "@reach/combobox";

import "./SearchInputBox.css";
import "@reach/combobox/styles.css";

import useRouteListItems from "../../hooks/useRouteListItems";

import useParkingLotIdItem from "../../hooks/useParkingLotIdItem";

// import MagnifyingGlass from "../MagnifyingGlass/MagnifyingGlass";
import Mountain from "../Mountain/Mountain";

import DeleteTextButton from "../DeleteTextButton/DeleteTextButton";


export const SearchInputBox = (props) => {
  let [routeName, setRouteName] = React.useState("");
  let [listOfRouteItems, parkingLotId] = useRouteListItems(routeName);
  let [parkingLotData, isResponse200] = useParkingLotIdItem(parkingLotId);


  useEffect(() => {
      console.log("routeName split at , : ", routeName.split(",").shift());

    if (isResponse200) {
      parkingLotData.map((parkingLot) => {
        let geoCoordsFormatted = parkingLot.geocoords.split(",");
        // props.panTo(
        //   parseFloat(geoCoordsFormatted[0]),
        //   parseFloat(geoCoordsFormatted[1])
        // );
      });
    }
  }, [parkingLotData, isResponse200]);

  const handleUserTyping = (event) => {
    setRouteName(event.target.value);
  };

  const deleteRouteName = () => {
    setRouteName("");
  }

  return (
    <div className="searched">
      <form className="some-form">
        {/* <MagnifyingGlass /> */}
        <Mountain />
        <Combobox
          className="cBox"
          onSelect={(e) => {
            setRouteName(e.split(",").shift());
          }}
        >
          <ComboboxInput
            className="special-box"
            // type="search"
            value={routeName}
            onChange={handleUserTyping}
            placeholder="Search for a route"
            maxLength="5"
            // onClick={clickInInput}
            // ref={comboBoxRef}
          />
          <ComboboxPopover>
            <ComboboxList className="special-box-list">
              {listOfRouteItems}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
        {routeName.length > 0 ? (
          <div id="tester" onTouchStart={() => deleteRouteName()}>
            <DeleteTextButton />
          </div>
        ) : null}
      </form>
    </div>
  );
};
