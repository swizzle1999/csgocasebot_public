//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("../schemas/playerData.js");
const Cases = require("../schemas/case.js")
const Knives = require("../schemas/knife.js")

//Node Fetch Library
const fetch = require('node-fetch');

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    if (args[0]){
        PlayerData.findOne(
            {userId: message.author.id},
            async function(err, player){
                function getSkinEntry(i){
                    // let marketValue = await fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=" + player.inventory[args[0]][i].name + " (" + player.inventory[args[0]][i].condition + ")")
                    // .then(response => response.json());
                    // if (marketValue){
                    //     if(marketValue.success){
                    //         return (player.inventory[args[0]][i].name + " :small_orange_diamond: " + player.inventory[args[0]][i].float + " :small_orange_diamond: " + player.inventory[args[0]][i].condition + " :small_orange_diamond: " + marketValue.median_price + "\n").toString();
                    //     } else {
                    //         return (player.inventory[args[0]][i].name + " :small_orange_diamond: " + player.inventory[args[0]][i].float + " :small_orange_diamond: " + player.inventory[args[0]][i].condition + " :small_orange_diamond: null\n").toString();
                    //     }
                    // }
                    if (player.inventory[args[0]][i]){
                        return (player.inventory[args[0]][i].name + config.stringSeparator + player.inventory[args[0]][i].condition + config.stringSeparator + "£" + player.inventory[args[0]][i].price + config.stringSeparator + player.inventory[args[0]][i]._id +"\n\n").toString();
                    } else {
                        return "";
                    }        
                }

                let embed = new Discord.RichEmbed()
                .setTitle("Inventory");

                let finalString = "Skin Name" + config.stringSeparator + "Condition" + config.stringSeparator + "Value Of Skin" + config.stringSeparator + "ID To Use In Commands" + "\n";
                for(let i = 0; i < 20; i++){
                    finalString += config.lineSeparator;
                }
                finalString += "\n";
                for (let i = 0; i < 5; i++){
                    finalString += getSkinEntry(i);
                    // await getSkinEntry(i).then(data => {
                    //     finalString += data
                    // });
                }

                embed.setDescription(finalString)
                message.channel.send(embed).then(async msg => {
                    await msg.react("⬅");
                    await msg.react("➡");

                    const backwardsFilter = (reaction, user) => reaction.emoji.name === "⬅" && user.id === message.author.id;
                    const forwardsFilter = (reaction, user) => reaction.emoji.name === "➡" && user.id === message.author.id;

                    const backwards = msg.createReactionCollector(backwardsFilter, {time: 20000});
                    const forwards = msg.createReactionCollector(forwardsFilter, {time: 20000});

                    let pageNum = 0;
                    forwards.on("collect", async r => {
                        pageNum += 1;

                        let embed = new Discord.RichEmbed()
                        .setTitle("Inventory");
        
                        let finalString = "";
                        for (let i = 5*pageNum; i < (5*pageNum)+5; i++){
                            if (player.inventory[args[0]][i]){
                                finalString += getSkinEntry(i);
                                // await getSkinEntry(i).then(data => {
                                //     finalString += data
                                // });
                            }
                            
                        }

                        embed.setDescription(finalString);
                        msg.edit(embed);
                    })

                    backwards.on("collect", async r => {
                        if (pageNum >= 1){
                            pageNum -= 1;
                            let embed = new Discord.RichEmbed()
                            .setTitle("Inventory");
            
                            let finalString = "";
                            for (let i = 5*pageNum; i < (5*pageNum)+5; i++){
                                if (player.inventory[args[0]][i]){
                                    finalString += getSkinEntry(i);
                                    // await getSkinEntry(i).then(data => {
                                    //     finalString += data
                                    // });
                                }
                                
                            }

                            embed.setDescription(finalString);

                            msg.edit(embed);
                        }
                        
                    })
                });



            }
        )
    }
    
}

module.exports.help = {
    name: "inv"
}