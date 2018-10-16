const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    date: { type: Date, default: Date.now },
    investment: { type: Number },
    Stock1: { type: String },
    Stock2: { type: String },
    amount1: { type: Number },
    amount2: { type: Number }
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;