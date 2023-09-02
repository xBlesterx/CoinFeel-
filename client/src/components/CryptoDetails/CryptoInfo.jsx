import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  useGetCryptoDetailsQuery,
  useGetSentimentQuery,
  useGetWatchListQuery,
  usePostWatchListMutation,
} from "../../state/api";
import { useParams } from "react-router-dom";
import { cryptoDetails as dummy } from "../../dummyData";
import { ResponsiveLine } from "@nivo/line";
import { nivoData } from "../../dummyData";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LanguageIcon from "@mui/icons-material/Language";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  Divider,
  Tab,
  Tabs,
  CircularProgress,
  LinearProgress,
  linearProgressClasses,
  Button,
  Rating,
} from "@mui/material";
import Header from "../Header";
import { GitHub, Reddit, Star } from "@mui/icons-material";
import DropMenuOption from "./DropMenuOption";

function formatDate(dateString) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

const backColor = (score) => {
  if (score >= 0 && score < 0.4) {
    return "#FF471A";
  } else if (score >= 0.4 && score < 1) {
    return "#FF8833";
  } else if (score >= 1 && score < 1.2) {
    return "#FFCC66";
  } else if (score >= 1.2 && score < 1.6) {
    return "#99CC66";
  } else if (score >= 1.6 && score <= 2) {
    return "#33CC33";
  }

  return "#000000";
};

const priceChangePersintage = (currentPrice, priceChange) => {
  const newPrice = (currentPrice + priceChange) / currentPrice;
  return newPrice - 1;
};

const formatPriceTick = (value) => {
  if (value <= 0.1) return value.toFixed(6);
  if (value >= 1) return value.toFixed(2);
  return value.toFixed(3); // for values less than 1, display 5 decimal places
};

const CryptoInfo = ({ data }) => {
  // const data = dummy.cryptoInfoData.data;
  const { data: sentiment, isLoading } = useGetSentimentQuery();
  const [isWatchList, setIsWatchList] = useState(false);
  const [watchListRequest] = usePostWatchListMutation();
  const response = useGetWatchListQuery();
  const handleAddToWatchList = async (cryptoId) => {
    try {
      const res = await watchListRequest({
        cryptoId,
      });

      if (res.data.success) setIsWatchList(true);
      else setIsWatchList(false);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUserCurrencies = async () => {
      try {
        response.data.currencies.forEach((element) => {
          if (element == data.id) {
            setIsWatchList(true);
          }
        });
      } catch (error) {}
    };
    fetchUserCurrencies();
  }, [response]);

  const theme = useTheme();
  return (
    <Box sx={{ mt: 3, ml: 2, height: "100vh" }}>
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        sx={{ justifyContent: "space-between" }}
      >
        <Box display="flex" alignItems="center">
          <Box
            component="img"
            src={data.image.large}
            alt={data.name}
            sx={{ height: 55, width: 55, borderRadius: 10, mr: 2 }}
          />
          <Header title={data.name} subtitle={data.symbol.toUpperCase()} />
        </Box>
        {!isWatchList ? (
          <Button
            onClick={() => handleAddToWatchList(data.id)}
            sx={{ borderRadius: 20 }}
          >
            <StarOutlineOutlinedIcon
              sx={{ fontSize: 35, color: theme.palette.secondary[600] }}
            />
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToWatchList(data.id)}
            sx={{ borderRadius: 20 }}
          >
            <Star sx={{ fontSize: 35, color: theme.palette.secondary[600] }} />
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "self-end",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: 53,
            fontWeight: "bold",
          }}
        >
          $
          {data.market_data.current_price.usd > 1
            ? Number(data.market_data.current_price.usd).toLocaleString()
            : formatPriceTick(data.market_data.current_price.usd)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {data.market_data.price_change_24h > 0 ? (
            <ArrowDropUpIcon sx={{ fontSize: 35, color: "#16c784" }} />
          ) : (
            <ArrowDropDownIcon sx={{ fontSize: 35, color: "#ea3936" }} />
          )}
          <Typography
            sx={{
              color:
                data.market_data.price_change_24h > 0 ? "#16c784" : "#ea3943",
              fontSize: 12,
              fontWeight: "bold",
              mr: 1,
            }}
          >
            {data.market_data.price_change_24h.toFixed(2)}
            {"% (24h)"}
          </Typography>
        </Box>
      </Box>
      <Box
        padding={1}
        sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "monospace",
              fontSize: 20,
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            Rating
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: "bold",
                mr: 1,
              }}
            >
              {((data.coingecko_score / 100) * 5).toFixed(2)}
            </Typography>
            <Rating
              name="read-only"
              value={(data.coingecko_score / 100) * 5}
              readOnly
            />
          </Box>
        </Box>
        <Box>
          {sentiment?.map((items) => {
            if (items["Crypto"] === data.symbol.toUpperCase())
              return (
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      color: theme.palette.secondary[400],
                      fontFamily: "monospace",
                      fontSize: 20,
                      fontWeight: "bold",
                      mb: 0.5,
                    }}
                  >
                    Sentiment
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      backgroundColor: backColor(items.score),
                      m: 1,
                      p: 1,
                      borderRadius: 5,
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    {items.sentiment} / {Number(items.score).toFixed(2)}
                  </Typography>
                </Box>
              );
          })}
        </Box>
      </Box>
      <Box padding={1} sx={{ mt: 1 }}>
        {/* ... Add more crypto details as required */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Market Cap
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {data.market_data.market_cap_change_percentage_24h > 0 ? (
                <ArrowDropUpIcon sx={{ fontSize: 35, color: "#16c784" }} />
              ) : (
                <ArrowDropDownIcon sx={{ fontSize: 35, color: "#ea3936" }} />
              )}
              <Typography
                sx={{
                  color:
                    data.market_data.market_cap_change_percentage_24h > 0
                      ? "#16c784"
                      : "#ea3943",
                  fontSize: 12,
                  fontWeight: "bold",
                  mr: 1,
                }}
              >
                {data.market_data.market_cap_change_percentage_24h.toFixed(2)}%
              </Typography>
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                $ {Number(data.market_data.market_cap.usd).toLocaleString()}
              </Typography>
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={data.liquidity_score}
            sx={{
              height: 2,
              borderRadius: 5,
              width: "100%",
              [`&.${linearProgressClasses.colorPrimary}`]: {
                backgroundColor:
                  theme.palette.grey[
                    theme.palette.mode === "light" ? 200 : 800
                  ],
              },
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 5,
                backgroundColor: theme.palette.secondary[600],
              },
            }}
          />
        </Box>
        <Box>
          {/*Volume (24)*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Volume (24h)
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                $ {Number(data.market_data.total_volume.usd).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          {/*Volume/Market cap (24)*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Volume/Market cap (24)
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {Number(
                  (data.market_data.total_volume.usd /
                    data.market_data.market_cap.usd) *
                    100
                )
                  .toFixed(1)
                  .toLocaleString()}
                %
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          {/*Total value locked (TVL)*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Total value locked (TVL)
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                {data.market_data.total_value_locked
                  ? `$${data.market_data.total_value_locked}`
                  : "undifined"}
              </Typography>
            </Box>
          </Box>
          <Box>
            {/*Market cap / TVL */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Market cap / TVL
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {(
                    data.market_data.market_cap /
                    data.market_data.total_value_locked
                  ).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            {/*Circulating supply */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Circulating supply
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {Number(
                    formatPriceTick(data.market_data.circulating_supply)
                  ).toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  {data.symbol.toUpperCase()}
                </Typography>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={
                (data.market_data.circulating_supply /
                  data.market_data.total_supply) *
                100
              }
              sx={{
                height: 2,
                borderRadius: 5,
                width: "100%",
                [`&.${linearProgressClasses.colorPrimary}`]: {
                  backgroundColor:
                    theme.palette.grey[
                      theme.palette.mode === "light" ? 200 : 800
                    ],
                },
                [`& .${linearProgressClasses.bar}`]: {
                  borderRadius: 5,
                  backgroundColor: theme.palette.secondary[600],
                },
              }}
            />
          </Box>
          <Box>
            {/*Total supply */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Total supply
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {Number(data.market_data.total_supply).toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  {data.symbol.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            {/*Max Supply*/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Max supply
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {Number(data.market_data.max_supply).toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  {data.symbol.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            {/*Fully diluted market cap */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {`Fully diluted \n market cap`}
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  $
                  {data.market_data.fully_diluted_valuation.usd
                    ? Number(
                        data.market_data.fully_diluted_valuation.usd
                      ).toLocaleString()
                    : Number(
                        data.market_data.fully_diluted_valuation
                      ).toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  {data.symbol.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            {/*Official links*/}
            <Box
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Official links
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <a
                  href={data.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    sx={{
                      fontSize: 15,
                      fontWeight: "bold",
                      ontFamily: "monospace",
                      color: "#000000",
                      backgroundColor: theme.palette.secondary[500],
                      borderRadius: 10,
                      "&:hover": {
                        backgroundColor: theme.palette.secondary[100],
                      },
                      m: 1,
                    }}
                  >
                    <LanguageIcon sx={{ mr: 1 }} />
                    Website
                  </Button>
                </a>
                <a
                  href={data.links.repos_url.github[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    sx={{
                      fontSize: 15,
                      fontWeight: "bold",
                      ontFamily: "monospace",
                      color: "#000000",
                      backgroundColor: theme.palette.secondary[500],
                      borderRadius: 10,
                      "&:hover": {
                        backgroundColor: theme.palette.secondary[100],
                      },
                      m: 1,
                    }}
                  >
                    <GitHub sx={{ mr: 1 }} />
                    github
                  </Button>
                </a>
              </Box>
            </Box>
          </Box>
          <Box>
            {/*Official links*/}
            <Box
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Official links
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <a
                  href={data.links.subreddit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    sx={{
                      fontSize: 15,
                      fontWeight: "bold",
                      ontFamily: "monospace",
                      color: "#000000",
                      backgroundColor: theme.palette.secondary[500],
                      borderRadius: 10,
                      "&:hover": {
                        backgroundColor: theme.palette.secondary[100],
                      },
                      m: 1,
                    }}
                  >
                    <Reddit sx={{ mr: 1 }} />
                    Reddit
                  </Button>
                </a>
              </Box>
            </Box>
          </Box>
          <Box>
            {/*Price performance*/}
            <Typography
              sx={{
                fontFamily: "monospace",
                fontSize: 20,
                fontWeight: "bold",
                mt: 4,
              }}
            >
              Price performance
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "monospace",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Price (24)
              </Typography>
              <Box
                sx={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                {data.market_data.price_change_24h > 0 ? (
                  <ArrowDropUpIcon sx={{ fontSize: 35, color: "#16c784" }} />
                ) : (
                  <ArrowDropDownIcon sx={{ fontSize: 35, color: "#ea3936" }} />
                )}
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                    color:
                      data.market_data.price_change_24h_in_currency.usd > 0
                        ? "#16c784"
                        : "#ea3943",
                    mr: 1,
                  }}
                >
                  {priceChangePersintage(
                    data.market_data.current_price.usd,
                    data.market_data.price_change_24h_in_currency.usd
                  ).toFixed(4) * 100}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  $
                  {Number(
                    formatPriceTick(
                      data.market_data.current_price.usd +
                        data.market_data.price_change_24h_in_currency.usd
                    )
                  ).toLocaleString()}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Price All-time high
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "",
                  }}
                >
                  ({formatDate(data.market_data.ath_date.usd)})
                </Typography>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  $
                  {Number(
                    formatPriceTick(data.market_data.ath.usd)
                  ).toLocaleString()}
                </Typography>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {data.market_data.ath_change_percentage.usd > 0 ? (
                    <ArrowDropUpIcon sx={{ fontSize: 35, color: "#16c784" }} />
                  ) : (
                    <ArrowDropDownIcon
                      sx={{ fontSize: 35, color: "#ea3936" }}
                    />
                  )}
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: 15,
                      fontWeight: "bold",
                      color:
                        data.market_data.ath_change_percentage.usd > 0
                          ? "#16c784"
                          : "#ea3943",
                      mr: 1,
                      textAlign: "right",
                    }}
                  >
                    {data.market_data.ath_change_percentage.usd.toFixed(2)}%
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Price All-time low
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "",
                  }}
                >
                  ({formatDate(data.market_data.atl_date.usd)})
                </Typography>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  $
                  {Number(
                    formatPriceTick(data.market_data.atl.usd)
                  ).toLocaleString()}
                </Typography>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  {data.market_data.atl_change_percentage.usd > 0 ? (
                    <ArrowDropUpIcon sx={{ fontSize: 35, color: "#16c784" }} />
                  ) : (
                    <ArrowDropDownIcon
                      sx={{ fontSize: 35, color: "#ea3936" }}
                    />
                  )}
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: 15,
                      fontWeight: "bold",
                      color:
                        data.market_data.atl_change_percentage.usd > 0
                          ? "#16c784"
                          : "#ea3943",
                      mr: 1,
                      textAlign: "right",
                    }}
                  >
                    {data.market_data.atl_change_percentage.usd.toFixed(2)}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CryptoInfo;
