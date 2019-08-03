import { Ping, Clear } from "./generalCommands";
import { ICommandManager, parseStatus, ICommand, permissionLevel } from "./commandsTypings";
import { Message, RichEmbed, TextChannel, User, DMChannel, GroupDMChannel } from "discord.js";
import { ProfilePicture,  BotColor, Bot, AdminRole } from "..";

export let CommandManager : ICommandManager = {
  prefix: "!",
  commandList: [
    Ping,
    Clear
  ],
  permError:(channel: TextChannel | DMChannel | GroupDMChannel, target: User) => {
    let HelpMessage = new RichEmbed();
    HelpMessage.setAuthor(`${Bot.user.username} is giving assistance!`, Bot.user.avatarURL);
    HelpMessage.setTitle(`Insufficent Permissions to use command!`);
    HelpMessage.setColor(0xff0000);
    channel.send(target, HelpMessage)
  },
  printHelp:(channel: TextChannel | DMChannel | GroupDMChannel, targetCommand: string) => {
    for (let i = 0; i < CommandManager.commandList.length; i++) {
      let pickedCmd : ICommand = CommandManager.commandList[i];
      if(pickedCmd.command == targetCommand) {
        let HelpMessage = new RichEmbed();
        HelpMessage.setAuthor(`${Bot.user.username} is giving assistance!`, Bot.user.avatarURL);
        HelpMessage.setTitle(`Information Reguarding **${CommandManager.prefix}${pickedCmd.command.toLowerCase()}**.`);
        HelpMessage.setColor(0xff0000);
        HelpMessage.addField(`${CommandManager.prefix}${pickedCmd.command.toLowerCase()} Permission Required`,
        pickedCmd.permissionLevel == 0 ? "User" : "Admin" ,
        false);
        HelpMessage.addField(`${CommandManager.prefix}${pickedCmd.command.toLowerCase()} Description`,
        pickedCmd.description,
        false);
        let syntaxInput:string = `${CommandManager.prefix}${pickedCmd.command.toLowerCase()} `;
        syntaxInput + `${CommandManager.prefix}${pickedCmd.command.toLowerCase()}`;
        if(pickedCmd.syntax) {
          pickedCmd.syntax.forEach((elem, i) => {
            syntaxInput += ` {${elem.syntaxName}}`;
            if(elem.optional) {
              syntaxInput += `(Optional)`;
            }
          })
        }
        HelpMessage.addField(`Syntax`,
        syntaxInput,
        true);
        if(pickedCmd.examples) {
          pickedCmd.examples.forEach((elem, i) => {
            HelpMessage.addField(`Example ${i+1}`,`${elem.exampleDesc} \n${CommandManager.prefix}${pickedCmd.command.toLowerCase()} ${elem.example}`);
          })
        }
        channel.send(HelpMessage)
        return;
      }
    }
  }
};

export let CommandParser = (msg: Message) => {
  let status: parseStatus;
  if (
    msg.content.slice(0, CommandManager.prefix.length) === CommandManager.prefix
  ) {
    let command = msg.content
      .slice(CommandManager.prefix.length, msg.content.length)
      .split(" ")[0]
      .toLowerCase();
    let commandFound: boolean = false;
    let isAdmin : boolean = msg.member.roles.has(AdminRole);
    for (let i = 0; i < CommandManager.commandList.length; i++) {
      let commandName: string = CommandManager.commandList[i].command.toLowerCase();
      if (commandName == command) {
          if(CommandManager.commandList[i].permissionLevel == permissionLevel.admin) {
            if(isAdmin) {
              CommandManager.commandList[i].action(
                msg.content.split(" "),
                msg.author.id,
                msg
              );
            }
            else {
              CommandManager.permError(msg.channel, msg.author);
            }
          }
          else {
            CommandManager.commandList[i].action(
              msg.content.split(" "),
              msg.author.id,
              msg
            );
          }
        

        commandFound = true;
        break;
      }
    }

    if (commandFound) {
      status = parseStatus.commandRan;
    } else {

      let helpMessage = new RichEmbed();
      helpMessage.setAuthor(`Hello, ${msg.author.username}`, msg.author.avatarURL);
      helpMessage.setTitle("Sorry command not found! Try the **!help** command!");
      helpMessage.setDescription("The command can be used to tell you about other commands by doing \n `!help CommandName`. \n \n It will print out a list of commands by doing !help.");
      helpMessage.setColor(BotColor);
      msg.channel.send(helpMessage);
      status = parseStatus.commandNotFound;
    }
  } else {
    status = parseStatus.incorrectPrefx;
  }

  console.log(status);
  return status;
};
