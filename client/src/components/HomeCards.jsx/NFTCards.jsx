import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import "./NewsCard.css"; // Importing styles
import ReactSpeedometer from "react-d3-speedometer";

const NFTCards = ({ sentiment, logo, title }) => {
  const theme = useTheme();

  const newsSentiment = sentiment.find((item) => item.Crypto === "topNews");

  console.log(
    "🚀 ~ file: NFTCards.jsx:14 ~ NFTCards ~ newsSentiment:",
    newsSentiment
  );

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
        className="newsItem"
        width="100%"
        height="100%"
        sx={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          m: 1,
        }}
      >
        <ReactSpeedometer
          maxValue={2}
          value={Number(newsSentiment.score).toFixed(2)}
          customSegmentStops={[0, 0.4, 0.8, 1.2, 1.6, 2]}
          startColor={"#FF471A"}
          segmentColors={[
            "#FF471A",
            "#FF8833",
            "#FFCC66",
            "#99CC66",
            "#33CC33",
          ]} // Gradient Colors: Red, Orange-Red, Yellow, Yellow-Green, Green
          textColor={theme.palette.secondary[400]}
          width={600} // Slightly lighter than black for a softer look
          ringWidth={30}
          needleHeightRatio={0.7} // Adjust needle length
          fontSize={"16px"} // Adjust font size
          customSegmentLabels={[
            {
              position: "OUTSIDE",
              color: "#FF471A",
              text: "Very Negative",
            },
            {
              position: "OUTSIDE",
              color: "#FF8833",
              text: "Negative",
            },
            {
              position: "OUTSIDE",
              color: "#FFCC66",
              text: "Neutral",
            },
            {
              position: "OUTSIDE",
              color: "#99CC66",
              text: "Positive",
            },
            {
              position: "OUTSIDE",
              color: "#33CC33",
              text: "Very Positive",
            },
          ]}
        />
        <Typography
          sx={{
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "20px",
            color: theme.palette.secondary[300],
          }}
        >{`Sentiment: ${newsSentiment.sentiment} / ${Number(
          newsSentiment.score
        ).toFixed(2)}`}</Typography>
      </CardContent>
    </Card>
  );
};

export default NFTCards;
