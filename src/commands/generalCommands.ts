import { Message, RichEmbed } from "discord.js";
import { ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { Bot } from "..";
import { discordBotConfig } from "../util/enviromentalVariables";

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
  async action(argv: string[], user: string, msg: Message) {
    //Wow something cool happens here!
    msg.reply("Lets play pong!");
  }
};

//Pong Command for Sero
export const Pong: ICommand = {
  permissionLevel: permissionLevel.user,
  command: "Pong",
  description: "Plays ping with a pong",
  examples: [
    {
      example: "",
      exampleDesc:
        "Will reply to your message with it's unrestricted interest in playing ping."
    }
  ],
  async action(argv: string[], user: string, msg: Message) {
    //Wow something cool happens here!
    msg.reply("Lets play ping, big boy!");
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
  async action(argv: string[], user: string, msg: Message) {
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
      CommandManager.printCommandHelpPage(msg.channel, Clear.command);
    }
  }
};

export const Help: ICommand = {
  command: "Help",
  description: "Displays all commands or gives help on a specific command.",
  syntax: [
    { syntaxName: "PageNumber", optional: true },
    { syntaxName: "Command", optional: true }
  ],
  examples: [
    {
      example: " ",
      exampleDesc: "Displays all commands on page 1."
    },
    {
      example: " 2",
      exampleDesc: "Displays all commands on page 2."
    },
    {
      example: " clear",
      exampleDesc: "Displays information regarding the clear command."
    }
  ],
  permissionLevel: permissionLevel.user,
  async action(argv: string[], user: string, msg: Message) {
    if (parseInt(argv[1])) {
      let pageIndex = parseInt(argv[1]);
      let commands: string[] = [];
      let paginationNumb: number = 8;
      let pageBefore: boolean = false;
      let pageAfter: boolean = false;
      let HelpMessage = new RichEmbed();
      HelpMessage.setAuthor(
        `${Bot.user.username} is giving assistance!`,
        Bot.user.avatarURL
      );
      HelpMessage.setTitle(`Displaying help page ${pageIndex}.`);
      HelpMessage.setColor(discordBotConfig.color);
      if(CommandManager.commandList[(pageIndex - 1) * paginationNumb]) {
        //Page exists    
        CommandManager.commandList.forEach((elem, i) => {

          if (i <= pageIndex - 1 * paginationNumb) {
            pageBefore = true;
          } 
          else if ( i > pageIndex*paginationNumb) {
            pageAfter = true;
          }

          if (
            i >= (pageIndex - 1) * paginationNumb &&
            i <= pageIndex * paginationNumb
          ) {
            HelpMessage.addField(
              elem.command,
              elem.description ? elem.description : "No Description",
              false
            );
            commands.push(elem.command);
          }

        });
        if(pageAfter) {
          HelpMessage.setFooter(`Type '${discordBotConfig.customPrefix}help ${pageIndex+1}' to view next page.`)
        }
        else {
          HelpMessage.setFooter(`This is the last page of commands.`);
        }
        msg.reply(HelpMessage);

      }
      else {
        HelpMessage.setDescription("Invalid Page Number");
          
        msg.reply(HelpMessage);
      }
    } else {
      let commandName:string;

      CommandManager.commandList.forEach(command => {
        if(argv[1] && argv[1].toLowerCase() == command.command.toLowerCase()) {
          commandName = command.command;
          
        }
      })
      if(commandName) {
        CommandManager.printCommandHelpPage(msg.channel, commandName.toLowerCase());
      }
      else {
        CommandManager.printCommandHelpPage(msg.channel, "help");
      }
      

    }
  }
};
