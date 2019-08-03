import { Message } from "discord.js";
import { ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { Bot } from "..";

export const Ping: ICommand = {
  permissionLevel: permissionLevel.user,
  command: "Ping",
  description: "Plays pong with a ping",
  examples: [
    {
      example: "!ping",
      exampleDesc:
        "Will reply to your message with it's unrestricted interest in playing pong."
    }
  ],
  action(argv: string[], user: string, msg: Message) {
    //Wow something cool happens here!
    msg.reply("Lets play pong!");
  }
};

export const Clear: ICommand = {
  command: "Clear",
  description: "Clears the current chat of up to 100 messages.",
  syntax: [{ syntaxName: "Number of Messages", optional: false }],
  examples: [
    {
      example: " 15",
      exampleDesc: "Removes the last 15 messages in the current chat"
    }
  ],
  permissionLevel: permissionLevel.admin,
  action(argv: string[], user: string, msg: Message) {
    //Wow something cool happens here!
    if (parseInt(argv[1])) {
      let messageCountToDelete: number;
      if (parseInt(argv[1]) >= 100) {
        messageCountToDelete = 100;
      } else if (parseInt(argv[1]) <= 0) {
        messageCountToDelete = 1;
      } else {
        messageCountToDelete = parseInt(argv[1]);
      }
      msg.channel.bulkDelete(messageCountToDelete).catch(err => {
        console.log(err);
      });
    } else {
      CommandManager.printHelp(msg.channel, Clear.command);
    }
  }
};

