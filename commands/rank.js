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
    let msgArray = msg.split(" ");

    // PlayerData.findOne(
    //     {userId: sender.id}, 
    //     function (err, doc){
    //     let money = parseFloat(doc.balance);

    //     if (msgArray[1] === "test"){
    //         let role = message.guild.roles.find(role => role.name === "test")

    //         message.member.addRole(role);
    //     }
        // if (money < parseFloat(args[1])){
        //     message.channel.send("You Do Not Have Enough Money For That Flip")
        //     return;
        // }
        // let flip = null;
        //     if (Math.random() >= 0.5){
        //         flip = "heads"
        //     } else {
        //         flip = "tails"
        //     }
    
        //     let embed = new Discord.RichEmbed()
        //     .setTitle("Coin Flip");
        //     if (args[0] === flip){
        //         money += parseFloat(args[1]);
        //         embed.setDescription("Won Coin Flip");
        //     } else {
        //         money -= parseFloat(args[1]);
        //         embed.setDescription("Lost Coin Flip");
        //     }
            
        //     let moneyStr = money.toString();
        //     PlayerData.findOneAndUpdate(
        //         {userId: sender.id},
        //         {$set: {"balance": moneyStr}},
        //         function(err, doc){
        //             if (err){
        //                 console.log(err);
        //             }
        //             PlayerData.findOne({
        //                 userId: sender.id
        //                 }, function (err, doc){
        //                     let balance = doc.balance;
                
        //                     message.channel.send({embed:{
        //                         title: "Bank",
        //                         color: 0xF1C40F,
        //                         fields:[{
        //                             name: "Account Holder",
        //                             value: message.author.username,
        //                             inline: true
        //                         },
        //                         {
        //                             name: "Account Balance",
        //                             value: "£"+balance,
        //                             inline: true
        //                         }]
        //                     }})
        //                 });
        //     }, {useFindAndModify: false});
        //     message.channel.send(embed)
    // }); 
}

module.exports.help = {
    name: "rank"
}