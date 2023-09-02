import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateJoined: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg",
    }, // url of profile image
    bio: String,
    settings: {
      theme: String, // light or dark
    },
    currencies: [
      {
        type: String,
      },
    ], // user selected currencies to follow
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
