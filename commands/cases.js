//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("../schemas/playerData.js");
const Cases = require("../schemas/case.js")

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    Cases.find({}).sort({caseId: 1}).exec(function(err, doc){
        let embed = new Discord.RichEmbed()
        .setTitle("Cases:")
        .setDescription("Official Case Name | ID");
        
        let finalString = "Case Name" + config.stringSeparator + "ID To Use In Commands" + config.stringSeparator + "Price Of Case\n";
        for(let i = 0; i < 16; i++){
            finalString += config.lineSeparator;
        }
        finalString += "\n";
        doc.forEach((caseEntry) => {
            finalString += caseEntry.case + config.stringSeparator + caseEntry.caseId + config.stringSeparator + "£" + caseEntry.price + "\n"
        })

        embed.setDescription(finalString);
        message.channel.send(embed)
    })
}

module.exports.help = {
    name: "cases"
}