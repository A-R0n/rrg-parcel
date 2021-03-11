import React, { useRef, useState, useCallback } from "react";
import "./App.css";
import AnimateHeight from "react-animate-height";
import { SearchInputBox } from "../SearchInputBox/SearchInputBox";
import MyGoogleMap from "../MyGoogleMap/MyGoogleMap.js";
// import SmallRoutePanoImg from "../SmallRoutePanoImg/SmallRoutePanoImg";
import DirectionsButton from "../DirectionsButton/DirectionsButton";

import Drawer from "react-bottom-drawer";

export default function App() {
  const [doesUserWantToSearch, setDoesUserWantToSearch] = React.useState(false);
  const [
    didUserSelectASuggestedRoute,
    setDidUserSelectASuggestedRoute,
  ] = React.useState(false);
  const [isLessThanSignShowing, setIsLessThanSignShowing] = React.useState(
    false
  );
  const [shouldShowDirections, setShouldShowDirections] = React.useState(false);
  const [
    shouldShowDirectionsButton,
    setShouldShowDirectionsButton,
  ] = React.useState(false);
  const [
    shouldShowSmallRoutePanoImg,
    setShouldShowSmallRoutePanoImg,
  ] = React.useState(false);
  const [shouldShowBigRouteImg, setShouldShowBigRouteImg] = React.useState(
    false
  );
  const [shouldShowRouteTitle, setShouldShowRouteTitle] = React.useState(false);
  const [shouldShowRouteGrade, setShouldShowRouteGrade] = React.useState(false);
  const [shouldShowRouteType, setShouldShowRouteType] = React.useState(false);
  const [
    shouldShowRouteIsDryInRain,
    setShouldShowRouteIsDryInRain,
  ] = React.useState(false);
  const [shouldShowMarker, setShouldShowMarker] = React.useState(false);
  const [geoCordsParking, setGeoCordsParking] = useState([]);
  const [geoCordsFinishLine, setGeoCordsFinishline] = React.useState([]);
  const [routeName, setRouteName] = useState("");
  const [isPanoImgExpand, setIsPanoImgExpand] = useState(false);

  const [isDrawerVisible, setIsDrawerVisible] = React.useState(false);

  let [heightHeader, setHeightHeader] = useState(120);
  let [heightTitle, setHeightTitle] = useState(40);
  const mapRefTrick = useRef();

  let shrinkHeader = () => {
    setHeightTitle(0);
    setHeightHeader(70);
    mapRefTrick.current.style.opacity = ".6";
  };

  const setSearchInputFieldForParking = useCallback((lat, lng) => {
    console.log("panTo: ", lat + ", " + lng);
    // mapRef.current.panTo({ lat, lng });
    setGeoCordsParking([lat, lng]);
    mapRefTrick.current.style.opacity = "1";
  }, []);

  const setSearchInputFieldForFinishLine = useCallback((lat, lng) => {
    setGeoCordsFinishLine([lat, lng]);
  }, []);

  const prepareRouteName = useCallback((routeName) => {
    console.log("route name callback function: ", routeName);
    setRouteName(routeName);
  }, []);

  const smallRoutePanoImgClicked = useCallback((val) => {
    console.log("val: ", val);
    setIsPanoImgExpand(val);
  }, []);

  const setShouldShowDirectionsCb = useCallback((val) => {
    setShouldShowDirections(val);
  }, []);

  const setShouldShowDirectionsBtnCb = useCallback((val) => {
    setShouldShowDirectionsButton(val);
  }, []);

  const onDrawerClose = React.useCallback(() => {
    setIsDrawerVisible(false);
  }, []);

  const ssb = React.useCallback((val) => {
    setShouldShowSmallRoutePanoImg(val);
  }, []);
  return (
    <main className="App">
      <AnimateHeight
        className="header-container"
        duration={750}
        height={heightHeader}
      >
        <AnimateHeight
          className="header-title"
          duration={500}
          height={heightTitle}
        >
          <h1 id="title-rrg">Red River Gorge</h1>
        </AnimateHeight>
        <div className="header-search">
          <div className="header-input-search" onClick={() => shrinkHeader()}>
            <SearchInputBox
              doesUserWantToSearch={doesUserWantToSearch}
              setDoesUserWantToSearch={setDoesUserWantToSearch}
              setSearchInputFieldForParking={setSearchInputFieldForParking}
              setSearchInputFieldForFinishLine={
                setSearchInputFieldForFinishLine
              }
              prepareRouteName={prepareRouteName}
              setShouldShowDirectionsButton={setShouldShowDirectionsButton}
              ssb={ssb}
              setIsDrawerVisible={setIsDrawerVisible}
            />
          </div>
        </div>
      </AnimateHeight>
      <div className="GoogleMap" ref={mapRefTrick}>
        <MyGoogleMap
          geoCordsParking={geoCordsParking}
          geoCordsFinishLine={geoCordsFinishLine}
          isPanoImgExpand={isPanoImgExpand}
          smallRoutePanoImgClicked={smallRoutePanoImgClicked}
          shouldShowDirections={shouldShowDirections}
          setShouldShowDirectionsBtnCb={setShouldShowDirectionsBtnCb}
        />
        {/* {shouldShowSmallRoutePanoImg && (
          <SmallRoutePanoImg
            routeName={routeName}
            smallRoutePanoImgClicked={smallRoutePanoImgClicked}
          />
        )} */}
        <Drawer
          isVisible={isDrawerVisible}
          onClose={onDrawerClose}
          duration={250}
          hideScrollbars={true}
        >
          <h1>{routeName}</h1>
          <p>This route is really awesome</p>
          <DirectionsButton
            setShouldShowDirectionsCb={setShouldShowDirectionsCb}
          />
        </Drawer>
      </div>
    </main>
  );
}
