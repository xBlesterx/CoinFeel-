import { Box, Grid, Typography, useTheme, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Header from "../Header";

import copy from "copy-to-clipboard";

const CryptoAbout = ({ data }) => {
  const CopyToClipboardText = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);

    const formatText = (text) => {
      if (text.length <= 10) return text;
      return text.slice(0, 6) + "..." + text.slice(-6);
    };

    const handleCopyClick = () => {
      copy(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // reset after 2 seconds
    };

    return (
      <Tooltip title={isCopied ? "Copied!" : "Click to copy"}>
        <Box
          component="span"
          sx={{ cursor: "pointer", color: theme.palette.secondary[400] }}
          onClick={handleCopyClick}
        >
          {formatText(text)}
        </Box>
      </Tooltip>
    );
  };
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Header title="About" />
      <Box sx={{ height: "100%", mt: 2 }}>
        {/* Description */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: theme.palette.secondary[400],
              fontFamily: "monospace",
            }}
          >
            Description
          </Typography>
          <Typography
            variant="h4"
            color="textSecondary"
            sx={{
              width: "94%",
              mt: 2,
              fontFamily: "monospace",
              textAlign: "justify",
            }}
          >
            {data.description.en}
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Categories */}
          <Grid item md={12}>
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.secondary[400],
                fontFamily: "monospace",
              }}
            >
              Categories
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {data.categories.map((data) => (
                <Typography
                  sx={{
                    fontFamily: "monospace",
                    backgroundColor: theme.palette.primary.dark,
                    m: 1,
                    p: 1.5,
                    borderRadius: 5,
                    color: theme.palette.secondary[400],
                  }}
                >
                  {data}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Coin Contract Address */}
          <Grid item md={12}>
            <Typography
              variant="h3"
              sx={{
                color: theme.palette.secondary[400],
                fontFamily: "monospace",
              }}
            >
              Coin Contract Address
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {Object.entries(data.platforms).map(([key, value]) => (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                    backgroundColor: theme.palette.primary.dark,

                    p: 1.5,
                    borderRadius: 5,
                  }}
                >
                  <Typography sx={{ mr: 1, fontWeight: "bold" }}>
                    {key.toUpperCase()}:
                  </Typography>
                  <CopyToClipboardText text={value} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CryptoAbout;
