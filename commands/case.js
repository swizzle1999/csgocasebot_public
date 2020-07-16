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
    if (args[0] === "open") {
        //Find the player requesting to open the case
        PlayerData.findOne(
            {userId: message.author.id},
            function(err, player){
                let money = parseFloat(player.balance);
                //Find the case they are requesting to open
                Cases.findOne(
                    {caseId: args[1]},
                    async function(err, caseEntry){
                        // let marketFetch = await fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name="+caseEntry.case)
                        // .then(response => response.json());
                        if (err){
                            return err;
                        }

                        // openOne = async () => {
                        //     if (money < parseFloat(caseEntry.price)){
                        //         message.channel.send("Sorry you do not have enough money for that case")
                        //         return;
                        //     }
                        //     //Remove money from player
                        //     money -= parseFloat(caseEntry.price);
                        //     let moneyStr = money.toFixed(2).toString();    
                        //     player.balance = moneyStr;
    
                        //     //Find number of categories the case has weapons for
                        //     let presentRarities = []
                        //     for(var rarity of Object.keys(caseEntry.contents)){
                        //         //console.log(caseEntry.contents[rarity][0]);
                        //         if (!caseEntry.hasOwnProperty(rarity) && caseEntry.contents[rarity][0]){
                        //             presentRarities.push(rarity);
                        //         }
                        //     }
    
                        //     //Choose rarity to pull
                        //     var rand = Math.floor(Math.random()*101);
                        //     let pulledRarity = "null";
                        //     for (let i = 0; i < presentRarities.length; i++){
                        //         if (rand <= config.caseProbs[presentRarities[i]]){
                        //             pulledRarity = presentRarities[i];
                        //             break;
                        //         } else {
                        //             rand = rand - config.caseProbs[presentRarities[i]];
                        //         }
                        //     }
    
                        //     let embed = new Discord.RichEmbed()
                        //     .setTitle("Drop");
    
    
                        //     function knifeOrGun(){
                        //         return new Promise((resolve, reject) => {
                        //             let pulledSkin = null;
                        //             if (pulledRarity === "yellow"){
                        //                 Knives.findOne(
                        //                     {type: [caseEntry.knifeType]},
                        //                     function(err, knifeCollection){
                        //                         let knifeIndex = Math.floor(Math.random() * knifeCollection.knives.length)
                        //                         let knifeSkinIndex = Math.floor(Math.random() * knifeCollection.knives[knifeIndex].skins.length);
                        //                         pulledSkin = knifeCollection.knives[knifeIndex].skins[knifeSkinIndex];
                        //                         resolve(pulledSkin);
                        //                     }
                        //                 )
                        //             } else {
                        //                 //Choose skin to pull
                        //                 let skinIndex = Math.floor(Math.random() * caseEntry.contents[pulledRarity].length)
                        //                 pulledSkin = caseEntry.contents[pulledRarity][skinIndex];
                        //                 resolve(pulledSkin);
                        //             }
                        //         })
                        //     }
    
                        //     let pulledSkin = null;
                        //     await knifeOrGun().then(data => pulledSkin = data);
                            
                        //     let presentConditionsNormal = []
                        //     let presentConditionsStatTrak = []
                        //     //Standard Conditions
                        //     if (pulledSkin["Factory New"]){
                        //         presentConditionsNormal.push("Factory New");
                        //     }
                        //     if (pulledSkin["Minimal Wear"]){
                        //         presentConditionsNormal.push("Minimal Wear");
                        //     }
                        //     if (pulledSkin["Field-Tested"]){
                        //         presentConditionsNormal.push("Field-Tested");
                        //     }
                        //     if (pulledSkin["Well-Worn"]){
                        //         presentConditionsNormal.push("Well-Worn");
                        //     }
                        //     if (pulledSkin["Battle-Scarred"]){
                        //         presentConditionsNormal.push("Battle-Scarred");
                        //     }
                        //     //StatTrak conditions
                        //     if (pulledSkin["StatTrak Factory New"]){
                        //         presentConditionsStatTrak.push("StatTrak Factory New");
                        //     }
                        //     if (pulledSkin["StatTrak Minimal Wear"]){
                        //         presentConditionsStatTrak.push("StatTrak Minimal Wear");
                        //     }
                        //     if (pulledSkin["StatTrak Field-Tested"]){
                        //         presentConditionsStatTrak.push("StatTrak Field-Tested");
                        //     }
                        //     if (pulledSkin["StatTrak Well-Worn"]){
                        //         presentConditionsStatTrak.push("StatTrak Well-Worn");
                        //     }
                        //     if (pulledSkin["StatTrak Battle-Scarred"]){
                        //         presentConditionsStatTrak.push("StatTrak Battle-Scarred");
                        //     }
    
                        //     let foundValidCondition = true;
                        //     let condition = "";
                        //     if (presentConditionsStatTrak.length > 0 && (Math.random()*100 < parseFloat(config.caseProbs.stattrak))){
                        //         while(foundValidCondition){
                        //             let rng = Math.random();
                        //             if (rng <= 1 && rng >= 0.44 && presentConditionsStatTrak.includes("StatTrak Battle-Scarred")){
                        //                 condition = "StatTrak Battle-Scarred"
                        //             } else if (rng < 0.44 && rng >= 0.37 && presentConditionsStatTrak.includes("StatTrak Well-Worn")){
                        //                 condition = "StatTrak Well-Worn"
                        //             } else if (rng < 0.37 && rng >= 0.15 && rng >= 0.37 && presentConditionsStatTrak.includes("StatTrak Field-Tested")){
                        //                 condition = "StatTrak Field-Tested"
                        //             } else if (rng < 0.15 && rng >= 0.07 && presentConditionsStatTrak.includes("StatTrak Minimal Wear")){
                        //                 condition = "StatTrak Minimal Wear"
                        //             } else if (rng < 0.07 && rng >= 0 && presentConditionsStatTrak.includes("StatTrak Factory New")){
                        //                 condition = "StatTrak Factory New"
                        //             }
                        //         }
                        //     } else {
                        //         while(foundValidCondition){
                        //             let rng = Math.random();
                        //             if (rng <= 1 && rng >= 0.44){
                        //                 condition = "Battle-Scarred"
                        //             } else if (rng < 0.44 && rng >= 0.37){
                        //                 condition = "Well-Worn"
                        //             } else if (rng < 0.37 && rng >= 0.15){
                        //                 condition = "Field-Tested"
                        //             } else if (rng < 0.15 && rng >= 0.07){
                        //                 condition = "Minimal Wear"
                        //             } else if (rng < 0.07 && rng >= 0){
                        //                 condition = "Factory New"
                        //             }
                        //         }
                        //     }

                        //     // let condition = "";
                        //     // if(presentConditionsStatTrak.length > 0 && (Math.random()*100 < parseFloat(config.caseProbs.stattrak))){
                        //     //     condition = presentConditionsStatTrak[Math.floor(Math.random() * presentConditionsStatTrak.length)];
                        //     // } else {
                        //     //     condition = presentConditionsNormal[Math.floor(Math.random() * presentConditionsNormal.length)];
                        //     // }
    
                        //     // let marketValue = await fetch("http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=" + pulledSkin + " (" + condition + ")")
                        //     // .then(response => response.json());
    
                        //     // if (marketValue.success){
                        //     //     embed.setDescription("<@" + message.author.id + "> got a " + pulledSkin + "\nFloat: " + pulledSkinFloat + "\nValue: " + marketValue.median_price.toString());
                        //     // } else {
                        //     //     embed.setDescription("<@" + message.author.id + "> got a " + pulledSkin + "\nFloat: " + pulledSkinFloat + "\nValue: Sorry, Price Not Available");
                        //     // }
    
                        //     embed.setDescription("<@" + message.author.id + "> got a " + pulledSkin.name + "\nCondition: " + condition + "\nValue: £" + pulledSkin[condition] + "\n");
                        //     let skinEntry = {
                        //         name: [pulledSkin.name].toString(),
                        //         condition: [condition].toString(), 
                        //         price: [pulledSkin[condition]].toString(),
                        //         belongsTo: parseInt([caseEntry.caseId])
                        //     }
    
                        //     player.inventory[pulledRarity].push(skinEntry);
    
                        //     if (pulledRarity === "orange"){
                        //         embed.setColor("#E4AE33");
                        //     } else if (pulledRarity === "yellow"){
                        //         embed.setColor("#f5ef42");
                        //     }
                        //     else if (pulledRarity === "red"){
                        //         embed.setColor("#EB4B4B");
                        //     }
                        //     else if (pulledRarity === "pink"){
                        //         embed.setColor("#D32CE6");
                        //     }
                        //     else if (pulledRarity === "purple"){
                        //         embed.setColor("#8847FF");
                        //     }
                        //     else if (pulledRarity === "blue"){
                        //         embed.setColor("#4B69FF");
                        //     }
                        //     else if (pulledRarity === "lightblue"){
                        //         embed.setColor("#5E98D9");
                        //     }
                        //     else if (pulledRarity === "white"){
                        //         embed.setColor("#B0C3D9");
                        //     }

                        //     message.channel.send(embed);

                        //     player.save();
                        // }

                        openMultiple = async (numOfCasesToOpen) => {
                            if (money < parseFloat(caseEntry.price) * numOfCasesToOpen){
                                message.channel.send("Sorry you do not have enough money for that case")
                                return;
                            }

                            Knives.findOne(
                                {type: [caseEntry.knifeType]},
                                async function(err, knifeCollection){
                                    let knifeIndex = Math.floor(Math.random() * knifeCollection.knives.length)
                                    let knifeSkinIndex = Math.floor(Math.random() * knifeCollection.knives[knifeIndex].skins.length);
                                    pulledSkin = knifeCollection.knives[knifeIndex].skins[knifeSkinIndex];

                                    //Remove money from player
                                    money -= parseFloat(caseEntry.price) * numOfCasesToOpen;
                                    let moneyStr = money.toFixed(2).toString();    
                                    player.balance = moneyStr;
            
                                    //Find number of categories the case has weapons for
                                    let presentRarities = []
                                    for(var rarity of Object.keys(caseEntry.contents)){
                                        //console.log(caseEntry.contents[rarity][0]);
                                        if (!caseEntry.hasOwnProperty(rarity) && caseEntry.contents[rarity][0]){
                                            presentRarities.push(rarity);
                                        }
                                    }
            
                                    //Choose rarity to pull
                                    let pulledRarities = []
                                    for (let i = 0; i < numOfCasesToOpen; i++){
                                        var rand = Math.random()*101;
                                        let pulledRarity = "null";
                                        //console.log(rand);
                                        for (let i = 0; i < presentRarities.length; i++){
                                            if (rand <= config.caseProbs[presentRarities[i]]){
                                                pulledRarities.push(presentRarities[i]);
                                                break;
                                            } else {
                                                rand = rand - config.caseProbs[presentRarities[i]];
                                            }
                                        }
                                    }
            
                                    GetSkins = new Promise((resolve, reject) => {
                                        let pulledSkins = []
                                        for (let i = 0; i < pulledRarities.length; i++){
                                            let pulledSkin = null;
                                            if (pulledRarities[i] === "yellow"){
                                                let knifeIndex = Math.floor(Math.random() * knifeCollection.knives.length)
                                                let knifeSkinIndex = Math.floor(Math.random() * knifeCollection.knives[knifeIndex].skins.length);
                                                pulledSkins.push(knifeCollection.knives[knifeIndex].skins[knifeSkinIndex]);
                                            } else {
                                                //Choose skin to pull
                                                let skinIndex = Math.floor(Math.random() * caseEntry.contents[pulledRarities[i]].length)
                                                pulledSkins.push(caseEntry.contents[pulledRarities[i]][skinIndex]);
                                            }
                                        }
                                        resolve(pulledSkins);
                                    });
                                    
                                    let pulledSkins = [];
                                    await GetSkins.then(data => pulledSkins = data);

                                    
                                    let embed = new Discord.RichEmbed()
                                    .setTitle("Drop");
                                
                                    let finalString = "<@" + message.author.id + "> Got:\n";

                                    let skinEntries = [];
                                    for(let i = 0; i < pulledSkins.length; i++){
                                        let presentConditionsNormal = []
                                        let presentConditionsStatTrak = []
                                        //Standard Conditions
                                        if (pulledSkins[i]["Factory New"]){
                                            presentConditionsNormal.push("Factory New");
                                        }
                                        if (pulledSkins[i]["Minimal Wear"]){
                                            presentConditionsNormal.push("Minimal Wear");
                                        }
                                        if (pulledSkins[i]["Field-Tested"]){
                                            presentConditionsNormal.push("Field-Tested");
                                        }
                                        if (pulledSkins[i]["Well-Worn"]){
                                            presentConditionsNormal.push("Well-Worn");
                                        }
                                        if (pulledSkins[i]["Battle-Scarred"]){
                                            presentConditionsNormal.push("Battle-Scarred");
                                        }
                                        //StatTrak conditions
                                        if (pulledSkins[i]["StatTrak Factory New"]){
                                            presentConditionsStatTrak.push("StatTrak Factory New");
                                        }
                                        if (pulledSkins[i]["StatTrak Minimal Wear"]){
                                            presentConditionsStatTrak.push("StatTrak Minimal Wear");
                                        }
                                        if (pulledSkins[i]["StatTrak Field-Tested"]){
                                            presentConditionsStatTrak.push("StatTrak Field-Tested");
                                        }
                                        if (pulledSkins[i]["StatTrak Well-Worn"]){
                                            presentConditionsStatTrak.push("StatTrak Well-Worn");
                                        }
                                        if (pulledSkins[i]["StatTrak Battle-Scarred"]){
                                            presentConditionsStatTrak.push("StatTrak Battle-Scarred");
                                        }


                                        
                                        let foundValidCondition = false;
                                        let condition = "";
                                        if (presentConditionsStatTrak.length > 0 && (Math.random()*100 < parseFloat(config.caseProbs.stattrak))){
                                            while(!foundValidCondition){
                                                let rng = Math.random();
                                                if (rng <= 1 && rng >= 0.44 && presentConditionsStatTrak.includes("StatTrak Battle-Scarred")){
                                                    condition = "StatTrak Battle-Scarred"
                                                    foundValidCondition = true;
                                                } else if (rng < 0.44 && rng >= 0.37 && presentConditionsStatTrak.includes("StatTrak Well-Worn")){
                                                    condition = "StatTrak Well-Worn"
                                                    foundValidCondition = true;
                                                } else if (rng < 0.37 && rng >= 0.15 && presentConditionsStatTrak.includes("StatTrak Field-Tested")){
                                                    condition = "StatTrak Field-Tested"
                                                    foundValidCondition = true;
                                                } else if (rng < 0.15 && rng >= 0.07 && presentConditionsStatTrak.includes("StatTrak Minimal Wear")){
                                                    condition = "StatTrak Minimal Wear"
                                                    foundValidCondition = true;
                                                } else if (rng < 0.07 && rng >= 0 && presentConditionsStatTrak.includes("StatTrak Factory New")){
                                                    condition = "StatTrak Factory New"
                                                    foundValidCondition = true;
                                                }
                                            }
                                        } else {
                                            while(!foundValidCondition){
                                                let rng = Math.random();
                                                // console.log(rng);
                                                if (rng <= 1 && rng >= 0.44 && presentConditionsNormal.includes("Battle-Scarred")){
                                                    condition = "Battle-Scarred"
                                                    foundValidCondition = true;
                                                } else if (rng < 0.44 && rng >= 0.37 && presentConditionsNormal.includes("Well-Worn")){
                                                    condition = "Well-Worn"
                                                    foundValidCondition = true;
                                                } else if (rng < 0.37 && rng >= 0.15 && presentConditionsNormal.includes("Field-Tested")){
                                                    condition = "Field-Tested"
                                                    foundValidCondition = true;
                                                } else if (rng < 0.15 && rng >= 0.07 && presentConditionsNormal.includes("Minimal Wear")){
                                                    condition = "Minimal Wear"
                                                    foundValidCondition = true;
                                                } else if (rng < 0.07 && rng >= 0 && presentConditionsNormal.includes("Factory New")){
                                                    condition = "Factory New"
                                                    foundValidCondition = true;
                                                }
                                            }
                                        }
            
                                        // let condition = "";
                                        // if(presentConditionsStatTrak.length > 0 && (Math.random()*100 < parseFloat(config.caseProbs.stattrak))){
                                        //     condition = presentConditionsStatTrak[Math.floor(Math.random() * presentConditionsStatTrak.length)];
                                        // } else {
                                        //     condition = presentConditionsNormal[Math.floor(Math.random() * presentConditionsNormal.length)];
                                        // }

                                        let skinEntry = {
                                            name: [pulledSkins[i].name].toString(),
                                            condition: [condition].toString(), 
                                            price: [pulledSkins[i][condition]].toString(),
                                            belongsTo: parseInt([caseEntry.caseId])
                                        }

                                        skinEntries.push(skinEntry);

                                        player.inventory[pulledRarities[i]].push(skinEntry);
                                    }

                                    for (let i = 0; i < 5; i++){
                                        if (skinEntries[i]){
                                            finalString += (skinEntries[i].name + config.stringSeparator + skinEntries[i].condition + config.stringSeparator +  "£" + skinEntries[i].price + "\n");
                                        }
                                    }

                                    embed.setDescription(finalString);


                                    if (pulledRarities.includes("orange")){
                                        embed.setColor("#E4AE33");
                                    } else if (pulledRarities.includes("yellow")){
                                        embed.setColor("#f5ef42");
                                    }
                                    else if (pulledRarities.includes("red")){
                                        embed.setColor("#EB4B4B");
                                    }
                                    else if (pulledRarities.includes("pink")){
                                        embed.setColor("#D32CE6");
                                    }
                                    else if (pulledRarities.includes("purple")){
                                        embed.setColor("#8847FF");
                                    }
                                    else if (pulledRarities.includes("blue")){
                                        embed.setColor("#4B69FF");
                                    }
                                    else if (pulledRarities.includes("lightblue")){
                                        embed.setColor("#5E98D9");
                                    }
                                    else if (pulledRarities.includes("white")){
                                        embed.setColor("#B0C3D9");
                                    }
                                    
                                    player.save();
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
                                            .setTitle("Drop");
                            
                                            let finalString = "";
                                            
                                            for (let i = 5*pageNum; i < (5*pageNum)+5; i++){
                                                if (skinEntries[i]){
                                                    finalString += (skinEntries[i].name + config.stringSeparator + skinEntries[i].condition + config.stringSeparator +  "£" + skinEntries[i].price + "\n");
                                                }
                                                
                                            }

                    
                                            embed.setDescription(finalString);
                                            msg.edit(embed);
                                        })
                    
                                        backwards.on("collect", async r => {
                                            if (pageNum >= 1){
                                                pageNum -= 1;
                                                let embed = new Discord.RichEmbed()
                                                .setTitle("Drop");
                                
                                                let finalString = "";
                                                for (let i = 5*pageNum; i < (5*pageNum)+5; i++){
                                                    if (skinEntries[i]){
                                                        finalString += (skinEntries[i].name + config.stringSeparator + skinEntries[i].condition + config.stringSeparator +  "£" + skinEntries[i].price + "\n");
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

                        let numOfCasesToOpen = 1;
                        let multipleCases = false;
                        if (parseInt(args[2]) > 0 && parseInt(args[2]) <= 500){
                            numOfCasesToOpen = parseInt(args[2])
                            multipleCases = true;
                        } else {
                            message.channel.send("Too Many Cases");
                            return;
                        }
                        openMultiple(numOfCasesToOpen);
                        
                    }
                )

            }
        )
    } else {
        Cases.findOne({caseId: args[0]}, function(err, doc){
            if (err){
                console.log(err);
            } 
            else if (doc < 1) {
                message.channel.send("No Case Found With That ID")
            } else {
                let contents = doc.contents;
    
                let embed = new Discord.RichEmbed()
                .setTitle(doc.case);
    
                for(var category of Object.keys(contents)){
                    let fieldString = "";
                    for(let weapon = 0; weapon < contents[category].length; weapon++){
                        fieldString += contents[category][weapon] + "\n"
                    }
                    //For some reason empty fields were coming through
                    if (category && fieldString){
                        if (contents[category][0].length > 0){
                            embed.addField(category.charAt(0).toUpperCase() + category.slice(1), fieldString);
                        }
                    }
                }
                message.channel.send(embed)
            }
        })
    }
    
}

module.exports.help = {
    name: "case"
}