import { Message, MessageReaction, RichEmbed, TextChannel, User } from "discord.js";
import { Bot } from "..";
import { IServer, Server } from "../models/Server";
import { discordBotConfig } from "../util/enviromentalVariables";
import { CommandManager, CommandParser } from "./commands";

export const setupCommandEvents = () => {

    Bot.on('ready', () => {
        console.log("\x1b[36m","[","\x1b[0m",Bot.user.tag,"\x1b[36m","Connection Established ]");
    });
    
    
    Bot.on('message', (msg : Message) => {
        //Lets server restrict
        CommandParser(msg);
    });
    
    Bot.on('guildMemberAdd', (member ) => {
        let welcomeMessage = new RichEmbed();
        welcomeMessage.setAuthor(`Hello, ${member.user.username}!`, member.user.avatarURL);
        welcomeMessage.setTitle(`Welcome to **${member.guild.name}**, Live long and prosper!`);
        welcomeMessage.setDescription(`This server uses the Arc Roleplaying Enviroment by Sero Enterprises#0001, if you are new to using Arc Roleplaying get started by typing !info.`);
        welcomeMessage.setColor(discordBotConfig.color);
        welcomeMessage.timestamp = new Date();     
        //Retrieve server 
        try {
            Server.findOne({id : member.guild.id}).exec().then(server => {
                let targetChannel = member.guild.channels.get(server.notificationsChannel) as TextChannel;
                targetChannel.send(member, welcomeMessage);
            });
        }
        catch(err) {
            console.log(err);
        }
    });
        
    Bot.on('guildMemberRemove', member => {
        let leaveMessage = new RichEmbed();
        leaveMessage.setAuthor(`Bye, ${member.user.username}!`, member.user.avatarURL);
        leaveMessage.setTitle(`**${member.guild.name}** and I will miss you dearly!`);
        leaveMessage.setColor(discordBotConfig.color);
        leaveMessage.timestamp = new Date();
        try {
            Server.findOne({id : member.guild.id}).exec().then(server => {
                let targetChannel = member.guild.channels.get(server.notificationsChannel) as TextChannel;
                targetChannel.send(member, leaveMessage);
            });
        }
        catch(err) {
            console.log(err);
        }
    });
    
        
    Bot.on('messageReactionAdd', (msgReaction : MessageReaction, user : User) => {
    
    });
    

}
