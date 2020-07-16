//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("../schemas/playerData.js");
const Cases = require("../schemas/case.js")

//Node Fetch Library
const fetch = require('node-fetch');

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    // let urls = [
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    //     "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case",
    // ]

    // Promise.all(urls.map((url) => {
    //     return fetch(url).then(response => response.json())
    // })).then(data => console.log(data));

    // console.log(data);
    // let marketFetch = fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case")
    // .then(response => response.json())
    // .then(console.log("done"));
    // console.log(marketFetch);

    // let marketFetch2 = fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case")
    // .then(response => response.json())
    // .then(console.log("done"));

    // let marketFetch3 = fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case")
    // .then(response => response.json())
    // .then(console.log("done"));

    // let marketFetch4 = fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case")
    // .then(response => response.json())
    // .then(console.log("done"));

    // let marketFetch5 = fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case")
    // .then(response => response.json())
    // .then(console.log("done"));

    // let marketFetch6 = fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=Shattered Web Case")
    // .then(response => response.json())
    // .then(console.log("done"));
    
}

module.exports.help = {
    name: "test"
}