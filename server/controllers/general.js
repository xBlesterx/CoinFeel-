import axios from "axios";
import stringify from "json-stringify-safe";
import Sentiment from "../models/Sentiment.js";
import { spawn, exec } from "child_process";

const THIRTY_MINUTES = 30 * 60 * 1000;

let inMemoryCache = {
  data: null,
  timestamp: null,
};

export const getMarcketData = async (req, res) => {
  let currentTime = Date.now();

  if (
    !inMemoryCache.data ||
    currentTime - inMemoryCache.timestamp > THIRTY_MINUTES
  ) {
    try {
      const sentiment = await Sentiment.find();

      const cryptoLatestInfo = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&locale=en"
      );
      const globalInfo = await axios.get(
        "https://api.coingecko.com/api/v3/global"
      );
      const trendInfo = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );

      const topNewsInfo = await axios.get(
        "https://newsapi.org/v2/top-headlines?q=crypto&apikey=a1ba957a74c647a48f43d666485307c1"
      );

      const topNewsInfoData = { ...topNewsInfo };

      delete topNewsInfoData.config; // reference to request
      delete topNewsInfoData.request;

      const cryptoLatestInfoData = { ...cryptoLatestInfo };

      delete cryptoLatestInfoData.config; // reference to request
      delete cryptoLatestInfoData.request;

      const globalInfoData = { ...globalInfo };

      delete globalInfoData.config; // reference to request
      delete globalInfoData.request;

      const trendInfoData = { ...trendInfo };

      delete trendInfoData.config; // reference to request
      delete trendInfoData.request;

      const resData = {
        cryptoLatestInfo: cryptoLatestInfoData,
        globalInfo: globalInfoData,
        trendInfo: trendInfoData,
        topNewsInfo: topNewsInfoData,
        sentiment: sentiment,
      };

      inMemoryCache = {
        data: resData,
        timestamp: currentTime,
      };
      res.status(200).json(resData);
    } catch (error) {
      // If there's an error fetching fresh data, return cached data (if available)
      if (inMemoryCache.data) {
        res.json(inMemoryCache.data);
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  } else {
    res.status(202).json(inMemoryCache.data);
  }
};

export const getSentiment = async (req, res) => {
  try {
    const sentiment = await Sentiment.find();
    res.status(200).json(sentiment);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
