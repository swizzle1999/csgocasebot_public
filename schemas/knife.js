const mongoose = require("mongoose");

const knifeDataSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    knives: [{
        name: String,
        skins: []
    }]
}, {collection: "knives"})

module.exports = mongoose.model("knife", knifeDataSchema);