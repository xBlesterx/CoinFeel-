import React, { useState } from "react";
import { usePostSignupUserMutation } from "../../state/api";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Paper,
  Grid,
  Alert,
  AlertTitle,
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [signupUser] = usePostSignupUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupUser({
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        setAlertType("success");
        setAlertMessage("You have successfully logged in!");
        setShowAlert(true);
        // Display a success message to the user using a toast/notification or any other method.

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setAlertType("error");
        setAlertMessage("Something went wrong!");
        setShowAlert(true);
        // Handle error. Show the user what went wrong.
      }
      // Handle the response, for example, navigate to login page or dashboard
    } catch (error) {
      // Handle the error, for example, show an error message to the user
      console.log(error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {showAlert && (
        <Alert severity={alertType}>
          <AlertTitle>
            {alertType === "success" ? "Success" : "Error"}
          </AlertTitle>
          {alertMessage}
        </Alert>
      )}
      <Paper elevation={3} style={{ padding: "2rem", marginTop: "2rem" }}>
        <Typography component="h1" variant="h5" align="center">
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                required
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
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
                Signup
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={() => navigate("/login")}
                sx={{ mt: 2 }}
              >
                LogIn
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Signup;
