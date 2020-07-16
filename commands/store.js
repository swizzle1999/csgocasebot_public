//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const Store = require("../schemas/store.js");
const PlayerData = require("../schemas/playerData.js");

module.exports.run = async(bot, message, args) => {
    var sender = message.author;
    var msg = message.content;

    if (!args[0]){
        let finalString = "Upgrade Name" + config.stringSeparator + "ID" + config.stringSeparator + "Description" 
        + config.stringSeparator + "Price" + config.stringSeparator + "Required Items\n";
        for(let i = 0; i < 18; i++){
            finalString += config.lineSeparator;
        }
        finalString += "\n";
    
        let embed = new Discord.RichEmbed()
        .setTitle("Store");

        Store.find({},
            function(err, upgrades){
                console.log(upgrades);
                for(upgrade in upgrades){
                    finalString += upgrades[upgrade].name + config.stringSeparator + upgrades[upgrade].id + config.stringSeparator 
                    + upgrades[upgrade].description + config.stringSeparator + "£" + upgrades[upgrade].price + config.stringSeparator + upgrades[upgrade].requiredItems + "\n";
                }
            })
        .then(data => { 
            embed.setDescription(finalString);
            message.channel.send(embed);
        });  
        // let addHelp = (upgradeName, id, upgradeDescription, price) => {
        //     let finalString = "";
    
        //     finalString += upgradeName + config.stringSeparator + id + config.stringSeparator + upgradeDescription + config.stringSeparator + "£" + price + "\n";
    
        //     return finalString;
        // }
    
        // finalString += addHelp("temp", "1", "temp upgrade", 27);
        // finalString += addHelp("temp2", "2", "temp2 upgrade", 69);
        // finalString += addHelp("temp3", "3", "temp3 upgrade", 24);

    } else if (args[0]){
        Store.findOne(
            {id: [parseInt(args[0])]},
            function(err, upgrade){
                PlayerData.findOne(
                    {userId: message.author.id},
                    function(err, player){
                        message.channel.send(player.balance);
                    }
                );
            }
        );
    }
   
    
}

module.exports.help = {
    name: "store"
}