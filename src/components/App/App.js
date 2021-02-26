import React, { useRef, useState, useCallback } from "react";
import "./App.css";
import AnimateHeight from "react-animate-height";
import MagnifyingGlass from "../MagnifyingGlass/MagnifyingGlass";
import { CancelButtonOutside } from "../CancelButtonOutside/CancelButtonOutside";
import { SearchInputBox } from "../SearchInputBox/SearchInputBox";
import MyGoogleMap from "../MyGoogleMap/MyGoogleMap.js";

export default function App() {
  const [geoCords, setGeoCords] = useState([]);
  let [heightHeader, setHeightHeader] = useState(120);
  let [heightTitle, setHeightTitle] = useState(40);
  const [isCancelButtonClicked, setIsCancelButtonClicked] = useState(false);

  const mapRef = useRef();
  const mapRefTrick = useRef();

  let toggle = () => {
    setHeightTitle(0);
    setHeightHeader(70);
    setIsCancelButtonClicked(false);
    mapRefTrick.current.style.opacity = ".6";
  };

  let toggleThat = () => {
    setHeightHeader(120);
    setHeightTitle(40);
    setIsCancelButtonClicked(true);
    mapRefTrick.current.style.opacity = "1";
  };

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback((lat, lng) => {
    mapRef.current.panTo({ lat, lng });
    setGeoCords([lat, lng]);
    mapRefTrick.current.style.opacity = "1";
  }, []);

  return (
    <main className="App">
      <AnimateHeight
        className="header-container"
        duration={750}
        height={heightHeader}
        style={{ flexShrink: 0 }}
      >
        <AnimateHeight
          className="header-title"
          duration={500}
          height={heightTitle}
          style={{ flexShrink: 0 }}
        >
          <h1 id="title-rrg">Red River Gorge</h1>
        </AnimateHeight>
        <div className="header-search">
          <div
            className="header-input-search"
            type="text"
            onClick={() => toggle()}
          >
            <MagnifyingGlass />
            <SearchInputBox
              panTo={panTo}
              isCancelButtonClicked={isCancelButtonClicked}
            />
          </div>

          <CancelButtonOutside toggleThat={toggleThat} />
        </div>
      </AnimateHeight>
      <div className="GoogleMap" ref={mapRefTrick}>
        <MyGoogleMap geoCords={geoCords} onMapLoad={onMapLoad} />
      </div>
      <footer>
        <p>© 2021 - Aaron Estes</p>
      </footer>
    </main>
  );
}
