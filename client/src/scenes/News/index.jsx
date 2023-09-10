import React from "react";
import { useGetNewsDataQuery } from "../../state/api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
  CircularProgress,
} from "@mui/material";

import Header from "../../components/Header";
import Ticker from "../../components/Ticker";

const backColor = (text) => {
  if (text === "Negative") {
    return "#FF8833";
  } else if (text === "Neutral") {
    return "#FFCC66";
  } else if (text === "Positive") {
    return "#99CC66";
  } else return "#000000";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
};

const News = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetNewsDataQuery();
  console.log(data);

  return (
    <Box>
      <Ticker />
      <Box m="1.5rem 2.5rem">
        <Header title="News" subtitle="Latest news in the last 24 hours" />
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {data && !isLoading ? (
            data.articles.map((news, index) => (
              <Grid item xs={12} sm md={6} key={index}>
                <Card
                  sx={{
                    borderRadius: 5,
                    boxShadow: 8,
                    backgroundColor: theme.palette.primary.dark,
                    border: "none",
                  }}
                >
                  <Box display="flex" sx={{ alignItems: "center", p: 2 }}>
                    <CardContent>
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{
                          color: theme.palette.secondary[400],
                          fontFamily: "monospace",
                          mb: 1,
                        }}
                      >
                        {news.title}{" "}
                        <Typography
                          variant="h5"
                          sx={{
                            fontFamily: "monospace",
                            backgroundColor: backColor(news.sentiment),
                            mt: 1,
                            p: 1.5,
                            borderRadius: 5,
                            color: "black",
                            fontWeight: "bold",
                            width: 100,
                            textAlign: "center",
                          }}
                        >
                          {news.sentiment}
                        </Typography>
                      </Typography>
                      <Box display="flex" sx={{ alignItems: "center" }}>
                        <Box>
                          <Typography
                            variant="h4"
                            color="textSecondary"
                            sx={{
                              mt: 1,
                              fontFamily: "monospace",
                              textAlign: "justify",
                            }}
                          >
                            Description: {news.description}
                          </Typography>
                          <Typography
                            variant="h5"
                            color="textSecondary"
                            sx={{
                              mt: 1,
                              fontFamily: "monospace",
                              color: theme.palette.secondary[400],
                            }}
                          >
                            Source: {news.source.name}
                          </Typography>
                          <Typography
                            variant="h5"
                            color="textSecondary"
                            sx={{
                              mt: 1,
                              fontFamily: "monospace",
                              color: theme.palette.secondary[400],
                            }}
                          >
                            Publiched: {formatDate(news.publishedAt)}
                          </Typography>
                        </Box>
                        <Box
                          component="img"
                          alt={news.author}
                          src={news.urlToImage}
                          title={news.author}
                          sx={{
                            height: 200,
                            width: 200,
                            borderRadius: 5,
                            ml: 2,
                          }}
                          onError={(e) =>
                            (e.target.src =
                              "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
                          }
                          loading="lazy"
                        />
                      </Box>
                      <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        onClick={() => window.open(news.url, "_blank")}
                        sx={{ mt: 1, width: 140, position: "static" }}
                      >
                        Visit
                      </Button>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <CircularProgress />
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default News;
