import React, { useMemo } from "react";
import { cryptoDetails as dummy } from "../../dummyData";
import { ResponsiveLine } from "@nivo/line";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Divider,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { nivoData } from "../../dummyData";
import Header from "../Header";

const CryptoGraph = ({ dataInfo }) => {
  const theme = useTheme();

  function formatPriceTick(value) {
    if (value >= 1e5) return `${(value / 1e3).toFixed(0)}K`;
    if (value >= 1) return value.toFixed(2);
    return value.toFixed(5); // for values less than 1, display 5 decimal places
  }

  const [formattedData] = useMemo(() => {
    if (!dataInfo) return [];

    const prices = dataInfo.cryptoHistoricalData.data.prices;

    const priceData = {
      id: "price",
      color: theme.palette.secondary.main,
      data: [],
    };
    prices.map((data) => {
      priceData.data = [
        ...priceData.data,
        { x: new Date(data[0]).toLocaleDateString(), y: data[1] },
      ];
    });
    const data1 = [priceData];
    return [data1];
  }, [dataInfo]);
  console.log(formattedData);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Header title="Charts" />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: theme.palette.primary.dark,
          borderRadius: 10,
          boxShadow: 20,
          m: 2,
          display: "flex", // <- Add Flexbox
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" justifyContent="flex-end" paddingRight={2}>
          <FormControl sx={{ width: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select value={1} label="Time range">
              <MenuItem value={7}>Weekly</MenuItem>
              <MenuItem value={30}>Monthly</MenuItem>
              <MenuItem value={365}>Yearly</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ResponsiveLine
          data={formattedData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          colors={{ datum: "color" }}
          margin={{ top: 50, right: 80, bottom: 75, left: 5 }}
          xScale={{
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
            type: "time",
            format: "%d/%m/%Y",
            tickRotation: -49,
          }}
          xFormat="time:%d/%m/%Y"
          yScale={{
            type: "linear",
            base: 10,
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          curve="monotoneX"
          yFormat=">.2f"
          //curve="catmullRom"
          axisTop={false}
          axisBottom={{
            orient: "bottom",
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 90,
            format: "%b %Y",
            tickValues: "every month",
            legend: "Month",
            legendOffset: 80,
            legendPosition: "middle",
          }}
          axisLeft={false}
          axisRight={{
            orient: "right",
            tickSize: 10,
            tickPadding: 10,
            tickRotation: 0,
            format: formatPriceTick,
            legend: "Price",
            legendOffset: 80,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          enableArea={true}
          areaBaselineValue={0}
          areaOpacity={0.2}
          pointSize={4}
          pointColor={{ theme: "background" }}
          pointBorderWidth={3}
          pointBorderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      </Box>
    </Box>
  );
};

export default CryptoGraph;
