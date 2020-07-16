//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("../schemas/playerData.js");

//To run balance after collecting
const Balance = require("./bal.js");

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    PlayerData.findOne(
        {userId: message.author.id}, 
        function (err, player){
            player.balance = (parseFloat(player.balance) + parseFloat(player.afkWallet)).toFixed(2).toString();
            player.afkWallet = "0";
            player.save()
            .then(data => {
                Balance.run(bot, message, "");
            });
        })
}

module.exports.help = {
    name: "collect"
}