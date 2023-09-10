import React, { useState, useEffect, useMemo } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import { ListItemIcon } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Person2Icon from "@mui/icons-material/Person2";
import {
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Menu,
  Typography,
  Box,
  AppBar,
  InputBase,
  Popper,
  useTheme,
  Drawer,
  Hidden,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import FlexBetween from "./FlexBetween";
import MarketDetails from "./MarketDetails";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setMode } from "../state";
import { useNavigate } from "react-router-dom";
import { useGetSearchDataQuery } from "../state/api";

const pages = ["Home", "Exchanges", "News", "Sentiment"];

const HeaderBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch } = useGetSearchDataQuery(searchTerm);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const user = JSON.parse(useSelector((state) => state.global.user));
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchBlur = () => {
    // You can set a delay here if you want the user to have a moment before the popper disappears
    setTimeout(() => setAnchorEl(null), 1000);
  };

  const handleSearchFocus = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResultClick = (cryptoName) => {
    console.log(
      "🚀 ~ file: HeaderBar.jsx:69 ~ return ~ cryptoName:",
      cryptoName
    );
    navigate(`/details/${cryptoName}`);
    setSearchTerm("");
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      sx={{
        position: "sticky",
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <MarketDetails />
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <AdbIcon
            fontSize="large"
            sx={{ display: { xs: "none", sm: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h3"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "none", md: "flex" },
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
              {/* Mobile navigation */}
              <Hidden mdUp implementation="css">
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              {/* Desktop navigation */}

              <Hidden xsDown implementation="css">
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
              </Hidden>

              {/* Search and its related components */}
              <Box sx={{ display: "flex", ml: "auto" }}>
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

                {/* <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                      <DarkModeOutlined sx={{ fontSize: "25px" }} />
                    ) : (
                      <LightModeOutlined sx={{ fontSize: "25px" }} />
                    )}
                  </IconButton> */}

                <FlexBetween
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="9px"
                  gap="3rem"
                  p="0.1rem 1.5rem"
                  sx={{ ml: 2 }}
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
                          onClick={() => {
                            console.log("Button clicked");
                            handleResultClick(crypto.id);
                          }}
                          key={crypto._id}
                          p={1}
                          sx={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
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

              {/* Mobile drawer */}
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { sm: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    width: 250,
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                <Box sx={{ width: 250 }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={() => {
                        handleCloseNavMenu(page);
                        handleDrawerToggle(); // Close the drawer
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
              </Drawer>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default HeaderBar;
