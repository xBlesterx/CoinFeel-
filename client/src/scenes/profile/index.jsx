import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePutUpdateUserMutation } from "../../state/api";
import { logoutUser } from "../../state";

const Profile = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(useSelector((state) => state.global.user));
  const [avatar, setAvatar] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fileInputRef = useRef(null);
  const [updateUser] = usePutUpdateUserMutation();
  useEffect(() => {
    setAvatar(user.profilePic);
  }, []);

  const handleSubmet = async () => {
    const response = await updateUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profilePic: avatar,
    });
    if (response.data.success) {
      localStorage.removeItem("user");
      dispatch(logoutUser());
      window.location.href = "/home";
    } else {
      alert("error");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        reader.result.replace("data:", "").replace(/^.+,/, "");
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="2rem"
      sx={{
        overflow: "hidden",
      }}
    >
      <Box
        width={["95%", "85%", "65%", "45%"]} // responsive width
        padding="2rem"
        borderRadius="12px"
        boxShadow="0 0 15px rgba(0, 0, 0, 0.08)"
        sx={{
          background: "linear-gradient(45deg, #665429 30%, #ffda85 90%)",
        }}
      >
        <Typography variant="h5" textAlign="center" marginBottom="1.5rem">
          Edit Profile
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginBottom="1.5rem"
        >
          <Avatar
            src={avatar}
            alt="Profile Picture"
            sx={{ width: 100, height: 100 }}
          />
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>

        <TextField
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Change this to your desired color
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.2rem", // Font size for the label
              color: "white",
            },
          }}
          fullWidth
          variant="outlined"
          label="First Name"
          margin="normal"
          required
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Change this to your desired color
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.2rem", // Font size for the label
              color: "white",
            },
          }}
          fullWidth
          variant="outlined"
          label="Last Name"
          margin="normal"
          required
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <TextField
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Change this to your desired color
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.2rem", // Font size for the label
              color: "white",
            },
          }}
          fullWidth
          variant="outlined"
          label="Email"
          margin="normal"
          required
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Change this to your desired color
            },
            "& .MuiInputLabel-root": {
              fontSize: "1.2rem", // Font size for the label
              color: "white",
            },
          }}
          fullWidth
          variant="outlined"
          label="Password"
          margin="normal"
          required
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Box display="flex" justifyContent="center" marginTop="1.5rem">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fontSize="2rem"
            onClick={() => handleSubmet()}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
