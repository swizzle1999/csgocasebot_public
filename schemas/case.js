const mongoose = require("mongoose");

const caseDataSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    case: String,
    price: String,
    knifeType: String,
    contents: {
        orange: [],
        yellow: [],
        red: [],
        pink: [],
        purple: [],
        blue: [],
        lightblue: [],
        white: []
    },
    caseId: Number
}, {collection: "cases"})

module.exports = mongoose.model("case", caseDataSchema);