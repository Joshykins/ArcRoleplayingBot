import { Message, RichEmbed } from "discord.js";
import { ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { Bot } from "..";
import { initializeServer } from "../resources/initializeServer";

export const InitServer: ICommand = {
  permissionLevel: permissionLevel.admin,
  command: "initServer",
  description: "Inits a server",
  examples: [
    {
      example: "!initServer",
      exampleDesc:
        "Will init the server to the db."
    }
  ],
  async action(argv: string[], user: string, msg: Message) {
    //Wow something cool happens here!
    msg.reply("STUFF BEING DONE!");
    initializeServer(msg.guild).then(serverMsg => {
      msg.reply(serverMsg);
    });
  }
};