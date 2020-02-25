import React from "react";
import { Card } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const pieColorStyles = {
  backgroundColor: [
    "#F7464A",
    "#46BFBD",
    "#FDB45C",
    "#949FB1",
    "#4D5360",
    "#AC64AD"
  ],
  hoverBackgroundColor: [
    "#FF5A5E",
    "#5AD3D1",
    "#FFC870",
    "#A8B3C5",
    "#616774",
    "#DA92DB"
  ]
};

export const RiskInfoCard = ({
  locationName,
  populationData,
  genderData,
  vulnerabilityScore,
  risks
}) => {
  return (
    <Card>
      <div
        style={{ width: "300px", textAlign: "center", paddingBottom: "20px" }}
      >
        <h1>{locationName}</h1>
        <h3>Vulnerability Score</h3>
        <h1>{Number(vulnerabilityScore * 100).toFixed(2)}%</h1>
        <h3>Population Data</h3>
        <Pie
          data={{
            labels: populationData.label,
            datasets: [
              {
                data: populationData.values,
                ...pieColorStyles
              }
            ]
          }}
        />
        <h3>Gender Ratio</h3>
        <Pie
          data={{
            labels: genderData.label,
            datasets: [
              {
                data: genderData.values,
                ...pieColorStyles
              }
            ]
          }}
        />
        <h3>Potential risks:</h3>
        <h4> {risks} </h4>
      </div>
    </Card>
  );
};

RiskInfoCard.defaultProps = {
  populationData: {
    label: ["Example 1", "Example 2"],
    values: [100, 100]
  },
  genderData: {
    label: ["Example 1", "Example 2"],
    values: [100, 100]
  }
};
