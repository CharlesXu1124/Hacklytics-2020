import React from "react";
import { Card } from "@material-ui/core";

export const MissingPeopleCard = ({ data }) => {
  var disabled = data.Disabled ? "Yes" : "No";
  var gender = data.Gender === "F" ? "Female" : "Male";
  return (
    <Card>
      <div style={{ width: "300px", textAlign: "center" }}>
        <h3> {data.Name} </h3>
        <h4> Age: {data.Age}</h4>
        <h4> Gender: {gender} </h4>
        <h4> Disabled: {disabled} </h4>
      </div>
    </Card>
  );
};

MissingPeopleCard.defaultProps = {
  data: "No information avaliable"
};
