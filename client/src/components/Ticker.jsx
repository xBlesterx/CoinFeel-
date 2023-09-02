import React from "react";
import { useGetMarketDataQuery } from "../state/api";

import { Box } from "@mui/material";

import Marquee from "react-marquee-slider";

const TickerItem = ({ crypto }) => (
  <Box
    component="div"
    sx={{
      display: "flex",
      alignItems: "center",
      padding: "0 30px",
      borderRight: "1px solid #555",
    }}
  >
    <Box
      component="img"
      alt={crypto.name}
      src={crypto.image}
      sx={{ height: 24, width: 24, marginRight: 1 }}
    />
    <Box component="span">
      {crypto.name} <Box>({crypto.symbol.toUpperCase()})</Box>
    </Box>
    <Box component="span" sx={{ marginLeft: 1 }}>
      $
      {crypto.current_price > 0
        ? Number(crypto.current_price).toLocaleString()
        : Number(crypto.current_price).toFixed(6).toLocaleString()}
    </Box>
  </Box>
);

const Ticker = () => {
  const { data, isLoading } = useGetMarketDataQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      className="ticker"
      sx={{
        width: "100%",
        backgroundColor: "#191f45",
      }}
    >
      <Marquee velocity={30}>
        {data?.cryptoLatestInfo.data.slice(0, 10).map((crypto) => (
          <TickerItem key={crypto.id} crypto={crypto} />
        ))}
      </Marquee>
    </Box>
  );
};

export default Ticker;
