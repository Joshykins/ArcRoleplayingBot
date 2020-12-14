import { Message, RichEmbed } from "discord.js";
import { ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { Bot } from "..";
import { User } from "../entities/User";

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
  action(argv: string[], user: string, msg: Message) {
    if (parseInt(argv[1])) {
      let pageIndex = parseInt(argv[1]);
      let commands: string[] = [];
      let paginationNumb: number = 1;
      let pageBefore: boolean = false;
      let pageAfter: boolean = false;
      let HelpMessage = new RichEmbed();
      HelpMessage.setAuthor(
        `${Bot.user.username} is giving assistance!`,
        Bot.user.avatarURL
      );
      HelpMessage.setTitle(`Displaying help page ${pageIndex}.`);
      HelpMessage.setColor(0xff0000);
      if(CommandManager.commandList[(pageIndex - 1) * paginationNumb]) {
        //Page exists    
        CommandManager.commandList.forEach((elem, i) => {
          if (i <= pageIndex - 1 * paginationNumb) {
            pageBefore = true;
          } 
          else if (
            i > (pageIndex - 1) * paginationNumb &&
            i <= pageIndex * paginationNumb
          ) {
            HelpMessage.addField(
              elem.command,
              elem.description ? elem.description : "No Description",
              false
            );
            commands.push(elem.command);
          } else if ( i > pageIndex*paginationNumb) {
            pageAfter = true;
          }
        });
        msg.reply(HelpMessage).then((embed : Message)=> {
          if(pageBefore) {
            embed.react("◀");
          }
          if(pageAfter) {
            embed.react("▶");
          }
        });
      }
      else {
        HelpMessage.setDescription("Invalid Page Number");
          
        msg.reply(HelpMessage);
      }
    } else {
      CommandManager.commandList.forEach(command => {
        if(argv[1] == command.command.toLowerCase()) {
          CommandManager.printCommandHelpPage(msg.channel, command.command);
          return;
        }
      })
      CommandManager.printHelp(msg.channel, "WHOOPS!", `The command '${argv[1] }' is not found!`);
    }
  }
};

export const InitlizeUser: ICommand = {
  command: "inituser",
  permissionLevel: permissionLevel.user,
  action(argv: string[], user: string, msg: Message) {
    let newUser = new User();
    newUser.id = parseInt(user);
    newUser.username = msg.author.username;
    newUser.save().catch(err => {
      console.log(err);
    });
  }
};
