import { useState, useEffect } from "react";
import { PieChart, Pie, Legend } from "recharts";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import SectionTitle from "./Utiles/SetTheme/SectionTitle/SectionTitle";

const Charts = ({ total, yes: totalYes }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const updatedPieChartData = [
      { name: "Yes", value: totalYes, fill: "gray" },
      { name: "No", value: total - totalYes, fill: "#1d3557" },
    ];

    setPieChartData(updatedPieChartData);
  }, [total, totalYes]); // Re-run effect when total or yes changes

  return (
    <Box>
      <SectionTitle heading={"Survey Chart"}></SectionTitle>
      <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx={200}
            cy={160}
            innerRadius={0}
            outerRadius={130}
            paddingAngle={0}
          />
          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              position: "absolute",
              bottom: 0,
              left: 10,
            }}
            data={[
              { name: "Yes", value: "gray", type: "square" },
              { name: "No", value: "#1d3557", type: "square" },
            ]}
          />
        </PieChart>
      </Box>
    </Box>
  );
};

Charts.propTypes = {
  total: PropTypes.number.isRequired,
  yes: PropTypes.number.isRequired,
};

export default Charts;
