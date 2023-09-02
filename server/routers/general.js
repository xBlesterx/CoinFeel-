import express from "express";
import {
  getMarcketData,
  getNews,
  getSentiment,
} from "../controllers/general.js";

const router = express.Router();

router.get("/home", getMarcketData);

router.get("/news", getNews);
router.get("/sentiment", getSentiment);

export default router;
