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

    let finalString = "Command Name" + config.stringSeparator + "Paramaters" + config.stringSeparator + "Command Description\n";
    for(let i = 0; i < 17; i++){
        finalString += config.lineSeparator;
    }
    finalString += "\n";

    let embed = new Discord.RichEmbed()
    .setTitle("Help");

    let addHelp = (commandName, paramaters, description) => {
        let finalString = "";

        finalString += commandName + config.stringSeparator + paramaters + config.stringSeparator + description + "\n";

        return finalString;
    }

    finalString += addHelp(">bal", "", "Shows Your Account Balance");
    finalString += addHelp(">collect", "", "Get Money From Your AFK Wallet");
    finalString += addHelp(">baltop", "", "Show Balance leaderboards");
    finalString += addHelp(">flip", "{tails/heads} {ammount}", "Coin Flip With A Certain Ammount Of Money");
    finalString += addHelp(">flip", "{tails/heads} all", "Coin Flip With All Your Money");
    finalString += addHelp(">cases", "", "Displays All Available Cases");
    finalString += addHelp(">case", "{case id} {number of cases to open}", "Open A Case");
    finalString += addHelp(">sell", "{skin id}", "Sell Skin");
    finalString += addHelp(">sell all", "", "Sell All Skins (Does Not Include Showcase Skins)");
    finalString += addHelp(">showcase", "", "Show Your Showcase");
    finalString += addHelp(">showcase add", "{skin id}", "Add Skin To Showcase");
    finalString += addHelp(">showcase remove", "{skin id}", "Remove Skin From Showcase");

    embed.setDescription(finalString);
    
    message.channel.send(embed);
    
}

module.exports.help = {
    name: "help"
}