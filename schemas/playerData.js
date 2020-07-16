const mongoose = require("mongoose");

const playerDataSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    balance: String,
    afkWallet: String,
    multiplier: String,
    inventory: {
        orange: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        yellow: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        red: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        pink: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        purple: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        blue: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        lightblue: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        white: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }]
    },
    showcase: {
        orange: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        yellow: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        red: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        pink: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        purple: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        blue: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        lightblue: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }],
        white: [{
            name: String,
            condition: String,
            price: String,
            belongsTo: Number
        }]
    }
}, {collection: "playerData"})

module.exports = mongoose.model("playerData", playerDataSchema);