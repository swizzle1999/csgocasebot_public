//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("../schemas/playerData.js");

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    PlayerData.find({}, function (err, doc){
        let balance = doc.balance;

        let embed = new Discord.RichEmbed()
        .setTitle("Balance Leaderboards");

        let finalString = "";
        var balObject = []
        doc.forEach((user) => {
            tempObject = {};
            tempObject["userId"] = user.userId;
            tempObject["balance"] = user.balance;
            balObject.push(tempObject);
        })

        function compare(a, b){
            a.balance = parseFloat(a.balance);
            b.balance = parseFloat(b.balance);
            if (a.balance < b.balance){
                return 1;
            } else if (a.balance > b.balance) {
                return -1;
            } else {
                return 0;
            }
        }
        balObject.sort(compare);

        let emojiTopToggle = false;
        balObject.forEach((object) => {
            if (!emojiTopToggle){
                finalString += message.guild.members.get(object.userId).user.username + " £" + object.balance +" :dollar:\n";
                emojiTopToggle = true;
            } else {
                finalString += message.guild.members.get(object.userId).user.username + " £" + object.balance +"\n";
            }
        })

        embed.setDescription(finalString);
        
        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "baltop"
}