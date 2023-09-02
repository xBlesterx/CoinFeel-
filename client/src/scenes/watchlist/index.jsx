import React from "react";
import {
  useGetCryptoByWatchlistQuery,
  useGetMarketDataQuery,
  useGetWatchListQuery,
} from "../../state/api";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";

import Header from "../../components/Header";

import { DataGrid } from "@mui/x-data-grid";
import {
  Name,
  PriceChange,
  ValueToFixed,
  Volume_Info,
} from "../../components/DataGridRowRender";
import { useNavigate } from "react-router-dom";
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
    renderCell: (params) => <ValueToFixed value={params.value} />,
  },
];

const Watchlist = () => {
  const navigate = useNavigate();
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

  const { data, isLoading } = useGetCryptoByWatchlistQuery();

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
        circulating_supply: coin.circulating_supply,
      }))
    : {};

  console.log(data);
  return (
    <Grid container p={5}>
      <Grid item xs={12}>
        {data ? (
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <Header
              title={`Today's Cryptocurrency Prices For your watchlist`}
            />
          </Box>
        ) : (
          <CircularProgress />
        )}
      </Grid>

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
                backgroundColor: "#272727",
                border: "0px",
              },
            }}
            rows={rows || []}
            columns={columns}
            getRowId={(row) => row.id}
            onRowClick={(row) => {
              navigate(`/details/${row.row.combinedInfo.key}`);
            }}
            rowBuffer={50}
          />
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Grid>
  );
};

export default Watchlist;
