import { Message, RichEmbed } from "discord.js";
import { CommandCategory, ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { Bot } from "..";
import { discordBotConfig } from "../util/enviromentalVariables";
import { FormatNumberWithCommas, FormatWithOrdinalSuffix } from "../resources/stringUtils";

export const Ping: ICommand = {
  command: "Ping",
  description: "Plays pong with a ping",
  permissionLevel: permissionLevel.user,
  commandCategory: CommandCategory.generalCommands,
  examples: [
    {
      example: "!ping",
      exampleDesc:
        "Will reply to your message with it's unrestricted interest in playing pong."
    }
  ],
  async action(argv: string[], user: string, msg: Message) {
    //Wow something cool happens here!
    CommandManager.printReply(msg,"Lets play pong!");
  }
};

//Pong Command for Sero
export const Pong: ICommand = {
  command: "Pong",
  description: "Plays ping with a pong",
  permissionLevel: permissionLevel.user,
  commandCategory: CommandCategory.generalCommands,
  examples: [
    {
      example: "",
      exampleDesc:
        "Will reply to your message with it's unrestricted interest in playing ping."
    }
  ],
  async action(argv: string[], user: string, msg: Message) {
    //Wow something cool happens here!
    CommandManager.printReply(msg,"Lets play ping, big boy!");
  }
};

//Pong Command for Sero
export const Roll: ICommand = {
  command: "Roll",
  description: "Rolls dice.",
  permissionLevel: permissionLevel.user,
  commandCategory: CommandCategory.generalCommands,
  examples: [
    {
      example: "",
      exampleDesc:
        "Will give a number between 1 and 20. Same as 1d20 (including 1 and 100)"
    },
    {
      example: " 2d16",
      exampleDesc:
        "Will roll a 2d16. (min 2, max 32)"
    }
  ],
  async action(argv: string[], user: string, msg: Message) {
    //Wow something cool happens here!
    if(argv[1] && argv[1].indexOf("d") != -1) {
      const diceCount = parseInt(argv[1].substr(0, argv[1].indexOf("d")));
      const sides = parseInt(argv[1].substr(argv[1].indexOf("d")+1, argv[1].length));

      if(diceCount > 10) {
        const min = diceCount;
        const max = diceCount*sides;
        const difference = Math.abs(max-min)+1;
        const decision = Math.floor(Math.random()*difference) + min;


        CommandManager.printReply(msg, `Rolled a ${argv[1]} and got ${FormatNumberWithCommas(decision)} \n (Too many die! Not listing individual rolls.)`);
      }
      else {
        let sum : number = 0;
        let throws : number[] = [];
        let throwMessages = ""
        for (let i = 0; i < diceCount; i++) {
          const result = Math.floor(Math.random()*sides)+1;
          throws.push(result);
          sum += result;
          throwMessages += `\n ${FormatWithOrdinalSuffix(i+1)} roll was ${FormatNumberWithCommas(result)}`
        }
        CommandManager.printReply(msg, `Rolled a ${argv[1]} and got ${FormatNumberWithCommas(sum)}.\n ${throwMessages}`);
      }

    }
    else {
        let diceCount = 1;
        let sides = 20;
        let sum : number = 0;
        let throws : number[] = [];
        let throwMessages = ""
        for (let i = 0; i < diceCount; i++) {
          const result = Math.floor(Math.random()*sides)+1;
          throws.push(result);
          sum += result;
          throwMessages += `\n ${FormatWithOrdinalSuffix(i+1)} roll was ${FormatNumberWithCommas(result)}`
        }
        CommandManager.printReply(msg, `Rolled a 1d20 and got ${FormatNumberWithCommas(sum)}.\n ${throwMessages}`);
    }
  }
};

export const Clear: ICommand = {
  command: "Clear",
  description: "Clears the current chat of up to 100 messages.",
  permissionLevel: permissionLevel.admin,
  commandCategory: CommandCategory.generalCommands,
  syntax: [{ syntaxName: "Number of Messages", optional: false }],
  examples: [
    {
      example: " 15",
      exampleDesc: "Removes the last 15 messages in the current chat"
    }
  ],
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
  permissionLevel: permissionLevel.user,
  commandCategory: CommandCategory.generalCommands,
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
  async action(argv: string[], user: string, msg: Message) {
    if (parseInt(argv[1])) {
      let pageIndex = parseInt(argv[1]);
      let commands: string[] = [];
      let paginationNumb: number = 8;
      let pageBefore: boolean = false;
      let pageAfter: boolean = false;
      let commandCategory: CommandCategory = undefined; 
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
            if(commandCategory != elem.commandCategory) {
              commandCategory = elem.commandCategory; 
              let categoryTitle = "";
              let categoryDesc = "";
              
              if(commandCategory == CommandCategory.adminCharacterCommands) {
                categoryTitle = "Admin Character Commands";
                categoryDesc = "Administrative character commands, adding, remove, editing character fields."
              }
              else if ( commandCategory == CommandCategory.adminGeneralCommands ) {
                categoryTitle = "Admin Commands";
                categoryDesc = "General administrative commands."
              }
              else if ( commandCategory == CommandCategory.characterCommands ) {
                categoryTitle = "Character Commands";
                categoryDesc = "Creating, updating, and deleting characters."
              }
              else if ( commandCategory == CommandCategory.debugCommands ) {
                categoryTitle = "Debug Commands";
                categoryDesc = "You saw nothing."
              }
              else if ( commandCategory == CommandCategory.generalCommands ) {
                categoryTitle = "General Commands";
                categoryDesc = "Commands with a miscellaneous purpose."
              }

              categoryTitle = "\n✣ | " + categoryTitle + " | ✣"
              categoryDesc = "​"
              HelpMessage.addBlankField();
              HelpMessage.addField (
                categoryTitle,
                categoryDesc
              );
            }
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
        CommandManager.printReply(msg,HelpMessage);

      }
      else {
        HelpMessage.setDescription("Invalid Page Number");
          
        CommandManager.printReply(msg,HelpMessage);
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
