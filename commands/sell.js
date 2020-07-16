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

const Balance = require("./bal.js");

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    //Sell All
    if (args[0] === "all"){
        PlayerData.findOne(
            {"userId": message.author.id},
            function(err, player){
                //console.log(player.inventory);
                for (let key in player.inventory){
                    if(player.inventory.hasOwnProperty(key)){
                        for(let i = 0; i < player.inventory[key].length; i++){
                            player.balance = (parseFloat(player.balance) + parseFloat(player.inventory[key][i].price)).toFixed(2).toString();
                        }     
                        player.inventory[key] = [];   
                    }
                }

                player.save().then(result =>{
                    Balance.run(bot, message, "");
                });
            });  
    //Sell Whole Category
    }else if (args[0] === "yellow" || args[0] === "red" || args[0] === "pink" || args[0] === "purple" || args[0] === "blue" || args[0] === "lightblue" || args[0] === "white"){
        PlayerData.findOne(
            {"userId": message.author.id},
            function(err, player){
                //console.log(player.inventory);
                for (let key in player.inventory){
                    if(player.inventory.hasOwnProperty(key) && key.toString() === args[0].toString()){
                        for(let i = 0; i < player.inventory[key].length; i++){
                            player.balance = (parseFloat(player.balance) + parseFloat(player.inventory[key][i].price)).toFixed(2).toString();
                        }
                        player.inventory[key] = [];
                        player.save().then(result =>{
                            Balance.run(bot, message, "");
                        });
                        
                    }
                }
            });  
    //Sell One Item
    }else if (args[0]){
        PlayerData.findOne(
        {"userId": message.author.id},
        function(err, player){
            for (let key in player.inventory){
                if(player.inventory.hasOwnProperty(key)){
                    for(let i = 0; i < player.inventory[key].length; i++){
                        if(player.inventory[key][i]._id.toString() === args[0].toString()){
                            player.balance = (parseFloat(player.balance) + parseFloat(player.inventory[key][i].price)).toFixed(2).toString();
                            player.inventory[key].splice(i, 1);
                            player.save().then(result => {
                                Balance.run(bot, message, "");
                            });
                        }
                    }
                }
            }
        });  
    }
}

module.exports.help = {
    name: "sell"
}