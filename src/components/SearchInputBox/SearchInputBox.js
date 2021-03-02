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
// import Mountain from "../Mountain/Mountain";
import GoogleMarker from '../GoogleMarker/GoogleMarker';

import DeleteTextButton from "../DeleteTextButton/DeleteTextButton";

function font2(element) {
  var prop = [
    "font-style",
    "font-variant",
    "font-weight",
    "font-size",
    "font-family",
  ];
  var font = "";
  for (var x in prop)
    font +=
      window.getComputedStyle(element, null).getPropertyValue(prop[x]) + " ";

  return font;
}

export const SearchInputBox = (props) => {
  let [routeName, setRouteName] = React.useState("");
  let [
    listOfRouteItems,
    parkingLotId
  ] = useRouteListItems(routeName);
  let [parkingLotData, isResponse200] = useParkingLotIdItem(parkingLotId);
  let [widthOfCBox, setWidthOfCBox] = React.useState(0);
  // let [widthOfText, setWidthOfText] = React.useState(0);

  let widthOfText = React.useRef();

  useEffect(() => {
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
  };


  const determineWidthOfComboBox = () => {
    var cBox = document.getElementById("special-box");
    var cbr = cBox.getBoundingClientRect();
    cbr.font = font2(cBox);
    console.log("cbr: ya", cbr);
    var widthOfCBo = cbr.width;
    console.log("width of cbo:", widthOfCBo);
    setWidthOfCBox(widthOfCBo);
  };

  React.useEffect(() => {
    determineWidthOfComboBox();
  }, []);

  const determineWidthOfText = (name) => {

    var shortenedName = Math.floor(name.length * 0.80);
    var slicedName = name.slice(0, shortenedName) + "...";

    console.log("ratio:", widthOfText.current / widthOfCBox);
      
    if (widthOfText.current / widthOfCBox < 0.75) {
      setRouteName(name);
    } else {
      setRouteName(slicedName);
    }
  };

  const doThisFirst = (name) => {
    var canv = document.createElement("canvas");
    var ctx2 = canv.getContext("2d");
    ctx2.font = "normal normal 400 20px Arial ";
    console.log("name: ", name);
    var txtWidth2 = ctx2.measureText(name).width;
    console.log("text width 2: ", txtWidth2);

    // setWidthOfText(txtWidth2);

    widthOfText.current = txtWidth2;
  }

  return (
    <div className="searched">
      <form className="some-form">
        {/* <MagnifyingGlass /> */}
        {/* <Mountain /> */}
        <GoogleMarker />
        <Combobox
          id="cBox"
          onSelect={async (e) => {
            await doThisFirst(e);
            await determineWidthOfText(e);
          }}
        >
          <ComboboxInput
            id="special-box"
            autoComplete="off"
            // type="search"
            value={routeName}
            onChange={handleUserTyping}
            placeholder="Search for a route"
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
