import mongoose from "mongoose";

const SentimentShema = new mongoose.Schema({
  Crypto: {
    type: String,
    required: true,
  },
  score: {
    type: String,
  },
  sentiment: {
    type: String,
  },
});

const Sentiment = mongoose.model("Sentiment", SentimentShema);

export default Sentiment;
