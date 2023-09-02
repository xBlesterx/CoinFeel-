import User from "../models/Users.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import mongoose from "mongoose";
const { GridFSBucket, ObjectID } = mongoose;

export const postSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "user already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    dateJoined: new Date(),
  });

  await user.save();
  req.session.userId = user._id; // set the user id to the session
  res
    .status(201)
    .json({ success: true, message: "User was registerd successfully" });
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      success: false,
      message: "Your email or password was wrong, Please try again!!",
    });
  } else {
    req.session.userId = user._id;

    let profilePicURL = user.profilePic;
    if (profilePicURL && !profilePicURL.startsWith("http")) {
      // If the profilePic is a GridFS ID, convert it to a URL
      profilePicURL = profilePicURL;
    }

    res.status(201).json({
      success: true,
      message: "You have successfully logged in",
      user: {
        ...user._doc, // Spread the rest of the user's fields
        profilePic: profilePicURL, // Overwrite the profilePic with the new URL
      },
    });
  }
};

export const getCurrent_User = async (req, res) => {
  if (req.session && req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (user) {
      return res.status(200).json({ isAuthenticated: true }); // return necessary user details
    }
  }
  res.status(400).json({ isAuthenticated: false });
};

export const postLogout = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      // If there's an error while destroying the session, return a 500 status
      return res.status(500).json({
        success: false,
        message: "Could not log out. Please try again.",
      });
    }

    // Optionally clear a client-side cookie, if you have set one
    res.clearCookie(); // replace 'yourCookieName' with the name of your cookie, if you're using one

    // Send a success response
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  });
};

export const putUpdate = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let profilePicURL = req.body.profilePic; // Default to what was sent, might be overwritten if a new file is uploaded

  if (req.file) {
    const file = req.file;
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "profilePics",
    });

    const uploadStream = bucket.openUploadStream(file.originalname);
    const fileId = uploadStream.id;

    uploadStream.write(file.buffer);
    uploadStream.end();

    profilePicURL = fileId;
  }

  try {
    const updateInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcrypt.hash(password, 10),
      profilePic: profilePicURL,
    };

    const updateUser = await User.findByIdAndUpdate(
      req.session.userId,
      updateInfo,
      { new: true }
    );
    res.status(200).send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false, message: error });
  }
};
