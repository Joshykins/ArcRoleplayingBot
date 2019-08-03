const Discord = require('discord.js');
import {Client, Message, TextChannel, MessageEmbedProvider, GuildChannel, RichEmbed} from 'discord.js';
import {CommandManager, CommandParser} from "./commands/commands";
export const Bot = new Client;



export const BotColor = 0x3c50ff;
export const BotId = "436050475947655178";
export const ProfilePicture : string = "http://www.womenfitness.net/wp/wp-content/uploads/2016/07/rubyro-1-500x500.jpg";
export const NotificationsChannel : string = "607132389243748382";
export const AdminRole : string = "607162419147702283";

Bot.on('ready', () => {
  console.log(`Logged in as ${Bot.user.tag}!`);
})

Bot.on('message', (msg : Message) => {
  //Lets server restrict
  CommandParser(msg);
  
  if(msg.channel instanceof TextChannel) {
    if(msg.channel.parent.name == "ArcRoleplaying") {
    }
  }
})

Bot.on('guildMemberAdd', member => {

  let welcomeMessage = new RichEmbed();
  welcomeMessage.setAuthor(`Hello, ${member.user.username}!`, member.user.avatarURL);
  welcomeMessage.setTitle(`Welcome to **${member.guild.name}**, Live long and prosper!`);
  welcomeMessage.setDescription(`This server uses the Arc Roleplaying Enviroment by Sero Enterprises#0001, if you are new to using Arc Roleplaying get started by typing !info.`);
  welcomeMessage.setColor(BotColor);
  welcomeMessage.timestamp = new Date();
  let targetChannel : any = member.guild.channels.get(NotificationsChannel);
  //Had to do this to get rid of typing error, even though GuildChannel.send works??
  targetChannel.send(member,welcomeMessage);
})
Bot.on('guildMemberRemove', member => {
  let leaveMessage = new RichEmbed();
  leaveMessage.setAuthor(`Bye, ${member.user.username}!`, member.user.avatarURL);
  leaveMessage.setTitle(`**${member.guild.name}** and I will miss you dearly!`);
  leaveMessage.setColor(BotColor);
  leaveMessage.timestamp = new Date();
  let targetChannel : any = member.guild.channels.get(NotificationsChannel);
  //Had to do this to get rid of typing error, even though GuildChannel.send works??
  targetChannel.send(leaveMessage);
})

Bot.login("NDM2MDUwNDc1OTQ3NjU1MTc4.XUPreA.NuBdmZAkT_vl5oLtL2Nd_ekiz-8");