import { Box, Typography } from "@mui/material";
import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { RootTypes } from "../../types/Types";

const yearData = {};
const LinearChart = (finalData: { finalData: RootTypes[] }) => {
  const [graphDataList, setGraphDataList] = React.useState<
    { name: string; year: number | unknown }[]
  >([]);
  const yearCalculation = () => {
    let graphData: { name: string; year: number | unknown }[] = [];
    finalData.finalData.forEach((year: RootTypes) => {
      yearData[year.modelYear] = (yearData[year.modelYear] || 0) + 1;
    });
    Object.entries(yearData).forEach((arr) => {
      if (arr[0] !== "undefined") {
        const object = {
          name: arr[0],
          year: arr[1],
        };
        graphData = [...graphData, object];
      }
    });
    setGraphDataList(graphData);
  };

  React.useEffect(() => {
    finalData.finalData && yearCalculation();
  }, []);
  return (
    <Box>
      <Typography sx={styles.title}>EV's Growth over the years</Typography>
      <Box sx={styles.lineCont}>
        <ResponsiveContainer>
          <LineChart
            width={500}
            height={300}
            data={graphDataList}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: `count`,
                style: { textAnchor: "middle" },
                angle: -90,
                position: "left",
                offset: 0,
              }}
            />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="year"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

const styles = {
  title: {
    color: "#00D5D1",
    fontSize: 16,
    fontWeight: 550,
    paddingLeft: 1,
    paddingTop: 1,
    marginBottom: 1,
  },
  lineCont: { width: "100%", height: "300px" },
};

export default LinearChart;
