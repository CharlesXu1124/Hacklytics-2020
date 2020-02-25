import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import request from "request-promise-native";
import { GeoJSON } from "react-leaflet";
import { Popover, Card } from "@material-ui/core";

export const GeoJSONDataOverlay = props => {
  const [geoJSONData, setGeoJSONData] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mouseClickLatLng, setMouseClickLatLng] = useState([null, null]);

  useEffect(() => {
    request({
      method: "GET",
      uri: props.uri
    }).then(data => {
      const parsedData = JSON.parse(data);
      setGeoJSONData(parsedData);
    });
    return () => {};
  }, []);

  const handleClick = event => {
    setAnchorEl(document.getElementsByTagName("body")[0]);
    setMouseClickLatLng([event.latlng.lat, event.latlng.lng]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: handleClick
    });
  };

  return geoJSONData ? (
    <>
      <GeoJSON
        data={geoJSONData}
        color={props.color}
        onEachFeature={onEachFeature}
      />
      <Popover
        id="simple-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "center", vertical: "center" }}
        onClose={handleClose}
      >
        <Card style={{ padding: "0 20px", textAlign: "center" }}>
          <h3>Location</h3>
          <p>
            {mouseClickLatLng.map((location, index) => {
              return Number(location).toFixed(4) + (index === 0 ? ", " : "");
            })}
          </p>
        </Card>
      </Popover>
    </>
  ) : null;
};

GeoJSONDataOverlay.propTypes = {
  uri: propTypes.string,
  color: propTypes.string,
  onClick: propTypes.func
};
