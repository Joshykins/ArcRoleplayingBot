import { Message, RichEmbed } from "discord.js";
import { CommandCategory, ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { Bot } from "..";
import { initializeServer } from "../resources/initializeServer";

export const InitServer: ICommand = {
  command: "ResetServer",
  description: "Resets the server to default values, removes all server data.",
  permissionLevel: permissionLevel.admin,
  commandCategory: CommandCategory.debugCommands,
  examples: [
    {
      example: "",
      exampleDesc:
        "Will reset the server"
    }
  ],
  async action(argv: string[], user: string, msg: Message) {
    initializeServer(msg.guild).then(serverMsg => {
      msg.reply(serverMsg);
    });
  }
};


export const CopyServer: ICommand = {
  command: "CopyServer",
  description: "Copies a Server.",
  permissionLevel: permissionLevel.admin,
  commandCategory: CommandCategory.debugCommands,
  examples: [
    {
      example: " id",
      exampleDesc:
        "Selects the server and copies it"
    }
  ],
  async action(argv: string[], user: string, msg: Message) {
    //Find server
    msg.reply(argv[1]);
    const selectedGuild = Bot.guilds.get(argv[1]);
    const targetGuild = msg.guild;
    const channelToPreserve = msg.channel;

    if(selectedGuild) {
      //Remove unecessary channels
      msg.guild.channels.forEach(channel => {
        if(channel != channelToPreserve && channel.id != "840858902156673034") {
          channel.delete();
        }
      })

      //Loop through servers channels
    selectedGuild.channels.forEach(channel => {
        
        msg.guild.createChannel(channel.name);
      }) 
      //@ts-ignore

    }
    else {
      msg.reply("invalid guild");
    }
  }
};