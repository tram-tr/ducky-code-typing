import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

const LineChart = ({
  rawData,
  dataLabels,
  chartTitle,
  pointLabel,
  selectionLabel,
}) => {
  const [dataPointsToShow, setDataPointsToShow] = useState(10);

  // Get the last N data points based on the selected value
  const filteredData = fillMissingDataPoints(
    rawData.slice(Math.max(rawData.length - dataPointsToShow, 0)),
    dataPointsToShow
  );
  const filteredDataLabels = fillMissingLabels(
    dataLabels.slice(Math.max(dataLabels.length - dataPointsToShow, 0)),
    dataPointsToShow
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: chartTitle,
        color: "#ffd801",
        font: {
          family: `"Courier New", monospace`,
          size: 20, // Set the font size of the title
          weight: "bold", // Optional: Set the font weight of the title
        },
      },
    },
  };

  const data = {
    labels: filteredDataLabels,
    datasets: [
      {
        fill: true,
        label: pointLabel,
        data: filteredData,
        borderColor: "#ffd801",
        backgroundColor: "rgba(220, 250, 1, 0.2)",
      },
    ],
  };

  const handleDataPointsChange = (event) => {
    setDataPointsToShow(parseInt(event.target.value));
  };

  return (
    <div
      style={{
        marginTop: "25px",
        marginBottom: "20px",
      }}
    >
      <div>
        <label
          htmlFor="data-points"
          className="chart-selection"
        >
          {selectionLabel}:{" "}
        </label>
        <select
          id="data-points"
          value={dataPointsToShow}
          onChange={handleDataPointsChange}
          className="data-points-selection"
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={60}>60</option>
        </select>
      </div>
      <div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineChart;

// Helper function to fill missing data points with null values to the right
const fillMissingDataPoints = (data, targetLength) => {
  if (data.length >= targetLength) return data;
  const filledData = data.slice(); // Create a copy of the original data array
  while (filledData.length < targetLength) {
    filledData.push(null);
  }
  return filledData;
};

// Helper function to fill missing labels with empty strings to the right
const fillMissingLabels = (labels, targetLength) => {
  if (labels.length >= targetLength) return labels;
  const filledLabels = labels.slice(); // Create a copy of the original labels array
  while (filledLabels.length < targetLength) {
    filledLabels.push("");
  }
  return filledLabels;
};
