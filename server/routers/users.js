import express from "express";
import { body, validationResult } from "express-validator";
import {
  postLogin,
  postSignup,
  getCurrent_User,
  postLogout,
  putUpdate,
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", postLogin);

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  postSignup
);

router.get("/current_user", getCurrent_User);

router.get("/logout", postLogout);
router.put("/update", putUpdate);

export default router;
