import { Box, Grid, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Header from "../Header";
import ExIcons from "./ExchangeICON";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const columns = [
  {
    field: "id",
    headerName: "#",
  },
  {
    field: "exchange",
    headerName: "Exchange Name",
    flex: 1,
    renderCell: (params) => (
      <Box display="flex" sx={{ alignItems: "center" }}>
        <Box
          component="img"
          src={params.value.img}
          alt={params.value.name}
          sx={{ height: 40, width: 40, borderRadius: 10, mr: 1 }}
        />
        <Typography sx={{ fontFamily: "monospace", fontSize: 17 }}>
          {params.value.name}
        </Typography>
      </Box>
    ),
  },
  {
    field: "pair",
    headerName: "Pairs",
    flex: 1,
    renderCell: (params) => (
      <Typography sx={{ fontFamily: "monospace", fontSize: 17 }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    renderCell: (params) => (
      <Typography sx={{ fontFamily: "monospace", fontSize: 17 }}>
        ${" "}
        {params.value > 0
          ? Number(params.value).toLocaleString()
          : Number(params.value).toFixed(6).toLocaleString()}
      </Typography>
    ),
  },
  {
    field: "bid_ask_spread_percentage",
    headerName: "Spread",
    flex: 1,
    renderCell: (params) => (
      <Typography sx={{ fontFamily: "monospace", fontSize: 17 }}>
        {Number(params.value).toLocaleString()} %
      </Typography>
    ),
  },
  {
    field: "volume",
    headerName: "Volume",
    flex: 1,
    renderCell: (params) => (
      <Typography sx={{ fontFamily: "monospace", fontSize: 17 }}>
        $ {Number(params.value).toLocaleString()}
      </Typography>
    ),
  },
  {
    field: "update",
    headerName: "Latest trade",
    flex: 1,
    renderCell: (params) => formatDate(params.value),
  },
  {
    field: "trust",
    headerName: "Trust",
    flex: 0.5,
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor: params.value,
          borderRadius: 10,
          justifyContent: "center",
        }}
        height={15}
        width={15}
      ></Box>
    ),
  },
];

const ExchangeDetails = ({ data }) => {
  const theme = useTheme();
  //const data = dummy.cryptoInfoData.data.tickers;

  const rows = data
    ? data.slice(0, 10).map((coin, index) => ({
        id: index + 1,
        exchange: {
          name: coin.market.name,
          img: ExIcons[coin.market.identifier],
        },
        pair: `${coin.base}/${coin.target}`,
        price: coin.last,
        bid_ask_spread_percentage: coin.bid_ask_spread_percentage.toFixed(2),
        volume: coin.volume.toFixed(2),
        update: coin.last_traded_at,
        trust: coin.trust_score,
      }))
    : {};

  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <Header title="Market" />
      <DataGrid
        rowSpacingType="margin"
        rowHeight={80}
        sx={{
          borderRadius: 10,
          boxShadow: 10,
          ".MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "&.MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.primary.dark,
            border: "0px",
            borderRadius: 5,
          },

          mt: 2,
        }}
        rows={rows || []}
        columns={columns}
        getRowId={(row) => row.id}
        rowBuffer={50}
        hideFooter
      />
    </Box>
  );
};

export default ExchangeDetails;
