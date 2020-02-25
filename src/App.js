import React, { useEffect } from "react";

import { DeviceMap } from "./components/DeviceMap/DeviceMap.jsx";
import { NavDrawer } from "./components/NavDrawer/NavDrawer.jsx";
import { GlobalProvider } from "./GlobalContext.jsx";

import "./App.css";
import { Container, ButtonGroup, Button, Card } from "@material-ui/core";

const defaultState = {
  position: [37.7749, -122.4194],
  isRiskAreaShown: true,
  isLandslideAreaShown: true,
  isWeatherDataShown: true,
  isMissingPeopleShown: true,
  isFireAreaShown: false
};


function App() {
  const [state, setState] = React.useState(defaultState);

  const handleRiskClick = () => {
    setState({ ...state, isRiskAreaShown: !state.isRiskAreaShown });
  };

  const handleLandslideAreaClick = () => {
    setState({ ...state, isLandslideAreaShown: !state.isLandslideAreaShown });
  };

  const handleFireAreaClick = () => {
    setState({ ...state, isFireAreaShown: !state.isFireAreaShown });
  }

  const handleWeatherAreaClick = () => {
    setState({ ...state, isWeatherDataShown: !state.isWeatherDataShown });
  };


  useEffect(() => {
    return () => {};
  });

  return (
    <div>
      <GlobalProvider value={{ state, setState }}>
        <Container>
          <Card
            style={{
              position: "absolute",
              bottom: "20px",
              marginLeft: "200px",
              backgroundColor: "white",
              display: "inline-block",
              width: "auto"
            }}
          >
            <ButtonGroup style={{ margin: "0px" }}>
              <Button
                onClick={handleLandslideAreaClick}
                style={{ backgroundColor: "blue" }}
                color="secondary"
                variant="contained"
              >
                Toggle hotspots
                
              </Button>

              <Button
                onClick={handleFireAreaClick}
                style={{ backgroundColor: "orange" }}
                color="secondary"
                variant="contained"
              >
                Show Fire Area
                
              </Button>
            </ButtonGroup>
          </Card>
          <NavDrawer />
          <DeviceMap position={state.position} />
        </Container>
      </GlobalProvider>
    </div>
  );
}

export default App;
