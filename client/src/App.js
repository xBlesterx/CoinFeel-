import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Home from "./scenes/home";
import Layout from "./scenes/layout";
import React from "react";
import CryptoDetails from "./scenes/CryptoDetails";
import Exchanges from "./scenes/Exchanges";
import News from "./scenes/News";
import Signup from "./scenes/signup";
import Login from "./scenes/login";
import { setUser } from "./state";
import { useGetCurrentUserQuery } from "./state/api";
import ProtectedRoute from "./ProtectedRoute";
import Watchlist from "./scenes/watchlist";
import Log_out_in_layout from "./scenes/layout/log_out_in";
import Profile from "./scenes/profile";
import LandingPage from "./scenes/landingPage";

const App = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    const onStorageChange = (e) => {
      if (e.key == "user") {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(setUser(user));
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, [dispatch]);

  return (
    <Box
      sx={{
        height: "100vh",
        background: `linear-gradient(50deg, ${theme.palette.primary.dark} 70%, ${theme.palette.primary.main} 90%)`,
      }}
    >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route element={<Log_out_in_layout />}>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<Layout />}>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/details/:id"
                element={
                  <ProtectedRoute>
                    <CryptoDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exchanges"
                element={
                  <ProtectedRoute>
                    <Exchanges />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/news"
                element={
                  <ProtectedRoute>
                    <News />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/main" element={<LandingPage />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
};

export default App;
