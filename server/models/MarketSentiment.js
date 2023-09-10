import mongoose from "mongoose";

const MarketShema = new mongoose.Schema({
  id: {
    type: String,
    default: "Sentiment",
  },
  color: {
    type: String,
    default: "#fff2ac",
  },
  data: [
    {
      x: { type: mongoose.Schema.Types.Date },
      y: { type: Number },
    },
  ],
});

const Market = mongoose.model("Market", MarketShema);

export default Market;
