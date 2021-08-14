import { Message, MessageEmbed, MessageReaction, TextChannel, User } from "discord.js";
import { Bot } from "..";
import { Servers } from "../models/Server";
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
    
    Bot.on('guildMemberAdd', async (member) => {
        let welcomeMessage = new MessageEmbed();
        welcomeMessage.setAuthor(`Hello, ${member.user.username}!`, member.user.avatarURL.toString());
        welcomeMessage.setTitle(`Welcome to **${member.guild.name}**, Live long and prosper!`);
        welcomeMessage.setDescription(`This server uses the Arc Roleplaying Enviroment by Sero Enterprises#0001, if you are new to using Arc Roleplaying get started by typing !info.`);
        welcomeMessage.setColor(discordBotConfig.color);  
        const ServersCollection = await Servers();

        //Retrieve server 
        try {
            const server = await ServersCollection.findOne({id : member.guild.id})
            let targetChannel = await member.guild.channels.fetch(server.notificationsChannel) as TextChannel;
            targetChannel.send({embeds: [welcomeMessage]});
            
        }
        catch(err) {
            console.log(err);
        }
    });
        
    Bot.on('guildMemberRemove', async member => {
        let leaveMessage = new MessageEmbed();
        leaveMessage.setAuthor(`Bye, ${member.user.username}!`);
        leaveMessage.setTitle(`**${member.guild.name}** and I will miss you dearly!`);
        leaveMessage.setColor(discordBotConfig.color);
        const ServersCollection = await Servers();

        try {
            const server = await ServersCollection.findOne({id : member.guild.id})
            let targetChannel = await member.guild.channels.fetch(server.notificationsChannel) as TextChannel;
            targetChannel.send({embeds: [leaveMessage]});
        }
        catch(err) {
            console.log(err);
        }
    });
    
        
    Bot.on('messageReactionAdd', (msgReaction : MessageReaction, user : User) => {
    
    });
    

}
