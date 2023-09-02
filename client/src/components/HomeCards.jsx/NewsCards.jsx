import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import "./NewsCard.css"; // Importing styles
import { useNavigate } from "react-router-dom";

function NewsCard({ newsData, logo, title }) {
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % newsData.length); // Cycle through the news items
    }, 9000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [newsData]);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const currentNews = newsData[currentItemIndex];
  const theme = useTheme();

  const stockImageUrl =
    "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"; // Replace with your local image path

  //const [imageUrl, setImageUrl] = useState(currentNews.urlToImage);
  //
  //setImageUrl(currentNews.urlToImage);
  //
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
      {/* Use the currentItemIndex as a key to force remount */}

      <Box sx={{ display: "flex", mt: 3, mx: 3, alignItems: "center" }}>
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
      <CardContent
        key={currentItemIndex}
        className="newsItem"
        width="100%"
        height="100%"
        sx={{
          justifyContent: "center",
          m: 1,
        }}
      >
        <Box
          component="img"
          sx={{
            height: 200,
            width: 600,
            borderRadius: 5,
          }}
          src={currentNews.urlToImage}
          alt={currentNews.title}
          onError={(e) => (e.target.src = stockImageUrl)}
        />
        <Typography
          variant="h2"
          component="div"
          sx={{
            fontSize: 20,
            color: theme.palette.secondary[200],
            marginRight: "1rem",
            mt: 2,
          }}
        >
          {currentNews.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mt: 1,
            color: theme.palette.secondary[100],
            marginRight: "1rem",
          }}
        >
          {currentNews.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
