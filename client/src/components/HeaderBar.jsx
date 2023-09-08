import React, { useState, useEffect, useMemo } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import AddchartIcon from "@mui/icons-material/Addchart";
import { ListItemIcon } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";

import {
  LightModeOutlined,
  DarkModeOutlined,
  SatelliteAlt,
} from "@mui/icons-material";
import {
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  Typography,
  Box,
  AppBar,
  InputBase,
  Popper,
  useTheme,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FlexBetween from "./FlexBetween";
import MarketDetails from "./MarketDetails";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setMode } from "../state";
import { useNavigate } from "react-router-dom";
import { useGetSearchDataQuery, usePostLogoutQuery } from "../state/api";

const pages = ["Home", "Exchanges", "News"];

const HeaderBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch } = useGetSearchDataQuery(searchTerm);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const user = JSON.parse(useSelector((state) => state.global.user));
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchBlur = () => {
    // You can set a delay here if you want the user to have a moment before the popper disappears
    setTimeout(() => setAnchorEl(null), 100);
  };

  const handleSearchFocus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResultClick = useMemo(() => {
    return (cryptoName) => {
      window.location.href = `/details/${cryptoName}`;
      setSearchTerm("");
    };
  });

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    navigate(`/${page.toLowerCase()}`);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
  };

  return (
    <AppBar
      sx={{
        position: "sticky",
        height: "9%",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <MarketDetails />
      <Toolbar>
        <AdbIcon
          fontSize="large"
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        />
        <Typography
          variant="h3"
          noWrap
          component="a"
          href="/home"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: theme.palette.secondary[400],
            textDecoration: "none",
          }}
        >
          COINFEEL
        </Typography>
        {isAuthenticated && (
          <>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu(page);
                  }}
                  sx={{
                    my: 3,
                    mx: 3,
                    fontSize: 15,
                    color: "white",
                    display: "block",
                    "&:hover": {
                      backgroundColor: theme.palette.secondary[600],
                      color: "#000",
                    },
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                sx={{
                  mr: 2,
                  color: "white",
                  alignItems: "center", // Center items horizontally
                  fontSize: 15,
                  display: "flex",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[600],
                  },
                }}
                onClick={() => (window.location.href = "/watchlist")}
              >
                <StarIcon sx={{ mx: 1 }} />
                Watchlist
              </Button>

              <FlexBetween
                backgroundColor={theme.palette.background.alt}
                borderRadius="9px"
                gap="3rem"
                p="0.1rem 1.5rem"
              >
                <InputBase
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                <IconButton>
                  <Search />
                </IconButton>
                <Popper
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  placement="bottom-start"
                  style={{ zIndex: theme.zIndex.drawer }}
                >
                  <Box
                    sx={{
                      backgroundColor: theme.palette.background.alt,
                      width: "100%",
                      overflow: "auto",
                    }}
                  >
                    {data?.slice(0, 4).map((crypto) => (
                      <Button
                        key={crypto._id}
                        p={1}
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => handleResultClick(crypto.id)}
                      >
                        <Box
                          component="img"
                          src={`https://coinicons-api.vercel.app/api/icon/${crypto.symbol}`}
                          alt={crypto.name}
                          sx={{ height: 30, width: 30, mr: 1 }}
                        />
                        <Typography
                          variant="body1"
                          sx={{ mr: 1, fontWeight: "bold" }}
                        >
                          {crypto.name}
                        </Typography>
                        <Typography variant="body1">
                          ({crypto.symbol})
                        </Typography>
                      </Button>
                    ))}
                  </Box>
                </Popper>
              </FlexBetween>

              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
              {user ? (
                <>
                  <Tooltip title="Open Menu">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{
                        p: 0,
                        ml: 2,
                      }}
                    >
                      <Box sx={{}}>
                        <Avatar
                          src={user.profilePic}
                          alt={user.lastName}
                          sx={{ width: 35, height: 35, borderRadius: 20 }}
                        />
                      </Box>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: "45px",
                      // Light gray background for a modern appearance
                      "& .MuiMenuItem-root": {
                        backgroundColor: theme.palette.primary.dark,
                        // Style for each menu item
                        padding: "8px 16px", // Consistent padding
                        "&:hover": {
                          backgroundColor: "#303030", // Subtle hover effect
                        },
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Typography
                      sx={{
                        fontFamily: "monospace",
                        padding: "8px 16px",
                        fontWeight: "bold", // Bold for the user's name
                      }}
                    >
                      Welcome {user.firstName}
                    </Typography>

                    {/* Button for Prfil with an icon */}
                    <MenuItem onClick={() => navigate("/profile")}>
                      <ListItemIcon>
                        <Person2Icon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>

                    {/* Button for Settings with an icon */}
                    <MenuItem>
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>

                    {/* Button for Logout with an icon */}
                    <MenuItem onClick={() => handleLogout()}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      Log Out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box></Box>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default HeaderBar;
