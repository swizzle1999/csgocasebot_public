//Config File
const config = require("../config.json")

//Discord.js
const Discord = require("discord.js");
let bot = null;

//Mongoose And Schemas
const mongoose = require("mongoose");
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("../schemas/playerData.js");



let giveMoney = async() => {
    PlayerData.find({},
        function(err, players){
            players.forEach((player) => {
                if ((parseFloat(player.afkWallet) + (config.defaultMoneyTick * parseFloat(player.multiplier))) > 100) {
                    player.afkWallet = 100;
                } else {
                    player.afkWallet = (parseFloat(player.afkWallet) + (config.defaultMoneyTick * parseFloat(player.multiplier)));
                    player.afkWallet = parseFloat(player.afkWallet).toFixed(2);
                }

                player.save();
                // PlayerData.updateOne(
                //     {userId: player.userId},
                //     {$set: {"balance": parseFloat(player.balance) + (config.defaultMoneyTick * parseFloat(player.multiplier))}},
                //     function(err, doc){
                //         if (err){
                //             console.log(err)
                //         } 
                //     }
                // )
            })
        })
    
    // for (let i = 0; i < playersMining.length; i++){
    //     console.log(playersMining[i])
    // }


}

let run = async(botClone) => {
    bot = botClone;
    
    giveMoney();
    setInterval(giveMoney, config.tickSpeed);
}
module.exports.run = run;

