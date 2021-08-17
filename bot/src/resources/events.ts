import { Interaction, Message, MessageReaction, User } from "discord.js";
import { Bot } from "..";
import { ManageCommand } from "../commandResources/commandManager";
import { Log } from "../util/logger";
import { InitializeServer } from "./initializeServer";

export const setupEvents = () => {
    
    //Bot Starts
    Bot.on('ready', () => {
        console.log("\x1b[36m","[","\x1b[0m",Bot.user.tag,"\x1b[36m","Connection Established ]");
    });


    //Message sent to server
    Bot.on("messageCreate", async (msg : Message) => {
        ManageCommand(msg);
    });

    //Bot Added To Server
    Bot.on("guildCreate", guild => {
        Log("Joined a new server: " + guild.name);
        
        Log(InitializeServer(guild));
    })

    //Bot Removed From Server
    Bot.on("guildDelete", guild => {
        Log("Left a server: " + guild.name);
        //remove from guildArray
    })


    //Person Joins Server
    Bot.on('guildMemberAdd', async (member) => {

    })
    

    //Person Leaves Server
    Bot.on('guildMemberRemove', async (member) => {
        
    })

    //Person Reacts
    Bot.on('messageReactionAdd', (msgReaction : MessageReaction, user : User) => {
        console.log("test reaction");
    });
}