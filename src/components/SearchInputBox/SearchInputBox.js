import React, { useEffect} from "react";
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
    var widthOfCBo = cbr.width;
    setWidthOfCBox(widthOfCBo);
  };

  React.useEffect(() => {
    determineWidthOfComboBox();
  }, []);

  const assignValue = (name) => {
    var shortenedName = Math.floor(name.length * 0.75);
    var slicedName = name.slice(0, shortenedName) + "...";
      
    if (widthOfText.current / widthOfCBox < 0.75) {
      setRouteName(name);
    } else {
      setRouteName(slicedName);
    }
  };

  const determineWidthOfText = (name) => {
    var canv = document.createElement("canvas");
    var ctx2 = canv.getContext("2d");
    ctx2.font = "normal normal 400 20px Arial ";
    var txtWidth2 = ctx2.measureText(name).width;
    widthOfText.current = txtWidth2;
  }

  return (
    <div className="searched">
      <form className="some-form">
        <GoogleMarker />
        <Combobox
          id="cBox"
          onSelect={async (e) => {
            await determineWidthOfText(e);
            await assignValue(e);
          }}
        >
          <ComboboxInput
            id="special-box"
            autoComplete="off"
            value={routeName}
            onChange={handleUserTyping}
            placeholder="Search for a route"
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
