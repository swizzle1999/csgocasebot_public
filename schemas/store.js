const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    id: Number,
    price: String,
    description: String,
    requiredRank: String,
    requiredItems: []
}, {collection: "store"})

module.exports = mongoose.model("store", storeSchema);