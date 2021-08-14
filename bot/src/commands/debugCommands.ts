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
      CommandManager.printReply(msg,serverMsg);
    });
  }
};
