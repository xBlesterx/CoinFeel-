import express from "express";
import { getNews, getMakretSentiment } from "../controllers/sentiment.js";

const router = express.Router();

router.get("/news", getNews);
router.get("/marketsentiment", getMakretSentiment);

export default router;
