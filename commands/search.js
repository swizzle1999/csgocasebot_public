//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("../schemas/playerData.js");
const cases = require("../schemas/case.js")

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    // cases.find({}, function(err, doc){
    //     doc.forEach((caseEntry) => {
    //         console.log(caseEntry.contents.blue[0]);
    //     })
    // })
    // PlayerData.findOne({
    //     userId: sender.id
    // }, function (err, doc){
    //     let balance = doc.balance;

    //     message.channel.send({embed:{
    //         title: "Bank",
    //         color: 0xF1C40F,
    //         fields:[{
    //             name: "Account Holder",
    //             value: message.author.username,
    //             inline: true
    //         },
    //         {
    //             name: "Account Balance",
    //             value: "£"+balance,
    //             inline: true
    //         }]
    //     }})
    // });

}

module.exports.help = {
    name: "search"
}