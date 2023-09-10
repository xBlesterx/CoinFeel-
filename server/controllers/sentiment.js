import axios from "axios";

import { spawn, exec } from "child_process";
import Market from "../models/MarketSentiment.js";

export const getNews = async (req, res) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;

  const fromDate = formatDate(yesterday);

  const toDate = formatDate(today);

  try {
    const newsInfo = await axios.get(
      `https://newsapi.org/v2/everything?q=bitcoin&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=a1ba957a74c647a48f43d666485307c1`
    );

    const titles = newsInfo.data.articles.map((article) => article.title);

    const sentiments = await getSentimentForNews(titles);

    const articlesWithSentiment = newsInfo.data.articles.map(
      (article, index) => {
        return { ...article, sentiment: sentiments[index] };
      }
    );

    res.status(200).json({ ...newsInfo.data, articles: articlesWithSentiment });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getSentimentForNews = (text) => {
  return new Promise((resolve, reject) => {
    const process = spawn("python", [
      "../server/AIModel/BERT.py",
      JSON.stringify(text),
    ]);
    let result = "";

    process.stdout.on("data", (data) => {
      result += data.toString();
    });

    process.stderr.on("data", (data) => {
      reject(new Error(`Python Error: ${data.toString()}`));
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}`));
      } else {
        try {
          const parsedResult = JSON.parse(result);
          resolve(parsedResult);
        } catch (error) {
          reject(new Error(`Error parsing Python output: ${error.message}`));
        }
      }
    });

    process.on("error", (error) => {
      reject(new Error(`Error spawning Python process: ${error.message}`));
    });
  });
};

export const getMakretSentiment = async (req, res) => {
  try {
    const globalInfo = await axios.get(
      "https://api.coingecko.com/api/v3/global"
    );

    const globalInfoData = { ...globalInfo };
    delete globalInfoData.config; // reference to request
    delete globalInfoData.request;

    const sentiment = await Market.find().select("-_id");
    res.status(200).json({ sentiment: sentiment, global: globalInfoData });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
