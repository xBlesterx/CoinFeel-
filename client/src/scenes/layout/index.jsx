import React, { useState, useEffect } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import HeaderBar from "../../components/HeaderBar";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      display={isNonMobile ? "block" : "flex"}
      sx={{
        height: "100vh",
        width: "100%",
        overflowY: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <HeaderBar />

      <Outlet />
    </Box>
  );
};

export default Layout;
