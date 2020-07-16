//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("../schemas/playerData.js");
const Knife = require("../schemas/knife.js");

//Node Fetch Library
const fetch = require('node-fetch');

//Cherio Web Scraper
const cheerio = require("cheerio");

//Request
const request = require("request");

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    if (message.author.id === "221674011694727169"){

        //                "Flip Knife",
        //                "Bayonet",
        //                "Karambit",
        //                "M9 Bayonet",
        qualities = ["Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred", "StatTrak Factory New", "StatTrak Minimal Wear", "StatTrak Field-Tested", "StatTrak Well-Worn", "StatTrak Battle-Scarred"]
        let knifeTemplate = {
            knives: [
                "Gut Knife"
            ],
            skins: [
                "Vanilla",
                "Blue Steel",
                "Boreal Forest",
                "Case Hardened",
                "Crimson Web",
                "Fade",
                "Forest DDPAT",
                "Night",
                "Safari Mesh",
                "Scorched",
                "Slaughter",
                "Stained",
                "Urban Masked"
            ]
        }

        fetchedSkins = [];
        fetchedKnives = [];

        let knifeEntry = new Knife({
            _id: new mongoose.Types.ObjectId,
            type: "general",
            knives: []
        })

        for (knife in knifeTemplate.knives){
            fetchedKnife = {
                name: knifeTemplate.knives[knife],
                skins: []
            }
            for(skin in knifeTemplate.skins){
                fetchedSkin = {
                    name: knifeTemplate.knives[knife] + " | " + knifeTemplate.skins[skin]
                }
                for(quality in qualities){
                    let url = ""
                    if (qualities[quality].includes("StatTrak")){
                        if (knifeTemplate.skins[skin] === "Vanilla"){
                            url = "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=★ StatTrak™ " + knifeTemplate.knives[knife]
                        } else {
                            url = "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=★ StatTrak™ " + knifeTemplate.knives[knife] + " | " + knifeTemplate.skins[skin] + " (" + qualities[quality].replace('StatTrak ', '') + ")"
                        }
                    } else {
                        if (knifeTemplate.skins[skin] === "Vanilla"){
                            url = "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=★ " + knifeTemplate.knives[knife]
                        } else {
                            url = "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=★ " + knifeTemplate.knives[knife] + " | " + knifeTemplate.skins[skin] + " (" + qualities[quality] + ")"
                        }
                    }
                    url = encodeURI(url);

                    let marketFetch = await fetch(url)
                    .then(response => response.json())
                    .then(response => {
                            if (response){
                                // console.log(url);
                                // console.log(response);
                                if(response.success.toString() === "true"){
                                    if(response.median_price){
                                        fetchedSkin[qualities[quality]] = response.median_price.slice(1);
                                    } else if(response.lowest_price) {
                                        fetchedSkin[qualities[quality]] = response.lowest_price.slice(1);
                                    }
                                    
                                    console.log(knifeTemplate.skins[skin] + " " + qualities[quality]);
                                    console.log(response);
                                } else {
                                    console.log("Not Found");
                                }
                            } else {
                                console.log("Error")
                            }   
                        
                    })
                    .then(() => new Promise((resolve) => setTimeout(resolve, 5000)));
                }
                fetchedKnife.skins.push(fetchedSkin);
            }
            console.log(fetchedKnife);
            knifeEntry.knives.push(fetchedKnife);
            knifeEntry.save();
        }

        // for(let i = 0; i < fetchedSkins.length; i++){
        //     knifeEntry.knives[colors[i]].push(fetchedSkins[i])
        // }

        

        // let caseSplitBySpace = args[0].split(" ");
        // let caseForUrl = "";
        // for (let i = 0; i < caseSplitBySpace.length; i++){
        //     caseForUrl += caseSplitBySpace[i];
        //     if(caseSplitBySpace[i+1]){
        //         caseForUrl += "%20"
        //     }
        // }

        // let url = "https://steamcommunity.com/market/listings/730/" + caseForUrl
        // fetch(url)
        //     .then(res => res.text())
        //     .then(async body => {
        //         let $ = cheerio.load(body);

        //         script = "";
        //         $("script").each(function(index, obj){
        //             if ($(this).html().indexOf("var g_rgAssets") != -1){
        //                 script = $(this).html();
        //             }
        //         })
                
        //         script = script.split("var g_rgAssets = ")[1].split(";")[0];
        //         script = JSON.parse(script);

        //         let skins = []
        //         let colors = []
        //         for(let key in script["730"]["2"]){
        //             for(obj in script["730"]["2"][key].descriptions){
        //                 let description = JSON.stringify(script["730"]["2"][key].descriptions[obj]);
        //                 if (description.indexOf("|") != -1){
        //                     if (description.split('"value":')[1].split(',"color":"')[1].replace('"', "").replace("}", "").toString() === "4b69ff"){
        //                         colors.push("blue");
        //                     } else if(description.split('"value":')[1].split(',"color":"')[1].replace('"', "").replace("}", "").toString() === "8847ff"){
        //                         colors.push("purple");
        //                     } else if(description.split('"value":')[1].split(',"color":"')[1].replace('"', "").replace("}", "").toString() === "d32ce6"){
        //                         colors.push("pink");
        //                     } else if(description.split('"value":')[1].split(',"color":"')[1].replace('"', "").replace("}", "").toString() === "eb4b4b"){
        //                         colors.push("red");
        //                     } 
        //                     skins.push(description.split('"value":')[1].split(',"color')[0].replace('"', "").replace('"', ""))
        //                     //console.log(description.split('"value":')[1].split(',"color')[0].replace('"', "").replace('"', ""));
        //                 }
        //             }
        //         }

        //         fetchedSkins = [];
        //         qualities = ["Factory New", "Minimal Wear", "Field-Tested", "Well-Worn", "Battle-Scarred", "StatTrak Factory New", "StatTrak Minimal Wear", "StatTrak Field-Tested", "StatTrak Well-Worn", "StatTrak Battle-Scarred"]
        //         for(skin in skins){
        //             fetchedSkin = {
        //                 name: skins[skin]
        //             }

        //             let url = "";
        //             for(quality in qualities){
        //                 if (qualities[quality].includes("StatTrak")){
        //                     url = "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=StatTrak™ " + skins[skin] + " (" + qualities[quality].replace('StatTrak ', '') + ")"
        //                 } else {
        //                     url = "http://steamcommunity.com/market/priceoverview/?appid=730&currency=2&market_hash_name=" + skins[skin] + " (" + qualities[quality] + ")"
        //                 }
        //                 url = encodeURI(url);

        //                 let marketFetch = await fetch(url)
        //                 .then(response => response.json())
        //                 .then(response => {
        //                         if (response){
        //                             if(response.success.toString() === "true"){
        //                                 if(response.median_price){
        //                                     fetchedSkin[qualities[quality]] = response.median_price.slice(1);
        //                                 } else if(response.lowest_price) {
        //                                     fetchedSkin[qualities[quality]] = response.lowest_price.slice(1);
        //                                 }
                                        
        //                                 console.log(skins[skin] + " " + qualities[quality]);
        //                                 console.log(response);
        //                             } else {
        //                                 console.log("Not Found");
        //                             }
        //                         } else {
        //                             console.log("Error")
        //                         }   
                            
        //                 })
        //                 .then(() => new Promise((resolve) => setTimeout(resolve, 5000)));
        //             }
        //             fetchedSkins.push(fetchedSkin);
        //         }

        //         let caseEntry = new Case({
        //             _id: new mongoose.Types.ObjectId,
        //             case: args[0],
        //             price: args[3],
        //             knifeType: args[2],
        //             caseId: parseInt(args[1])
        //         })

        //         for(let i = 0; i < fetchedSkins.length; i++){
        //             caseEntry.contents[colors[i]].push(fetchedSkins[i])
        //         }

        //         caseEntry.contents.yellow.push("general")

        //         caseEntry.save();
        //         console.log(fetchedSkins);


        //         message.channel.send(skins);
        //     });
    } else {
        message.channel.send("Imagine thinking i would let you add a case.");
    }
    
}

module.exports.help = {
    name: "addknife"
}