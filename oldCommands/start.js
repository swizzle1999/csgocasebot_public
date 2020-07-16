// //Config File
// const config = require("../config.json")

// //Discord.js
// const Discord = require("discord.js");

// //Mongoose And Schemas
// const mongoose = require("mongoose");
// mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
// const PlayerData = require("../schemas/playerData.js");

// module.exports.run = async(bot, message, args) => {
//     var sender = message.author;
//     var msg = message.content;

//     PlayerData.findOneAndUpdate(
//         {userId: sender.id},
//         {$set: {"isMining": true}},
//         function(err, doc){
//             if (err){
//                 console.log(err)
//             } else if (doc.isMining === true){
//                 message.channel.send(sender.username+ " is already mining for currency");
//             }
//             else {
//                 message.channel.send(sender.username+ " has started mining for currency");
//             }
//         },
//         {useFindAndModify: false}
//     )
// }

module.exports.help = {
    name: "start"
}