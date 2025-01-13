import * as React from "react";
import { Box, Typography } from "@mui/material";
import { RootTypes } from "../types/Types";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";

const TabsOverview = (finalData: { finalData: RootTypes[] }) => {
  const [tabDetails, setTabDetails] = React.useState<any>(null);

  const reducer = (keyName: string) => {
    const makeCount = finalData.finalData.reduce((acc, vehicle) => {
      if (vehicle.make) {
        const make = vehicle?.[keyName].toLowerCase();
        acc[make] = (acc[make] || 0) + 1;
        return acc;
      }
      return acc;
    }, {});
    return makeCount;
  };

  const sortCount = (makeCount: any) => {
    const sortedMakeCount = Object.fromEntries(
      Object.entries(makeCount).sort((a, b) => {
        const [, valueA] = a as [string, number];
        const [, valueB] = b as [string, number];
        return valueB - valueA;
      })
    );
    return sortedMakeCount;
  };

  const makeNames = () => {
    const cityName = reducer("city");
    const cityCount = sortCount(cityName);
    const sortedCityCount = sortCount(cityCount);
    const [firstKey] = Object.entries(sortedCityCount)[0];

    const vehicleWithMaxRange = finalData.finalData.reduce(
      (maxVehicle, currentVehicle) => {
        const maxRange = parseInt(maxVehicle.electricRange, 10);
        const currentRange = parseInt(currentVehicle.electricRange, 10);
        return currentRange > maxRange ? currentVehicle : maxVehicle;
      }
    );

    const modalName = reducer("make");
    const mostRepeatedMake = Object.entries(modalName).reduce(
      (max: any, [make, count]: any) => {
        return count > max.count ? { make, count } : max;
      },
      { make: "", count: 0 }
    );
    const tabsObject = [
      {
        id: "01",
        name: firstKey,
        title: "Most EVs in City",
        desc: "City with the highest number of EVs",
        icon: <LocationCityIcon sx={styles.icon} />,
      },
      {
        id: "02",
        name: vehicleWithMaxRange.electricRange,
        title: "Highest EV Range",
        desc: `Provided by ${vehicleWithMaxRange.make}`,
        icon: <BatteryChargingFullIcon sx={styles.icon} />,
      },
      {
        id: "03",
        name: "Battery Electric Vehicle",
        title: "Electric Vehicle Type",
        desc: "City with the highest number of EVs",
        icon: <TrendingUpIcon sx={styles.icon} />,
      },
      {
        id: "04",
        name: mostRepeatedMake.make,
        title: "Electric Type ",
        desc: "Most electric type provided by makers",
        icon: <ElectricCarIcon sx={styles.icon} />,
      },
    ];
    setTabDetails(tabsObject);
  };

  React.useEffect(() => {
    finalData.finalData && makeNames();
  }, []);
  return (
    <Box sx={styles.container}>
      {tabDetails &&
        tabDetails.map((item: any, index: number) => (
          <Box sx={styles.card} key={index}>
            <Box sx={styles.cardContent}>
              <Typography sx={styles.title}>{item.title}</Typography>
              <Typography sx={styles.name}>{item.name}</Typography>
              <Typography sx={styles.description}>{item.desc}</Typography>
            </Box>
            <Box>{item.icon}</Box>
            <Box />
          </Box>
        ))}
    </Box>
  );
};

const styles = {
  icon: { color: "#00D5D1", fontSize: 30 },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    padding: "10px 10px",
    flexWrap: "wrap",
  },
  card: {
    boxShadow: 1,
    width: { lg: "22%", sm: "45%", xs: "100%" },
    borderRadius: "10px",
    height: "100px",
    bgcolor: "white",
    display: "flex",
    alignItems: "center",
    padding: "0px 10px",
    boxSizing: "border-box",
    justifyContent: "space-around",
    gap: 1,
  },
  cardContent: {
    height: "100%",
    width: "80%",
    gap: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 10,
    color: "#8a8989",
    fontFamily: "sans-serif",
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
    color: "#010101",
    textTransform: "capitalize",
    fontFamily: "sans-serif",
  },
  description: {
    fontSize: 10,
    fontFamily: "sans-serif",
    color: "#8a8989",
  },
};

export default TabsOverview;
