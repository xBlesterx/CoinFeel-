import React from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { useGetMarketDataQuery } from "../state/api";
import { sentiment as dummy } from "../dummyData";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const backColor = (score) => {
  if (score >= 0 && score < 0.4) {
    return "#FF471A";
  } else if (score >= 0.4 && score < 1) {
    return "#FF8833";
  } else if (score >= 1 && score < 1.2) {
    return "#FFCC66";
  } else if (score >= 1.2 && score < 1.6) {
    return "#99CC66";
  } else if (score >= 1.6 && score <= 2) {
    return "#33CC33";
  }

  return "#000000";
};

function formatNumber(num) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + "T";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  }
  return num.toString();
}

const MarketDetails = () => {
  const userID = useSelector((state) => state.global.user);
  const navigate = useNavigate();

  const { data, isLoading } = useGetMarketDataQuery();
  const theme = useTheme();
  const Headers = data
    ? [
        {
          id: "Market",
          stats: data.globalInfo.data.data.markets,
        },
        {
          id: "Active Crypto",
          stats: Number(data.globalInfo.data.data.active_cryptocurrencies),
        },
        {
          id: "Market Cap",
          stats: `$${formatNumber(
            data.globalInfo.data.data.total_market_cap.usd
          )}`,
        },
        {
          id: "24h Vol",
          stats: `$${formatNumber(data.globalInfo.data.data.total_volume.usd)}`,
        },
        {
          id: "Market Cap %",
          stats: `${data.globalInfo.data.data.market_cap_change_percentage_24h_usd.toFixed(
            3
          )}%`,
        },
      ]
    : [];

  return (
    <Box mt="0.5rem" sx={{ borderBottom: 0.1, borderColor: "#ffffff" }}>
      <Box mx="1rem" mb="0.5rem" sx={{ display: "flex", alignItems: "center" }}>
        {Headers.map(({ id, stats }) => (
          <Box sx={{ display: "flex", mr: 3 }}>
            <Typography
              variant="h6"
              sx={{ mr: 1, color: theme.palette.grey[400] }}
            >
              {id}:
            </Typography>
            <Typography
              variant="h7"
              sx={{ mr: 1, color: theme.palette.secondary[500] }}
            >
              {stats}
            </Typography>
          </Box>
        ))}
        <Typography variant="h6" sx={{ mr: 1, color: theme.palette.grey[400] }}>
          Sentiment / Score:
        </Typography>
        {data?.sentiment.map((items) => {
          if (items["Crypto"] === "topNews") {
            return (
              <Typography
                variant="h7"
                sx={{
                  mr: 1,
                  color: backColor(items.score),
                }}
              >
                {items.sentiment} / {Number(items.score).toFixed(2)}
              </Typography>
            );
          }
        })}
        {!userID ? (
          <Box sx={{ display: "flex", ml: "auto" }}>
            <Box sx={{ mr: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  color: theme.palette.secondary[500],
                  "&:hover": {
                    backgroundColor: theme.palette.grey[200],
                    color: "#000",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                <Typography variant="h5" sx={{ mx: 1 }}>
                  Log In
                </Typography>
              </Button>
            </Box>
            <Box sx={{}}>
              <Button
                sx={{
                  background: theme.palette.secondary[500],
                  color: theme.palette.grey[1000],
                  "&:hover": {
                    backgroundColor: theme.palette.grey[200],
                    color: "#3c52b2",
                  },
                }}
                onClick={() => navigate("/signup")}
              >
                <Typography variant="h5" sx={{ mx: 1 }}>
                  Sign Up
                </Typography>
              </Button>
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  );
};

export default MarketDetails;
