import axios from "axios";
import Currency from "../models/Currencies.js";
const date = Math.floor(new Date().getTime() / 1000);
import User from "../models/Users.js";
import Sentiment from "../models/Sentiment.js";

export const getCryptoDetails = async (req, res) => {
  try {
    const cryptoInfo = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${req.params.id}`
      /*{
        params: {
          slug: id,
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        },
      }*/
    );
    const cryptoHistorical = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${req.params.id}/market_chart/range?vs_currency=usd&from=1640966400&to=${date}`
    );
    const cryptoNewsInfo = await axios.get(
      `https://newsapi.org/v2/everything?q=${req.params.id}&apiKey=a1ba957a74c647a48f43d666485307c1`
    );

    // Create new objects and remove unwanted properties
    const cryptoHistoricalData = { ...cryptoHistorical };
    delete cryptoHistoricalData.config;
    delete cryptoHistoricalData.request;

    // Create new objects and remove unwanted properties
    const cryptoNewsData = { ...cryptoNewsInfo };
    delete cryptoNewsData.config;
    delete cryptoNewsData.request;

    // Create new objects and remove unwanted properties
    const cryptoInfoData = { ...cryptoInfo };
    delete cryptoInfoData.config;
    delete cryptoInfoData.request;

    const data = {
      cryptoHistoricalData: cryptoHistoricalData,
      cryptoInfoData: cryptoInfoData,
      cryptoNewsData: cryptoNewsData,
    };

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getExchanges = async (req, res) => {
  try {
    const exchangeInfo = await axios.get(
      "https://api.coingecko.com/api/v3/exchanges"
    );

    const exchangeData = { ...exchangeInfo };
    delete exchangeData.config;
    delete exchangeData.request;

    res.status(200).json(exchangeData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const getSearchCrypto = async (req, res) => {
  const query = req.params.query;
  // Validate the query parameter

  try {
    const result = await Currency.find({
      $or: [
        { name: { $regex: `^${query}`, $options: "i" } },
        { symbol: { $regex: `^${query}`, $options: "i" } },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const postWatchList = async (req, res) => {
  const userId = req.session.userId; // assuming you store user id in session
  const { cryptoId } = req.body;

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "User not logged in" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the cryptocurrency is already in the user's currencies
    const cryptoIndex = user.currencies.indexOf(cryptoId);
    if (cryptoIndex !== -1) {
      // If found, remove it from the watchlist
      user.currencies.splice(cryptoIndex, 1);
      await user.save();

      return res.status(200).json({
        success: false,
        message: "Cryptocurrency removed from watchlist",
      });
    }

    user.currencies.push(cryptoId);
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Cryptocurrency added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

export const getWatchlist = async (req, res) => {
  const userId = req.session.userId;
  console.log("🚀 ~ file: currencies.js:126 ~ getWatchlist ~ userId:", userId);
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "User not logged in" });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ currencies: user.currencies, message: "Successfull" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};

export const getCryptoByWatchlist = async (req, res) => {
  const user = await User.findById(req.session.userId);
  const watchlist = user.currencies;

  const idsString = encodeURIComponent(watchlist.join(","));
  console.log(
    "🚀 ~ file: currencies.js:155 ~ getCryptoByWatchlist ~ idsString:",
    idsString
  );
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsString}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
    );

    const data = { ...response };
    delete data.config;
    delete data.request;

    res.status(200).json({ cryptoLatestInfo: data });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
