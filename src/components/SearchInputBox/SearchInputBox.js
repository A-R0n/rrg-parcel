import React, { useEffect } from "react";
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

import GoogleMarker from "../GoogleMarker/GoogleMarker";

import DeleteTextButton from "../DeleteTextButton/DeleteTextButton";
import axios from "axios";

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
  let [routeItemFromList, parkingLotId] = useRouteListItems(routeName);
  let [parkingLotData, isResponse200] = useParkingLotIdItem(parkingLotId);
  let [widthOfCBox, setWidthOfCBox] = React.useState(0);
  let widthOfText = React.useRef();

  const [myShit, setMyShit] = React.useState([]);

  const [routeNameNoGrade, setRouteNameNoGrade] = React.useState("");

  useEffect(() => {
    if (isResponse200) {
      parkingLotData.map((parkingLot) => {
        console.log("props panTo: ", props);
        let geoCoordsFormattedParking = parkingLot.geocoords.split(",");
        props.setSearchInputFieldForParking(
          parseFloat(geoCoordsFormattedParking[0]),
          parseFloat(geoCoordsFormattedParking[1])
        );
      });
      // props.setShouldShowDirectionsButton(true);
      props.ssb(true);
      props.setIsDrawerVisible(true);
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
    // setRouteName(name);
    if (widthOfText.current / widthOfCBox < 0.75) {
      setRouteName(name);
    } else {
      setRouteName(slicedName);
    }
  };

  const getSomeData = (name) => {
    let routeNameWithoutGrade = name.split(", 5.").shift();
    let newThing =
      routeNameWithoutGrade.charAt(0).toUpperCase() +
      routeNameWithoutGrade.slice(1);
    axios.get(`http://localhost:8888/api/routes/${newThing}`).then((res) => {
      console.log("res dit: ", res.data);
      setMyShit(res.data);
    });
  };

  const determineWidthOfText = (name) => {
    var canv = document.createElement("canvas");
    var ctx2 = canv.getContext("2d");
    ctx2.font = "normal normal 400 20px Arial ";
    var txtWidth2 = ctx2.measureText(name).width;
    widthOfText.current = txtWidth2;
  };

  const getRouteImgGCP = (name) => {
    let routeNameWithoutGrade = name.split(", 5.").shift().toLowerCase();
    setRouteNameNoGrade(routeNameWithoutGrade);
    console.log("route name without grade: ", routeNameWithoutGrade);
    props.prepareRouteName(routeNameWithoutGrade);
  };

  const enableKeyboardMobile = () => {
    document.getElementById("special-box").readonly = false;
  };

  const disableKeyboardMobile = () => {
    document.getElementById("special-box").readonly = true;
  };

  const clickInComboBox = () => {
    enableKeyboardMobile();
    props.setDoesUserWantToSearch(true);
  };

  return (
    <div className="searched">
      <form className="some-form">
        <GoogleMarker />
        <Combobox
          id="cBox"
          onClick={() => clickInComboBox()}
          onSelect={async (e) => {
            await disableKeyboardMobile();
            await determineWidthOfText(e);
            await assignValue(e);
            await getRouteImgGCP(e);
            await getSomeData(e);
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
            {props.doesUserWantToSearch && (
              <ComboboxList className="special-box-list">
                {routeItemFromList}
              </ComboboxList>
            )}
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
