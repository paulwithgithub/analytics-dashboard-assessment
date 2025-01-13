import { Box, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import CircularProgress from "@mui/material/CircularProgress";
import csvFile from "../data_file/Electric_Vehicle_Population_Data.csv";
import TabsOverview from "./TabsOverview.tsx";
import LinearChart from "./charts/LinearChart.tsx";
import { headersList, RootTypes } from "../types/Types.ts";
import MuiPieChart from "./charts/MuiPieChart.tsx";
import DenseAppBar from "./AppBar.tsx";

const Home = () => {
  const [finalData, setFinalData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const converter = (rows: string[][]) => {
    const jsonData = rows.slice(1).map((row) => {
      const values = row;
      const obj = {};
      headersList.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim();
      });
      return obj;
    });
    setFinalData(jsonData);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    fetch(csvFile)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
            converter(result.data);
          },
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);
  return (
    <>
      {loading ? (
        <Box sx={styles.loaderCont}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <DenseAppBar />
          <Container maxWidth={"lg"} sx={styles.container}>
            <Stack gap={2}>
              <TabsOverview finalData={finalData} />
              <LinearChart finalData={finalData} />
              <MuiPieChart finalData={finalData} />
            </Stack>
          </Container>
        </>
      )}
    </>
  );
};

const styles = {
  container: { padding: 1 },
  loaderCont: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

export default Home;
