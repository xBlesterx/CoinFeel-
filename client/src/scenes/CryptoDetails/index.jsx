import React, { useState, useEffect, useRef } from "react";
import { useGetCryptoDetailsQuery } from "../../state/api";
import { useParams } from "react-router-dom";
import { cryptoDetails as dummy } from "../../dummyData";
import {
  Box,
  useTheme,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import CryptoGraph from "../../components/CryptoDetails/CryptoGraph";
import CryptoInfo from "../../components/CryptoDetails/CryptoInfo";
import ExchangeDetails from "../../components/CryptoDetails/ExchangeDetails";
import CryptoNews from "../../components/CryptoDetails/CryptoNews";
import CryptoAbout from "../../components/CryptoDetails/CryptoAbout";

const CryptoDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCryptoDetailsQuery(id);

  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);
  const chartRef = useRef(null);
  const newsRef = useRef(null);
  const exchangesRef = useRef(null);
  const aboutRef = useRef(null);
  const scrollableContainerRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    switch (newValue) {
      case 0:
        aboutRef.current.scrollIntoView({ block: "nearest" });
        break;
      case 1:
        chartRef.current.scrollIntoView({ block: "nearest" });
        break;
      case 2:
        exchangesRef.current.scrollIntoView({ block: "nearest" });
        break;
      case 3:
        newsRef.current.scrollIntoView({ block: "nearest" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const chartPos = chartRef.current.getBoundingClientRect().top;

      const newsPos = newsRef.current.getBoundingClientRect().top;

      const exchangesPos = exchangesRef.current.getBoundingClientRect().top;

      const aboutPos = aboutRef.current.getBoundingClientRect().top;

      if (aboutPos >= 0) {
        setTabValue(0);
      } else if (chartPos <= exchangesPos && chartPos > aboutPos) {
        setTabValue(1);
      } else if (exchangesPos <= newsPos && exchangesPos > chartPos) {
        setTabValue(2);
      } else {
        setTabValue(3);
      }
    };

    // Add the event listener to the scrollable container
    scrollableContainerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      scrollableContainerRef.current?.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <Grid container spacing={3} style={{ height: "93vh", overflow: "hidden" }}>
      {/* Left section (Crypto Details) */}
      <Grid item xs={12} md={3}>
        <Box
          sx={{
            height: "89vh",
            width: "100%",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {data ? (
            <CryptoInfo data={data.cryptoInfoData.data} />
          ) : (
            <CircularProgress />
          )}
          {/* <CryptoInfo /> */}
        </Box>
      </Grid>

      {/* Right section (Chart, News, Exchanges) */}
      <Grid item xs={12} md={9}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            position: "sticky",
            height: 10,
            top: 0,
            zIndex: 1,
            backgroundColor: theme.palette.primary[600],
          }}
        >
          <Tab label="About" sx={{ fontSize: 20 }} />
          <Tab label="Chart" sx={{ fontSize: 20 }} />
          <Tab label="Exchanges" sx={{ fontSize: 20 }} />
          <Tab label="News" sx={{ fontSize: 20 }} />
        </Tabs>

        <Box
          ref={scrollableContainerRef}
          sx={{
            height: "90vh",
            width: "100%",
            overflowY: "auto",
            padding: 2,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Render the About */}
          <Box ref={aboutRef} marginBottom={5} sx={{ width: "94%" }}>
            {data ? (
              <CryptoAbout data={data.cryptoInfoData.data} />
            ) : (
              <CircularProgress />
            )}
            {/* <CryptoAbout /> */}
          </Box>
          {/* Render the chart */}
          <Box
            ref={chartRef}
            marginBottom={5}
            sx={{ width: "98%", height: 800 }}
          >
            {data ? <CryptoGraph dataInfo={data} /> : <CircularProgress />}
            {/* <CryptoGraph /> */}
          </Box>
          {/* Render the exchanges */}
          <Box
            ref={exchangesRef}
            sx={{ width: "98%", height: 650 }}
            marginBottom={5}
          >
            {data ? (
              <ExchangeDetails data={data.cryptoInfoData.data.tickers} />
            ) : (
              <CircularProgress />
            )}
          </Box>
          <Box
            ref={newsRef}
            marginBottom={2}
            sx={{
              width: "98%",
              mb: 10,
            }}
          >
            {/* Render the news */}
            {data ? (
              <CryptoNews data={data.cryptoNewsData.data.articles} />
            ) : (
              <CircularProgress />
            )}
            {/* <CryptoNews /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CryptoDetails;
