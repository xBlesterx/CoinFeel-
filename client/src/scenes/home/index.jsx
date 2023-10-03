import React from "react";
import { useGetMarketDataQuery } from "../../state/api";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  CircularProgress,
} from "@mui/material";
import Header from "../../components/Header";
import HomeBoxHighlight from "../../components/HomeCards.jsx/HomeBoxHighlight";
import { DataGrid } from "@mui/x-data-grid";
import { Whatshot } from "@mui/icons-material";
import {
  Name,
  PriceChange,
  ValueToFixed,
  Volume_Info,
  ValueToFixedCircule,
} from "../../components/DataGridRowRender";
import { useNavigate } from "react-router-dom";
import NewsCards from "../../components/HomeCards.jsx/NewsCards";
import NFTCards from "../../components/HomeCards.jsx/NFTCards";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const columns = [
  {
    field: "id",
    headerName: "#",
  },
  {
    field: "combinedInfo",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => (
      <Name
        name={params.value.name}
        symbol={params.value.symbol}
        image={params.value.image}
      />
    ),
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    renderCell: (params) => <ValueToFixed value={params.value} />,
  },
  {
    field: "price_change_percentage_24h",
    headerName: "24h %",
    flex: 1,
    renderCell: (params) => <PriceChange price={params.value} />,
  },
  {
    field: "market_cap_change_percentage_24h",
    headerName: "Market Cap 24h %",
    flex: 1,
    renderCell: (params) => <PriceChange price={params.value} />,
  },
  {
    field: "ath_change_percentage",
    headerName: "ATH %",
    flex: 1,
    renderCell: (params) => <PriceChange price={params.value} />,
  },
  {
    field: "market_cap",
    headerName: "Market Cap",
    flex: 1,
    renderCell: (params) => <ValueToFixed value={params.value} />,
  },
  {
    field: "volume_info",
    headerName: "Volume(24h)",
    flex: 1,
    renderCell: (params) => (
      <Volume_Info
        volume={params.value.volume}
        symbol={params.value.symbol}
        amount={params.value.amount}
      />
    ),
  },
  {
    field: "circulating_supply",
    headerName: "Circulating Supply",
    flex: 1,
    renderCell: (params) => (
      <ValueToFixedCircule
        value={params.value.value}
        symbol={params.value.symbol}
      />
    ),
  },
];
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

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading } = useGetMarketDataQuery();
  console.log("🚀 ~ file: index.jsx:120 ~ data:", data);

  const rows = data
    ? data.cryptoLatestInfo.data.map((coin) => ({
        id: coin.market_cap_rank,
        combinedInfo: {
          key: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.image,
        },
        price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
        ath_change_percentage: coin.ath_change_percentage,
        market_cap: coin.market_cap,
        volume_info: {
          volume: coin.total_volume,
          amount: coin.total_volume / coin.current_price,
          symbol: coin.symbol,
        },
        circulating_supply: {
          value: coin.circulating_supply,
          symbol: coin.symbol,
        },
      }))
    : {};

  return (
    <Grid container p={5}>
      <Grid item xs={12}>
        {data ? (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Header
              title={`Today's Cryptocurrency Prices by Market Cap`}
              subtitle={`The global crypto market cap is $${formatNumber(
                data.globalInfo.data.data.total_market_cap.usd
              )}`}
            />

            <Typography
              sx={{
                ml: -35,
                pr: 1,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                backgroundColor:
                  data.globalInfo.data.data
                    .market_cap_change_percentage_24h_usd > 0
                    ? "#16c784"
                    : "#ea3936",
                height: 25,
                borderRadius: "2rem",
              }}
              variant="h5"
            >
              {data.globalInfo.data.data.market_cap_change_percentage_24h_usd >
              0 ? (
                <ArrowDropUpIcon sx={{ fontSize: 30, mr: -1 }} />
              ) : (
                <ArrowDropDownIcon sx={{ fontSize: 30, mr: -1 }} />
              )}
              {data.globalInfo.data.data.market_cap_change_percentage_24h_usd.toFixed(
                2
              )}
              %
            </Typography>
          </Box>
        ) : (
          <CircularProgress />
        )}
      </Grid>
      {data ? (
        <Grid
          container
          item
          xs={12}
          justifyContent="space-evenly"
          sx={{ mt: "4rem" }}
        >
          <HomeBoxHighlight
            title="Trending Crypto"
            logo=<Whatshot sx={{ fontSize: 40 }} />
            coinData={data.trendInfo.data.coins}
          />
          <NFTCards
            sentiment={data.sentiment}
            logo={<CameraAltIcon sx={{ fontSize: 40 }} />}
            title="Sentiment Metric"
          />
          <NewsCards
            newsData={data.topNewsInfo.data.articles}
            logo={<NewspaperIcon sx={{ fontSize: 40 }} />}
            title="Top News Headlines"
          />
        </Grid>
      ) : (
        <CircularProgress />
      )}

      <Grid item xs={12} m="3.5rem 4.5rem" mt="4rem" width="100%">
        {data ? (
          <DataGrid
            sx={{
              borderRadius: 10,
              boxShadow: 20,
              ".MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                border: "none",

                ".MuiDataGrid-row": {
                  height: 900,
                },
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary.dark,
                border: "0px",
              },
            }}
            rows={rows || []}
            columns={columns}
            getRowId={(row) => row.id}
            onRowClick={(row) => {
              window.location.href = `/details/${row.row.combinedInfo.key}`;
            }}
            rowBuffer={50}
          />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );

  {
    /*<Box m="1.5rem 2.5rem">
      <Header
        title="Today's Cryptocurrency Prices by Market Cap"
        subtitle="The global crypto market cap is $1.17T"
      />
      <Box
        sx={{
          mt: 5,
          flex: "1",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <HomeBoxHighlight
          title="Trending"
          logo=<Whatshot sx={{ fontSize: 35, color: "#ff8327" }} />
        />
        <HomeBoxHighlight
          title="Fear & Greed"
          logo=<Speed sx={{ fontSize: 35, color: "white" }} />
        />
        <HomeBoxHighlight
          title="Top Communities"
          logo=<Star sx={{ fontSize: 35, color: "yellow" }} />
        />
      </Box>
      <Box
        m="2.5rem 3.5rem"
        mt="40px"
        sx={{
          backgroundColor: "transparent",

          "& .MuiDataGrid-root": {
            borderRadius: "1px",
            border: "1px solid rgba(0,0,0,0.1)",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1e1e1e",
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          "& .MuiDataGrid-row": {
            mt: 2.5,
          },
        }}
      >
        {/*DATA GRID*/
  }
  <DataGrid
    sx={{
      boxShadow: "0 2px 10px #aaa",
      border: "none",
      "& .MuiDataGrid-row:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.08)",
      },
      scroll: "hidden",
    }}
    rows={rows || []}
    columns={columns}
    getRowId={(row) => row.id}
    onRowClick={(row) => {
      navigate(`/details/${row.row.combinedInfo.key}`);
    }}
  />;
  {
    /*{data && !isLoading ? (
          <DataGrid
            rows={rows || []}
            columns={columns}
            getRowId={(row) => row.id}
          />
        ) : (
          <HourglassTopOutlinedIcon /> // Or any other loading indicator
        )}
      </Box>
    </Box>
  );*/
  }
};

export default Home;
