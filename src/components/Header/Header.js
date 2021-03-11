import React from "react";
import AnimateHeight from "react-animate-height";
import { SearchInputBox } from "../SearchInputBox/SearchInputBox";

function reducer(state, action) {
    return state;
}

export default function Header() {
  const [routeName, setRouteName] = React.useState("");
  const [{ geoCords }, dispatch] = React.useReducer(reducer, { geoCords: [] });

  let [heightHeader, setHeightHeader] = useState(120);
  let [heightTitle, setHeightTitle] = useState(40);

  let toggle = () => {
    setHeightTitle(0);
    setHeightHeader(70);
    mapRefTrick.current.style.opacity = ".6";
  };
//   const setSearchInputField = dispatch([]);

  const setSearchInputField = useCallback((lat, lng) => {
    console.log("panTo: ", lat + ", " + lng)
    setGeoCords([lat, lng]);
    mapRefTrick.current.style.opacity = "1";
  }, []);

  const getRouteName = useCallback((routeName) => {
    console.log("route name callback function: ", routeName);
    setRouteName(routeName);
  }, []);
  return (
    <AnimateHeight
      className="header-container"
      duration={750}
      height={heightHeader}
      style={{ flexShrink: 0 }}
    >
        <h1 id="title-rrg">Red River Gorge</h1>
      <div className="header-search">
        <div
          className="header-input-search"
          // type="text"
          onClick={() => toggle()}
        >
          <SearchInputBox
            setSearchInputField={setSearchInputField}
            getRouteName={getRouteName}
          />
        </div>
      </div>
    </AnimateHeight>
  );
}
