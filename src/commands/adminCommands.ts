import {  Message, TextChannel } from "discord.js";
import { ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { discordBotConfig } from "../util/enviromentalVariables";
import { IServer, Server } from "../models/Server";

export const SetNotificationsChannel: ICommand = {
  permissionLevel: permissionLevel.admin,
  command: "notifychannel",
  description: "Gets or Sets the notification channel that will be used for all bot notifcations.",
  examples: [
    {
      example: discordBotConfig.customPrefix+"notifychannel #notifications-channel",
      exampleDesc:
        "This will set the notification channel to #notifications-channel."
    },
    {
        
      example: discordBotConfig.customPrefix+"notifychannel",
      exampleDesc:
        "This will get the current notification channel."
    }
  ],
  syntax: [
        {
            syntaxName: "channel",
            optional: true
        }

    ],
  async action(argv: string[], user: string, msg: Message) {
    try {
        //get server
        let selectedChannel : TextChannel;
        const server : IServer =  await Server.findOne({id : msg.guild.id}).exec();

        if(argv[1]) {
            selectedChannel = msg.guild.channels.get(argv[1].replace(">","").replace("<","").replace("#","")) as TextChannel
            if(selectedChannel) {
                server.notificationsChannel = selectedChannel.id;
                server.save();
                msg.channel.send(`${selectedChannel} Set as notifications channel!`);
                selectedChannel.send(`Channel set as notification channel.`);
            }
            else {
                CommandManager.printHelp(msg.channel, "Invalid channel provided");
            }
        }
        else {
            if(server.notificationsChannel) {
                selectedChannel = msg.guild.channels.get(server.notificationsChannel) as TextChannel;
                msg.reply(`#${selectedChannel} Is the current notification channel`)
            }      
            else {
                CommandManager.printHelp(msg.channel, "No Channel Selected");
            }      
        }
    }
    catch(err) { 
        CommandManager.printHelp(msg.channel,"Something went wrong!");
        console.log(err)
    }
  }
};