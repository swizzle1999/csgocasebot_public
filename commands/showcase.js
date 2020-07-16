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
        if(args[0] === "add"){
            PlayerData.findOne(
                {userId: message.author.id},
                function(err, player){
                    //Prepare some bleach for your eyes. This is a messy one.
                    let categories = ["orange", "yellow", "red", "pink", "purple", "blue", "lightblue", "white"];
                    let stop = false;
                    //Loop through each category to look through
                    for(let categoryIndex = 0; categoryIndex <  categories.length && !stop; categoryIndex++){
                        //Loop through each skin in each category
                        for(let skinIndex = 0; skinIndex < player.inventory[categories[categoryIndex]].length && !stop; skinIndex++){
                            //If that skinIndexs ID equals our argument we found it
                            if (player.inventory[categories[categoryIndex]][skinIndex]._id.toString() === args[1]){
                                player.showcase[[categories[categoryIndex]]].push(player.inventory[categories[categoryIndex]][skinIndex]);
                                player.inventory[categories[categoryIndex]].splice(skinIndex, 1);
                                stop = true;
                            }
                        }
                    }
                    player.save();
                }
            )
        } 
        else if (args[0] === "remove"){
            PlayerData.findOne(
                {userId: message.author.id},
                function(err, player){
                    //Prepare some bleach for your eyes. This is a messy one.
                    let categories = ["orange", "yellow", "red", "pink", "purple", "blue", "lightblue", "white"];
                    let stop = false;
                    //Loop through each category to look through
                    for(let categoryIndex = 0; categoryIndex <  categories.length && !stop; categoryIndex++){
                        //Loop through each skin in each category
                        for(let skinIndex = 0; skinIndex < player.showcase[categories[categoryIndex]].length && !stop; skinIndex++){
                            //If that skinIndexs ID equals our argument we found it
                            if (player.showcase[categories[categoryIndex]][skinIndex]._id.toString() === args[1]){
                                player.inventory[[categories[categoryIndex]]].push(player.showcase[categories[categoryIndex]][skinIndex]);
                                player.showcase[categories[categoryIndex]].splice(skinIndex, 1);
                                stop = true;
                            }
                        }
                    }
                    player.save();
                }
            )
        }
        else if (args[0] === "yellow" || args[0] === "red" || args[0] === "pink" || args[0] === "purple" || args[0] === "blue" || args[0] === "lightblue" || args[0] === "white"){
            PlayerData.findOne(
                {userId: message.author.id},
                async function(err, player){
                    function getSkinEntry(i){
                        if (player.showcase[args[0]][i]){
                            return (player.showcase[args[0]][i].name + config.stringSeparator + player.showcase[args[0]][i].condition + config.stringSeparator + "£" + player.showcase[args[0]][i].price + config.stringSeparator + player.showcase[args[0]][i]._id +"\n\n").toString();
                        } else {
                            return "";
                        }        
                    }
    
                    let embed = new Discord.RichEmbed()
                    .setTitle("showcase");
    
                    let finalString = "Skin Name" + config.stringSeparator + "Condition" + config.stringSeparator + "Value Of Skin" + config.stringSeparator + "ID To Use In Commands" + "\n";
                    for(let i = 0; i < 20; i++){
                        finalString += config.lineSeparator;
                    }
                    finalString += "\n";
                    for (let i = 0; i < 5; i++){
                        finalString += getSkinEntry(i);
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
                            .setTitle("Showcase");
            
                            let finalString = "";
                            for (let i = 5*pageNum; i < (5*pageNum)+5; i++){
                                if (player.showcase[args[0]][i]){
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
                                .setTitle("showcase");
                
                                let finalString = "";
                                for (let i = 5*pageNum; i < (5*pageNum)+5; i++){
                                    if (player.showcase[args[0]][i]){
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
    } else {
        PlayerData.findOne(
            {userId: message.author.id},
            async function(err, player){
                function getAllSkins(i){
                    let categories = ["orange", "yellow", "red", "pink", "purple", "blue", "lightblue", "white"];
                    let allSkins = []
                    for(let categoryIndex = 0; categoryIndex < categories.length; categoryIndex++){
                        for(let skinIndex = 0; skinIndex < player.showcase[categories[categoryIndex]].length; skinIndex++){
                            if (player.showcase[categories[categoryIndex]][skinIndex]){
                                allSkins.push(player.showcase[categories[categoryIndex]][skinIndex].name + config.stringSeparator + player.showcase[categories[categoryIndex]][skinIndex].condition + config.stringSeparator + "£" + player.showcase[categories[categoryIndex]][skinIndex].price + config.stringSeparator + player.showcase[categories[categoryIndex]][skinIndex]._id +"\n\n").toString();
                            }    
                        }
                    }
                    return allSkins;
                }

                let embed = new Discord.RichEmbed()
                .setTitle("showcase");

                let finalString = "Skin Name" + config.stringSeparator + "Condition" + config.stringSeparator + "Value Of Skin" + config.stringSeparator + "ID To Use In Commands" + "\n";
                for(let i = 0; i < 20; i++){
                    finalString += config.lineSeparator;
                }
                
                let allSkins = getAllSkins();
                finalString += "\n";
                for (let i = 0; i < 5; i++){
                    if(allSkins[i]){
                        finalString += allSkins[i];
                    }
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
                        .setTitle("Showcase");
        
                        let finalString = "";
                        for (let i = 5*pageNum; i < (5*pageNum)+5; i++){
                            if(allSkins[i]){
                                finalString += allSkins[i];
                            }
                            
                        }

                        embed.setDescription(finalString);
                        msg.edit(embed);
                    })

                    backwards.on("collect", async r => {
                        if (pageNum >= 1){
                            pageNum -= 1;
                            let embed = new Discord.RichEmbed()
                            .setTitle("showcase");
            
                            let finalString = "";
                            for (let i = 5*pageNum; i < (5*pageNum)+5; i++){
                                if(allSkins[i]){
                                    finalString += allSkins[i];
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
    name: "showcase"
}