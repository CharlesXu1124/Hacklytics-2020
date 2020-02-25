import React, { useState, useEffect, useContext } from "react";
import request from "request-promise-native";
import { Map } from "react-leaflet";
import PropTypes from "prop-types";

import { RiskAreaMarker } from "../RiskAreaMarker/RiskAreaMarker";
import { MissingPeople } from "../MissingPeople/MissingPeople";
import { MapLayers } from "./MapLayers/MapLayers";
import GlobalContext from "../../GlobalContext";
import { GeoJSONDataOverlay } from "./Overlays/GeoDataOverlay/GeoDataOverlay";

const getColorRangeBasedOnValue = value => {
  const red = parseInt(255 * value).toString(16);
  const green = parseInt(255 * (1 - value)).toString(16);
  return `#${red}${green}00`;
};

export const DeviceMap = props => {
  const [districtPopulationData, setDistrictPopulationData] = useState({});
  const [missingPeopleData, setMissingPeopleData] = useState({});

  const GlobalState = useContext(GlobalContext).state;

  useEffect(() => {
    request({
      method: "GET",
      uri: "https://dataster-c6fa8.firebaseio.com/Country.json"
    }).then(data => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      setDistrictPopulationData(parsedData.Districts);
      setMissingPeopleData(parsedData.MissingPeople);
    });

    return () => {};
  }, []);

  return (
    <div style={{ width: "inherit", height: "inherit" }}>
      <Map center={props.position} zoom={7}>
        <MapLayers />
        {GlobalState.isLandslideAreaShown && (
          <GeoJSONDataOverlay
            uri="https://raw.githubusercontent.com/ropensci/geojsonio/master/inst/examples/california.geojson"
            color="red"
          />
          
          
        )}

        {GlobalState.isLandslideAreaShown && (
          <GeoJSONDataOverlay
            uri="https://raw.githubusercontent.com/johan/world.geo.json/master/countries/USA/NV.geo.json"
            color="red"
          />
          
          
        )}



        {GlobalState.isLandslideAreaShown && (
          <GeoJSONDataOverlay
            uri="https://raw.githubusercontent.com/glynnbird/usstatesgeojson/master/georgia.geojson"
            color="red"
          />
          
          
        )}

        {GlobalState.isLandslideAreaShown && (
          <GeoJSONDataOverlay
            uri="https://raw.githubusercontent.com/k-choonkiat/wildfire-prediction/master/map%20(1).geojson"
            color="red"
          />
          
          
        )}
        {GlobalState.isFireAreaShown && (
          <GeoJSONDataOverlay
            uri="https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/california-counties.geojson"
            color="red"
          />
          
        )}
        {GlobalState.isWeatherDataShown && (
          <GeoJSONDataOverlay
            uri="https://pmmpublisher.pps.eosdis.nasa.gov/products/gpm_1d/export/r07/2019/285/gpm_1d.20191012.geojson"
            color="red"
          />
        )}
        {GlobalState.isRiskAreaShown &&
          Object.keys(districtPopulationData).map((districtName, index) => {
            const districtData = districtPopulationData[districtName];

            const data = {
              Youth: districtData["%youth"] * districtData.population,
              "Middle-aged":
                (100 - districtData["%youth"] - districtData["%elderly"]) *
                districtData.population,
              Elderly: districtData["%elderly"] * districtData.population
            };

            return (
              <RiskAreaMarker
                center={[36.7783, 119.4179]}
                radius={20* 20}
                color={getColorRangeBasedOnValue(
                  districtData["Vulerability Score"]
                )}
                key={index}
                locationName={districtName}
                populationData={{
                  label: Object.keys(data),
                  values: Object.values(data)
                }}
                genderData={{
                  label: ["Male", "Female"],
                  values: [districtData["%male"], districtData["%female"]]
                }}
                vulnerabilityScore={districtData["Vulerability Score"]}
                risks={districtData["risks"]}
              />
            );
          })}
        {GlobalState.isMissingPeopleShown &&
          Object.keys(missingPeopleData).map((personName, index) => {
            const personData = missingPeopleData[personName];

            const data = {
              Name: personName,
              Age: personData["Age"],
              Disabled: personData["Disabled"],
              Gender: personData["Gender"]
            };

            console.log(data);

            return (
              <MissingPeople
                center={[
                  personData[`Last Seen`].Latitude,
                  personData[`Last Seen`].Longitude
                ]}
                key={index}
                data={data}
              />
            );
          })}
        })}
        <GeoJSONDataOverlay
          uri="https://raw.githubusercontent.com/shawnbot/topogram/master/data/us-states.geojson"
          color="purple"
        />
      </Map>
    </div>
  );
};

DeviceMap.propTypes = {
  position: PropTypes.array
};
