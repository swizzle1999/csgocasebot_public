//Config File
const config = require("./config.json")

//Discord.js
var Discord = require("discord.js");
var bot = new Discord.Client();
bot.commands = new Discord.Collection();

const fs = require ("fs");

//Mongoose And Schemas
const mongoose = require("mongoose");

//Mongoose Connection
mongoose.connect(config.databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true});
const PlayerData = require("./schemas/playerData.js");

//Read in all files from the commands folder
fs.readdir("./commands", (err, files) => {
    if (err){
        console.log(err);
    }

    let jsFiles = files.filter(f => f.split(".").pop() === "js");
    if (jsFiles.length == 0){
        console.log("Could Not Find Commands");
        return;
    }

    jsFiles.forEach((f) => {
        let props = require("./commands/"+f);
        console.log(f + " loaded");
        bot.commands.set(props.help.name, props);
    })
})

bot.on("message", message => {
    //Message Sender
    let sender = message.author;
    //Content of the message e.g. ">balance"
    let msg = message.content;
    
    //Content of message split to retrieve args, e.g. ">balance, swizz"
    let msgArray = msg.split(" ");

    let inSubString = false;
    let fullString = "";
    let startIndex = null;
    let endIndex = null;
    let indexesToRemove = []
    
    let newMsgArray = []

    //Loop through element split by space in the string
    for (msgIndex in msgArray){
        //Check if the string includes a " 
        if(msgArray[msgIndex].includes('"')){
            //if it does add it to the fullString string but remove the "
            fullString += msgArray[msgIndex].replace('"', "") + " ";
            //Keep track of the old strings we need to get rid of that will be replaced with the full one
            indexesToRemove.push(msgIndex);

            if (!inSubString){
                startIndex = msgIndex
            }

            //If we are currently working on building a full string, end it when we run into a second "
            if (inSubString){
                //Convert all the old strings to remove so we know which ones to get rid of
                for (let i = 0; i < indexesToRemove.length; i++){
                    msgArray[indexesToRemove[i]] = "REMOVE"
                }

                //Add in the full string at where we started at the index of the first "
                msgArray[startIndex] = fullString;

                //Reset everything ready for the next "
                fullString = "";
                indexesToRemove = []
            }
            //Toggle if we are working on a subString or not
            inSubString = !inSubString;
        }
        //If we are already in a sub strign but this string does not contain a " it is just in the middle and we can simply add it to full string and keep track of the index it replaces
        else if (inSubString == true){
            fullString += msgArray[msgIndex].replace('"', "") + " ";
            indexesToRemove.push(msgIndex);
        }
    }

    //Get rid of all the indexs we tagged with "REMOVE"
    for (let i = 0; i < msgArray.length; i++){
        
        if ((msgArray[i] === "REMOVE") == false){
            newMsgArray.push(msgArray[i])
        }
    }


    msgArray = newMsgArray;

    //Arguments passed to command, minus the initial command
    let args = msgArray.slice(1);

    //Quick query of the database to check if the user who sent the message has an entry or not.
    //If they do not create one with a balance of zero
    let checkForProfile = new Promise((resolve, reject) => {
        let fieldsToCheck = ["userId", "balance", "afkWallet", "multiplier", "showcase"]
            PlayerData.findOne(
                {userId: sender.id}, 
                function (err, player){
                    if (player === null){
                        console.log("New Profile");
                        let playerData = new PlayerData({
                            _id: mongoose.Types.ObjectId(),
                            userId: sender.id,
                            balance: "0",
                            afkWallet: "0",
                            multiplier: "1"
                        })
                        playerData.save()
                        .then(result => {
                            console.log("Saved: " + result);
                            resolve();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    } 
                    //WIP script to check if a field is missing from the players database
                    // for (i in fieldsToCheck){
                    //     if (!player[fieldsToCheck[i]]){
                    //         console.log(fieldsToCheck[i])
                    //     }
                    // } 

                    resolve();
                }
            )
        }
    );

    checkForProfile.then((doc) => {
        let commandFile = bot.commands.get(msgArray[0].slice(config.prefix.length));
        if (commandFile && msgArray[0].charAt(0) === config.prefix){
            commandFile.run(bot, message, args);
        }
    });
    //Block of code that executes the correct script in the ./commands folder
})

bot.on("ready", () => {
    console.log("Bot Launched");
    let moneyTicker = require("./scripts/moneyTicker.js");
    moneyTicker.run(bot);
})

//#region Bot Secret Token
bot.login(config.token);
//#endregion