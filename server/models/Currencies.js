import mongoose from "mongoose";

const CurrencyShema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
  },
  name: {
    type: String,
  },
});

const Currency = mongoose.model("Currency", CurrencyShema);

export default Currency;
