import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import request from "request-promise-native";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [districtJSONData, setDistrictJSONData] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    request({
      method: "GET",
      uri: "https://dataster-c6fa8.firebaseio.com/Country/Messages.json"
    }).then(data => {
      console.log(data);
      const parsedData = JSON.parse(data);
      setDistrictJSONData(parsedData);
    }, console.log);
    return () => {};
  }, []);

  return (
    <div>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        VIEW
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>
            {" "}
            Priority: {props.priority}: {props.type}{" "}
          </h2>
          <p>
            <strong>Location:</strong> {props.location}
          </p>
          <p>
            {" "}
            <strong>Latitude:</strong> {props.latitude} , Longitude:{" "}
            {props.longitude}
          </p>
          <p id="simple-modal-description">
            <strong>Message</strong>: {props.description}
          </p>
        </div>
      </Modal>
    </div>
  );
}

SimpleModal.defaultProps = {
  type: "test",
  description: "test2"
};
