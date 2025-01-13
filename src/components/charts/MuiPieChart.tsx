import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { desktopOS, valueFormatter } from "./ExtendMui.tsx";
import { Box } from "@mui/material";
import { RootTypes } from "../../types/Types.ts";
const yearData = {};

interface Types {
  tesla: number;
  nissan: number;
  chevrolet: number;
  bmw: number;
  ford: number;
}

export default function MuiPieChart(finalData: { finalData: RootTypes[] }) {
  const [makeDataPieList, setMakeDataPieList] = React.useState<
    | {
        id: number;
        value: number;
        label: string;
      }[]
    | null
  >(null);
  const [cityDataPieList, setCityDataPieList] = React.useState<
    | {
        value: number;
        label: string;
      }[]
    | null
  >(null);
  const makeNames = () => {
    const makeCount = finalData.finalData.reduce((acc, vehicle) => {
      if (vehicle.make) {
        const make = vehicle?.make.toLowerCase();
        acc[make] = (acc[make] || 0) + 1;
        return acc;
      }
      return acc;
    }, {});
    const cityCount = finalData.finalData.reduce(
      (acc: Record<string, number>, vehicle) => {
        if (vehicle.make) {
          const city = vehicle?.city.toLowerCase();
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        }
        return acc;
      },
      {}
    );
    const sortedMakeCount = Object.fromEntries(
      Object.entries(makeCount).sort((a, b) => {
        const [, valueA] = a as [string, number];
        const [, valueB] = b as [string, number];
        return valueB - valueA;
      })
    );
    const sortedCityCount = Object.fromEntries(
      Object.entries(cityCount).sort((a, b) => {
        const [, valueA] = a as [string, number];
        const [, valueB] = b as [string, number];
        return valueB - valueA;
      })
    );

    const { tesla, chevrolet, bmw, ford, nissan } = sortedMakeCount;
    const { seattle, bellevue, vancouver, kirkland, sammamish } =
      sortedCityCount;

    const obj = [
      { id: 0, value: tesla as number, label: "Tesla" },
      { id: 1, value: chevrolet as number, label: "Chevrolet" },
      { id: 2, value: bmw as number, label: "BMW" },
      { id: 3, value: ford as number, label: "Ford" },
      { id: 4, value: nissan as number, label: "Nissan" },
    ];

    const cityObj = [
      { value: seattle as number, label: "seattle" },
      { value: bellevue as number, label: "bellevue" },
      { value: vancouver as number, label: "vancouver" },
      { value: kirkland as number, label: "kirkland" },
      { value: sammamish as number, label: "sammamish" },
    ];
    setMakeDataPieList(obj);
    setCityDataPieList(cityObj);
  };

  React.useEffect(() => {
    finalData.finalData && makeNames();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { md: "45%", sm: "100%", xs: "100%" },
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <PieChart
          series={[
            {
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              valueFormatter,
              data: cityDataPieList
                ? cityDataPieList
                : [
                    {
                      label: "Windows",
                      value: 72.72,
                    },
                  ],
            },
          ]}
          height={200}
          width={400}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: { md: "45%", sm: "100%", xs: "100%" },
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <PieChart
          series={[
            {
              data: makeDataPieList ? makeDataPieList : [],
            },
          ]}
          width={400}
          height={200}
        />
      </Box>
    </Box>
  );
}
