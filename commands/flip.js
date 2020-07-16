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

    if ((!isNaN(args[1]) && parseFloat(args[1]) > 0) || args[1] == "all"){
        PlayerData.findOne({
            userId: sender.id
        }, function (err, doc){
            let money = parseFloat(doc.balance);
            let oldMoney = parseFloat(doc.balance);
            if (money < parseFloat(args[1])){
                message.channel.send("You Do Not Have Enough Money For That Flip")
                return;
            }
            let flip = null;
            let rand = Math.random()
            if (rand >= 0.5){
                flip = "heads"
            } else {
                flip = "tails"
            }
    
            // if (message.author.id === "221674011694727169"){
            //     flip = "heads";
            // }
            let embed = new Discord.RichEmbed()
            .setTitle("Coin Flip");

            //Bet all command
            let winResult = "<@" + message.author.id + "> Won Coin Flip\n Result Was " + rand;
            let lossResult = "<@" + message.author.id + "> Lost Coin Flip\n Result Was " + rand;
            if (args[1] === "all"){
                if (args[0] === flip){
                    if (rand > 0.95 || rand < 0.05){
                        money += money*2;
                        embed.setDescription(winResult + "\n You Hit The Double Bonus");
                        embed.setColor("#f0ff21");
                    } else {
                        money += money;
                        embed.setDescription(winResult);
                        embed.setColor("#00ff00");
                    }

                    // embed.setDescription(winResult);
                    // embed.setColor("#00ff00");
                } else {
                    money -= money;
                    embed.setDescription(lossResult);
                    embed.setColor("#ff0000");
                }
            //Normal bet ammount
            } else {
                if (args[0] === flip){
                    if (rand > 0.95 || rand < 0.05){
                        money += parseFloat(args[1])*2;
                        embed.setDescription(winResult + "\n You Hit The Double Bonus");
                        embed.setColor("#f0ff21");
                    } else {
                        money += parseFloat(args[1]);
                        embed.setDescription(winResult);
                        embed.setColor("#00ff00");
                    }

                    // embed.setDescription(winResult);
                    // embed.setColor("#00ff00");
                } else {
                    money -= parseFloat(args[1]);
                    embed.setDescription(lossResult);
                    embed.setColor("#ff0000");
                }
            }
            
            money = money.toFixed(2);         
            embed.addField("Statistics", "Previous Balance: £" + oldMoney + "\n New Balance: £" + money);

            let moneyStr = money.toString();
            PlayerData.findOneAndUpdate(
                {userId: sender.id},
                {$set: {"balance": moneyStr}},
                function(err, doc){
                    if (err){
                        console.log(err);
                    }
            }, {useFindAndModify: false});
            message.channel.send(embed)
        }); 
    } else {
        message.channel.send(args[1] + " is not a valid number")
    }
    
}

module.exports.help = {
    name: "flip"
}