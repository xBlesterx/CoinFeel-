import * as React from "react";
import {
  Card,
  Box,
  CardContent,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./NewsCard.css"; // Importing styles

const HomeBoxHighlight = ({ title, logo, coinData }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  return (
    <Card
      className="newsCard"
      sx={{
        width: 650,
        height: 450,
        backgroundColor: "#272727",
        borderRadius: 10,
        boxShadow: 20,
        backgroundColor: theme.palette.primary.dark,
      }}
    >
      <CardContent sx={{ m: 1 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1 }}>{logo}</Box>
          <Typography
            sx={{
              fontSize: 30,
              color: theme.palette.secondary[100],
              ml: 0.8,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflowX: "auto", // in case the content width exceeds the container's width
          }}
        >
          {coinData.slice(0, 4).map((item, index) => (
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                color: theme.palette.secondary[200],
                transition: "background-color 0.2s",
                "&:hover": { backgroundColor: "#F5F5F5", color: "#000000" },
              }}
              onClick={() => navigate(`/details/${item.item.id}`)}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", flex: 1, mt: 0.5 }}
              >
                <Typography
                  sx={{
                    fontSize: 30,
                    width: "10%",
                    mr: 1.5,
                    textAlign: "center",
                  }}
                >
                  {index + 1}.
                </Typography>
                <Box
                  component="img"
                  sx={{
                    height: 40,
                    width: 40,
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                  src={item.item.large}
                  alt={item.item.name}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 25,
                      fontWeight: "bold",
                      flex: 1,
                      marginRight: "1rem",
                    }}
                  >
                    {item.item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 20,
                      width: "15%",
                      textAlign: "center",
                      mr: 2,
                    }}
                  >
                    {item.item.symbol}
                  </Typography>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: 20,
                }}
              >
                Rank {item.item.market_cap_rank}
              </Typography>
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default HomeBoxHighlight;
