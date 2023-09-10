import React, { useState } from "react";
import Header from "../Header";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  Button,
} from "@mui/material";

const CryptoNews = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleImgError = (e) =>
    (e.target.src =
      "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"); // Replace with your local image path"

  const theme = useTheme();
  //const data = dummy.cryptoNewsData.data.articles;
  return (
    <Box sx={{ height: "100%" }}>
      <Header title="News" />
      {/* News Section */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {data.slice(0, visibleCount).map((news) => (
          <Card
            sx={{
              p: 3,
              mt: 3,
              backgroundColor: theme.palette.primary.dark,
              borderRadius: 5,
              boxShadow: 10,
            }}
          >
            <CardActionArea
              disableRipple
              onClick={() => window.open(news.url, "_blank")}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <CardContent sx={{}}>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="div"
                    sx={{
                      width: "80%",
                      color: theme.palette.secondary[400],

                      fontFamily: "monospace",
                    }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="textSecondary"
                    component="p"
                    sx={{ width: "90%", mt: 2, fontFamily: "monospace" }}
                  >
                    {news.description}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    sx={{
                      mt: 1,
                      fontFamily: "monospace",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        mr: 1,
                        color: theme.palette.secondary[400],
                      }}
                      variant="h4"
                    >
                      Source:
                    </Typography>{" "}
                    {news.source.name}
                  </Typography>
                </CardContent>
                <Box
                  component="img"
                  src={news.urlToImage}
                  alt={news.author}
                  sx={{ height: 200, width: 270, borderRadius: 5 }}
                  loading="lazy"
                  onError={(e) => handleImgError(e)}
                />
              </Box>
            </CardActionArea>
          </Card>
        ))}
        {visibleCount < data.length && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setVisibleCount(visibleCount + 10)}
            sx={{
              mt: 2,
              backgroundColor: theme.palette.primary.dark,
              "&:hover": {
                backgroundColor: "#69bfff",
              },
              width: 200,
            }}
          >
            Load More
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CryptoNews;
