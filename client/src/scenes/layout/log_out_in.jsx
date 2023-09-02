import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

const Log_out_in_layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh", // make it full height
        width: "100%",
        background: "linear-gradient(45deg, #4d547d 30%, #141937 90%)", // Example gradient
        overflowY: "hidden",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isNonMobile ? "3rem" : "1rem",
          borderRadius: "8px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(45deg, #665429 30%, #ffda85 90%)", // subtle shadow for depth

          // responsive width
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Log_out_in_layout;
