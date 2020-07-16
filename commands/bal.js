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

    for (let i = 0; i < message.guild.members.size; i++){
        message.guild.members[i];
    }
    //Player provided argument, check balance for that player
    // if (args[0]){

    //     PlayerData.findOne({
    //         userId: args[0]
    //     }, function (err, doc){
    //         if (doc.balance){
    //             let balance = doc.balance;
    //             let afkWallet = doc.afkWallet;
    //             message.channel.send({embed:{
    //                 title: "Bank",
    //                 color: 0xF1C40F,
    //                 fields:[{
    //                     name: "Account Holder",
    //                     value: message.author.username,
    //                     inline: true
    //                 },
    //                 {
    //                     name: "Account Balance",
    //                     value: "£"+balance,
    //                     inline: true
    //                 },
    //                 {
    //                     name: "AFK Wallet",
    //                     value: "£"+afkWallet+"/£100",
    //                     inline: true
    //                 }]
    //             }})
    //         } else {
    //             message.channel.send("I dunno.... some sort of error i cant figure out");
    //         }     
    //     });
    // //No argument provided. Check balance for self
    // } else {
    PlayerData.findOne({
    userId: sender.id
    }, function (err, doc){
        let balance = doc.balance;
        let afkWallet = doc.afkWallet;
        message.channel.send({embed:{
            title: "Bank",
            color: 0xF1C40F,
            fields:[{
                name: "Account Holder",
                value: message.author.username,
                inline: true
            },
            {
                name: "Account Balance",
                value: "£"+balance,
                inline: true
            },
            {
                name: "AFK Wallet",
                value: "£"+afkWallet+"/£100",
                inline: true
            }]
        }})
    });
}

module.exports.help = {
    name: "bal"
}