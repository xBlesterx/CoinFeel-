import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  AlertTitle,
  Box,
} from "@mui/material";
import { usePostloginUserMutation } from "../../state/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../state";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = usePostloginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email,
        password,
      });
      if (response.data.success) {
        setAlertType("success");
        setAlertMessage("You have successfully logged in!");
        setShowAlert(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        const user = localStorage.getItem("user");
        dispatch(setUser(user));
        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } // Again, just for simplicity. Use a better approach in a real app.
      // Handle the response, for example, navigate to login page or dashboard
    } catch (error) {
      // Handle the error, for example, show an error message to the user
      setAlertType("error");
      setAlertMessage("Your email or password was wrong, Please try again!!");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  return (
    <Box>
      {showAlert && (
        <Alert severity={alertType}>
          <AlertTitle>
            {alertType === "success" ? "Success" : "Error"}
          </AlertTitle>
          {alertMessage}
        </Alert>
      )}
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
          <Typography component="h1" variant="h5" align="center">
            Log In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("/signup")}
                  sx={{ mt: 2 }}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
