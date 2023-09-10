import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useGetMarketDataQuery } from "../state/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Marquee from "react-marquee-slider";

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

const Ticker = ({ children }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const childArray = React.Children.toArray(children); // This will ensure children is always an array

  if (!isSmallScreen) {
    return childArray; // Simply return the children as is if not on a small screen
  }

  return (
    <Marquee velocity={50} loop={0}>
      {childArray.map((child, index) => (
        <span key={index} style={{ marginRight: "30px" }}>
          {child}
        </span>
      ))}
    </Marquee>
  );
};

const MarketDetails = () => {
  const userID = useSelector((state) => state.global.user);
  const navigate = useNavigate();

  const { data, isLoading } = useGetMarketDataQuery();
  const theme = useTheme();

  const renderDetails = () => (
    <Box sx={{ display: "flex", alignItems: "center", mb: "-1rem" }}>
      {Headers.map(({ id, stats }) => (
        <Box sx={{ display: "flex", mr: 3 }}>
          <Typography
            variant="h6"
            sx={{
              mr: 1,
              color: theme.palette.grey[400],
              fontSize: "0.8rem",
            }}
          >
            {id}:
          </Typography>
          <Typography
            variant="h7"
            sx={{
              mr: 1,
              color: theme.palette.secondary[500],
              fontSize: "0.8rem",
            }}
          >
            {stats}
          </Typography>
        </Box>
      ))}
      <Typography
        variant="h6"
        sx={{
          mr: 1,
          color: theme.palette.grey[400],
          fontSize: "0.8rem",
        }}
      >
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
                fontSize: "0.8rem",
              }}
            >
              {items.sentiment} / {Number(items.score).toFixed(2)}
            </Typography>
          );
        }
      })}
    </Box>
  );

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
    <Box
      mt="0.5rem"
      sx={{
        borderBottom: 0.1,
        borderColor: "#ffffff",
        flexWrap: "wrap",
        display: "flex",
      }}
    >
      <Box mx="1rem" mb="1.5rem" sx={{ display: "flex", alignItems: "center" }}>
        <Ticker>{renderDetails()}</Ticker>
      </Box>
    </Box>
  );
};

export default MarketDetails;
