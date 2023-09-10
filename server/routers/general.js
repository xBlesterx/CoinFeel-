import express from "express";
import { getMarcketData, getSentiment } from "../controllers/general.js";

const router = express.Router();

router.get("/home", getMarcketData);

router.get("/sentiment", getSentiment);

export default router;
