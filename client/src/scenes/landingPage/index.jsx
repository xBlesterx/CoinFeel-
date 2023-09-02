import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  useTheme,
  Fade,
  Slide,
  Paper,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import HOME from "./HOME.svg";
import Testimonials from "./Testimonials.svg";
import Frequently_Asked_Questions from "./Frequently_Asked_Questions.svg";
import trused_data from "./trusted_data.svg";
import user_freindly from "./user_freindly.svg";
import real_time_analysis from "./real_time_analysis.svg";

function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Grid container spacing={4} sx={{ height: "93vh" }}>
      <Grid container>
        <Grid item xs={6} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: theme.spacing(2),
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: theme.spacing(4),
              }}
            >
              <AdbIcon
                fontSize="large"
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 2,
                  fontSize: 100,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "monospace",
                  fontSize: 100,
                  fontWeight: "bold",
                  color: theme.palette.secondary[400],
                }}
              >
                CoinFeel
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "monospace",
                color: theme.palette.secondary[400],
                marginBottom: theme.spacing(4),
                width: 700,
                fontSize: 40,
                textAlign: "justify",
              }}
            >
              Dive into the world of cryptocurrencies with sentiment analysis.
              Make informed decisions with CoinFeel.
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: theme.palette.secondary[500],
                    borderColor: theme.palette.secondary[500],
                    "&:hover": {
                      backgroundColor: theme.palette.grey[200],
                      color: "#000",
                    },
                    padding: theme.spacing(1, 3),
                  }}
                  onClick={() => navigate("/login")}
                >
                  <Typography variant="h5" sx={{ mx: 1 }}>
                    Log In
                  </Typography>
                </Button>
              </Box>
              <Box sx={{}}>
                <Button
                  sx={{
                    background: theme.palette.secondary[500],
                    color: theme.palette.grey[1000],
                    "&:hover": {
                      backgroundColor: theme.palette.grey[200],
                      color: "#3c52b2",
                    },
                    padding: theme.spacing(1, 3),
                  }}
                  onClick={() => navigate("/signup")}
                >
                  <Typography variant="h5" sx={{ mx: 1 }}>
                    Sign Up
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={HOME}
              alt={"COINFEEL"}
              style={{ height: "50%", width: "70%" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
          sx={{
            fontFamily: "monospace",
            color: theme.palette.secondary[400],
            marginBottom: theme.spacing(4),
            fontSize: 40,
          }}
        >
          Features
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              "Real-time Analysis": {
                desc: "Get real-time sentiment scores for your favorite cryptocurrencies.",
                img: real_time_analysis,
              },
            },
            {
              "Trusted Data Sources": {
                desc: "We gather data from reputed sources to ensure accurate sentiment analysis.",
                img: trused_data,
              },
            },
            {
              "User-friendly Dashboard": {
                desc: "Navigate with ease and get all the insights you need at a glance.",
                img: user_freindly,
              },
            },
          ].map((feature, index) => {
            const key = Object.keys(feature)[0];
            const value = feature[key];
            return (
              <Grid item xs={12} md={4} key={index}>
                <Fade in timeout={3000 + index * 500}>
                  <Card
                    elevation={5}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.15s",
                      "&:hover": { transform: "scale(1.05)" },
                      mx: 6,
                      backgroundColor: theme.palette.secondary[600],
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      height: "fit-content",
                      boxShadow: 10,
                      padding: theme.spacing(2),
                    }}
                  >
                    <Box
                      component="img"
                      src={value.img}
                      alt="Feature"
                      sx={{
                        width: 250,
                        height: 250,
                        align: "center",
                        marginBottom: theme.spacing(1),
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h2"
                        align="center"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "monospace",
                          marginBottom: theme.spacing(2),
                          color: "black",
                        }}
                      >
                        {key}
                      </Typography>
                      <Typography
                        variant="h3"
                        align="center"
                        sx={{
                          fontFamily: "monospace",
                          marginBottom: theme.spacing(2),
                          color: "black",
                        }}
                      >
                        {value.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          mt: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid xs={6} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: theme.spacing(2),
            }}
          >
            <Typography
              align="center"
              gutterBottom
              variant="h4"
              sx={{
                fontFamily: "monospace",
                color: theme.palette.secondary[400],
                marginBottom: theme.spacing(4),
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Testimonials
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={Testimonials}
                alt={"COINFEEL"}
                style={{ height: "90%", width: "100%" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} md={6}>
          {[
            {
              "Alex L.":
                "CoinFeel's real-time sentiment analysis has been a game-changer for my crypto investments.",
            },
            {
              "Muneef T.":
                "The user-friendly dashboard helps me quickly gauge market sentiment. Love it!",
            },
            {
              "Murisi L.":
                "With CoinFeel, I feel more confident in my crypto decisions. Highly recommended!",
            },
          ].map((testimonial, index) => {
            const key = Object.keys(testimonial)[0];
            const comment = testimonial[key];
            return (
              <Grid item xs={12} md={12} key={index}>
                <Slide direction="up" in timeout={1000 + index * 500}>
                  <Card
                    elevation={5}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mx: 3,
                      my: 5,
                      backgroundColor: theme.palette.secondary[600],
                      alignItems: "center",
                      borderRadius: 5,
                      height: "fit-content",
                      boxShadow: 10,
                      padding: theme.spacing(2),
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h3"
                        align="center"
                        sx={{
                          fontFamily: "monospace",
                          marginBottom: theme.spacing(2),
                          color: "black",
                        }}
                      >
                        "{comment}"
                      </Typography>
                      <Typography variant="h6" align="right" color={"black"}>
                        - {key}
                      </Typography>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          mt: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={6} md={6}>
          {[
            {
              "How do you gather sentiment data?":
                "We use a combination of machine learning algorithms and trusted data sources to analyze market sentiment.",
            },
            {
              "Is CoinFeel free to use?":
                "CoinFeel is completely free. Sign up today to explore our features.",
            },
            {
              "Can I customize the dashboard?":
                "Yes, our dashboard is user-friendly and fully customizable to fit your needs.",
            },
          ].map((faq, index) => {
            const question = Object.keys(faq)[0];
            const answer = faq[question];
            return (
              <Grid item xs={12} md={12} key={index}>
                <Slide direction="right" in timeout={1000 + index * 500}>
                  <Paper
                    elevation={5}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      mx: 6,
                      my: 5,
                      backgroundColor: theme.palette.secondary[600],
                      alignItems: "center",
                      borderRadius: 5,
                      height: "fit-content",
                      boxShadow: 10,
                      padding: theme.spacing(2),
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h2"
                        align="center"
                        sx={{
                          fontFamily: "monospace",
                          marginBottom: theme.spacing(2),
                          color: "black",
                        }}
                      >
                        "{question}"
                      </Typography>
                      <Typography variant="h3" align="center" color={"black"}>
                        {answer}
                      </Typography>
                    </CardContent>
                  </Paper>
                </Slide>
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={6} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              padding: theme.spacing(2),
            }}
          >
            <Typography
              align="center"
              gutterBottom
              variant="h4"
              sx={{
                fontFamily: "monospace",
                color: theme.palette.secondary[400],
                marginBottom: theme.spacing(4),
                fontSize: 40,
                fontWeight: "bold",
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={Frequently_Asked_Questions}
                alt={"COINFEEL"}
                style={{ height: "90%", width: "100%" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" align="center" gutterBottom>
          Ready to experience the best in crypto sentiment analysis?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: theme.spacing(2),
          }}
        >
          <Button
            sx={{
              background: theme.palette.secondary[500],
              color: theme.palette.grey[1000],
              padding: theme.spacing(1, 4),
              "&:hover": {
                backgroundColor: theme.palette.grey[200],
                color: "#3c52b2",
              },
              width: "200px",
            }}
            size="large"
            onClick={() => navigate("/signup")}
          >
            <Typography variant="h5">Get Started</Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
