import React, { useMemo } from "react";

import { ResponsiveLine } from "@nivo/line";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";

import Header from "../../components/Header";
import { useGetMarketSentimentQuery } from "../../state/api";

const GlobalSummary = ({ data }) => {
  return (
    <Box
      elevation={10}
      sx={{
        p: 4,
        borderRadius: 2,
        marginBottom: 3,
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: "monospace",
          fontSize: 40,
          fontWeight: "bold",
          mb: 0.5,
        }}
      >
        Global Cryptocurrency Summary
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {/* Active Cryptocurrencies */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              fontWeight: "bold",
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            Active Cryptocurrencies:{" "}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: "bold",
                color: "#f0c665",
                ml: 1,
              }}
            >
              {data.active_cryptocurrencies}
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              fontWeight: "bold",
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            Ongoing ICOs:{" "}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: "bold",
                color: "#f0c665",
                ml: 1,
              }}
            >
              {data.ongoing_icos}
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              fontWeight: "bold",
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            Ended ICOs:{" "}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: "bold",
                color: "#f0c665",
                ml: 1,
              }}
            >
              {data.ended_icos}
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              fontWeight: "bold",
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            Markets:{" "}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: "bold",
                color: "#f0c665",
                ml: 1,
              }}
            >
              {data.markets}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          {/* Similarly styled Typography components for other grid items */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              fontWeight: "bold",
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            Total Market Cap (USD):{" "}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: "bold",
                color: "#f0c665",
                ml: 1,
              }}
            >
              $ {data.total_market_cap.usd.toLocaleString()}
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              fontWeight: "bold",
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            Total Volume (USD):
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: "bold",
                color: "#f0c665",
                ml: 1,
              }}
            >
              $ {data.total_volume.usd.toLocaleString()}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Similarly styled Typography components for this grid item */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              fontWeight: "bold",
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            BTC Market Cap Percentage:{" "}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: "bold",
                color: "#f0c665",
                ml: 1,
              }}
            >
              {data.market_cap_percentage.btc.toFixed(2)}%
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "monospace",
              fontSize: 17,
              fontWeight: "bold",
              color: "text.primary",
              mb: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            ETH Market Cap Percentage:{" "}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 17,
                fontWeight: "bold",
                color: "#f0c665",
                ml: 1,
              }}
            >
              {data.market_cap_percentage.eth.toFixed(2)}%
            </Typography>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color:
                data.market_cap_change_percentage_24h_usd > 0
                  ? "#16c784"
                  : "#ea3943",
              fontSize: 17,
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            Price Movement:{" "}
            {data.market_cap_change_percentage_24h_usd.toFixed(4)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
const Sentiment = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetMarketSentimentQuery();

  const [formattedData2] = useMemo(() => {
    if (!data || !data.sentiment) return [null];
    if (!isLoading) {
      const marketSentiment = data.sentiment;
      const sentimentData = marketSentiment[0].data;

      const formattedSentimentData = {
        id: marketSentiment[0].id,
        color: marketSentiment[0].color,
        data: [],
      };

      sentimentData.map((entry) => {
        formattedSentimentData.data = [
          ...formattedSentimentData.data,
          { x: new Date(entry.x).toLocaleDateString(), y: entry.y },
        ];
      });

      const data1 = [formattedSentimentData];
      return [data1];
    }
  }, [data]);

  return (
    <Box m="1.5rem 2.5rem" sx={{ height: "100%" }}>
      <Header
        title="Market Sentiment"
        subtitle="Review today's market movement and sentiment"
      />
      {data && !isLoading ? (
        <>
          <GlobalSummary data={data.global.data.data} />
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              backgroundColor: theme.palette.primary.dark,
              borderRadius: 2,
              boxShadow: 2,
              padding: "1rem",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontFamily: "monospace",
                fontSize: 40,
                fontWeight: "bold",
                mb: 0.5,
              }}
            >
              Sentiment Analysis
            </Typography>

            <ResponsiveLine
              data={formattedData2}
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
                tickRotation: 1,
              }}
              xFormat="time:%d/%m/%Y"
              yScale={{
                type: "linear",
                base: 10,
                min: 0,
                max: 2,
                stacked: false,
                reverse: false,
              }}
              curve="cardinal"
              yFormat=">.2f"
              //curve="catmullRom"
              axisTop={false}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 90,
                format: "%b %Y",
                tickValues: "every day",
                legend: "Day",
                legendOffset: 50,
                legendPosition: "middle",
              }}
              axisLeft={false}
              axisRight={{
                orient: "right",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Sentiment",
                legendOffset: 70,
                legendPosition: "middle",
              }}
              enableGridX={false}
              enableGridY={false}
              enableArea={true}
              areaBaselineValue={0}
              areaOpacity={0.1}
              pointSize={2}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
            />
          </Box>
        </>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default Sentiment;
