import React from "react";
import { Circle } from "react-leaflet";

import { Popover } from "@material-ui/core";
import { RiskInfoCard } from "../RiskInfoCard/RiskInfoCard";

export const RiskAreaMarker = ({ center, radius, color, ...otherProps }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = () => {
    setAnchorEl(document.getElementsByTagName("body")[0]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Circle
        center={[36.7783, 119.4179]}
        radius={200}
        onClick={handleClick}
        color={color}
        fillOpacity={0.8}
      />
      <Popover
        id="simple-popover"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        onClose={handleClose}
      >
        <RiskInfoCard {...otherProps} />
      </Popover>
    </>
  );
};
