import React from "react";
import { Marker } from "react-leaflet";
import { Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { MissingPeopleCard } from "./MissingPeopleCard";

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  }
}));

export const MissingPeople = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(document.getElementsByTagName("main"));
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Marker
        position={props.center}
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseOver={handlePopoverOpen}
        onMouseOut={handlePopoverClose}
        bubblingMouseEvents={true}
      />

      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <MissingPeopleCard data={props.data} />
      </Popover>
    </>
  );
};
