import express from "express";
import {
  getCryptoDetails,
  getExchanges,
  getSearchCrypto,
  getWatchlist,
  postWatchList,
  getCryptoByWatchlist,
} from "../controllers/currencies.js";

const router = express.Router();

router.get("/details/:id", getCryptoDetails);
router.get("/exchanges", getExchanges);
router.get("/search/:query", getSearchCrypto);
router.post("/watchlist", postWatchList);
router.get("/getwatchlist", getWatchlist);
router.get("/cryptobywatchlist", getCryptoByWatchlist);

export default router;
