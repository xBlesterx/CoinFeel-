import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { useGetExchangeDataQuery } from "../../state/api";

import Header from "../../components/Header";
import Ticker from "../../components/Ticker";

const Exchanges = () => {
  const theme = useTheme();
  const { data, isloading } = useGetExchangeDataQuery();

  return (
    <Box>
      <Ticker />
      <Box m="1.5rem 2.5rem">
        <Header
          title="Exchanges"
          subtitle="List of all the Exchanges in the market"
        />
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {data?.data.map((exchange) => (
            <Grid item xs={12} sm md={4} key={exchange.id}>
              <Card sx={{ borderRadius: 5, boxShadow: 8 }}>
                <Box
                  display="flex"
                  sx={{
                    alignItems: "center",
                    p: 2,
                    backgroundColor: theme.palette.primary.dark,
                  }}
                >
                  <Box
                    component="img"
                    alt={exchange.name}
                    src={exchange.image}
                    title={exchange.name}
                    sx={{ height: 200, width: 200, borderRadius: 5 }}
                  />
                  <CardContent>
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{
                        color: theme.palette.secondary[400],
                        fontFamily: "monospace",
                      }}
                    >
                      {exchange.name}
                    </Typography>
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      sx={{ mt: 1, fontFamily: "monospace" }}
                    >
                      Established: {exchange.year_established}
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
                      Volume: ${" "}
                      {Number(exchange.trade_volume_24h_btc).toLocaleString()}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      sx={{ mt: 1, fontFamily: "monospace" }}
                    >
                      Country: {exchange.country}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="textSecondary"
                      sx={{ mt: 1, fontFamily: "monospace" }}
                    >
                      Trust Score: {exchange.trust_score}
                    </Typography>
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      onClick={() => window.open(exchange.url, "_blank")}
                      sx={{ mt: 1, width: 140, position: "static" }}
                    >
                      Visit
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Exchanges;
