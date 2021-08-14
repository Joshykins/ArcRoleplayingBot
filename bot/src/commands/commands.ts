
import "reflect-metadata";

import {
  ICommandManager,
  parseStatus,
  ICommand,
  permissionLevel
} from "./commandsTypings";

import {
  Message,
  MessageEmbed,
  TextChannel,
  User,
  DMChannel
} from "discord.js";
import { discordBotConfig } from "../util/enviromentalVariables";
import { Bot } from '../index'

//General
import { Ping, Clear, Help, Pong, Roll } from "./generalCommands";
//Debug
import { InitServer } from "./debugCommands";
//Admin
import { SetNotificationsChannel } from "./adminCommands";
//Character
import { CharacterSetField, CreateCharacter, GetCharacter, ListCharacters, RemoveCharacter } from "./characterCommands";
//Admin Character
import { CreateDefaultCharacterField, ListDefaultCharacterFields, RemoveDefaultCharacterField } from "./adminCharacterCommands";

let CommandManager: ICommandManager = {
  prefix: discordBotConfig.customPrefix,
  commandList: [
    //Admin
    SetNotificationsChannel,
    //General
    Ping, 
    Pong, 
    Clear, 
    Help,  
    Roll,
    //Admin Character
    ListDefaultCharacterFields,
    RemoveDefaultCharacterField,
    CreateDefaultCharacterField,
    //Character
    CreateCharacter, 
    RemoveCharacter, 
    ListCharacters, 
    CharacterSetField, 
    GetCharacter
  ],

  printReply: async ( 
    msg: Message,
    text: any
  ) => {
    if (typeof(text) == "string") {
      msg.channel.send(`✣ | ${msg.author} | ✣ \n  ${ text} \n`);
    }
    else {
      msg.reply(text);
    }
    
  },

  printHelp: (
    channel: TextChannel | DMChannel | GroupDMChannel,
    title: string,
    msg: string
  ) => {
    let HelpMessage = new RichEmbed();
    HelpMessage.setAuthor(
      `${Bot.user.username} is giving assistance!`,
      Bot.user.avatarURL
    );
    HelpMessage.setTitle(`${title}`);
    HelpMessage.setDescription(`${msg}`);
    HelpMessage.setColor(0xff0000);
    channel.send(HelpMessage);
  },


  permError: (
    channel: TextChannel | DMChannel | GroupDMChannel,
    target: User
  ) => {
    let HelpMessage = new RichEmbed();
    HelpMessage.setAuthor(
      `${Bot.user.username} is giving assistance!`,
      Bot.user.avatarURL
    );
    HelpMessage.setTitle(`Insufficent Permissions to use command!`);
    HelpMessage.setColor(0xff0000);
    channel.send(target, HelpMessage);
  },


  printCommandHelpPage: (
    channel: TextChannel | DMChannel | GroupDMChannel,
    targetCommand: string
  ) => {
    for (let i = 0; i < CommandManager.commandList.length; i++) {
      let pickedCmd: ICommand = CommandManager.commandList[i];
      if (pickedCmd.command.toLowerCase() == targetCommand.toLowerCase()) {
        
        let HelpMessage = new RichEmbed();
        HelpMessage.setAuthor(
          `${Bot.user.username} is giving assistance!`,
          Bot.user.avatarURL
        );

        HelpMessage.setTitle(
          `Information Reguarding **${
            CommandManager.prefix
          }${pickedCmd.command.toLowerCase()}**.`
        );

        HelpMessage.setColor(discordBotConfig.color);

        HelpMessage.addField(`| Permission Required |`,
          pickedCmd.permissionLevel == 0 ? "User" : "Admin",
          false
        );

        HelpMessage.addField(`\u200B| Description |`,
          pickedCmd.description,
          false
        );

        let syntaxInput: string = `${
          CommandManager.prefix
        }${pickedCmd.command.toLowerCase()} `;
        syntaxInput +
          `${CommandManager.prefix}${pickedCmd.command.toLowerCase()}`;
        if (pickedCmd.syntax) {
          pickedCmd.syntax.forEach((elem, i) => {
            syntaxInput += ` {${elem.syntaxName}}`;
            if (elem.optional) {
              syntaxInput += `(Optional)`;
            }
          });
        }

        HelpMessage.addField(`\u200B| Syntax |`, syntaxInput, true);
        if (pickedCmd.examples) {
          let exampleText = ``
          pickedCmd.examples.forEach((elem, i) => {
            exampleText += `${discordBotConfig.customPrefix}${pickedCmd.command} ${elem.example} \n ${elem.exampleDesc} \n\n`;
          });
          
          HelpMessage.addField( '\u200B\u200B| Examples Below |', exampleText );
        }
        channel.send(HelpMessage);
        return;
      }
    }
  }
};

//Add debug commands, if debug mode.
if(discordBotConfig.debugMode) {
  CommandManager.commandList.unshift(    
    InitServer
    );
}
export { CommandManager };

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

    //Find if admin
    let isAdmin: boolean = msg.author.id == msg.guild.ownerId || 
    msg.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR") ? true : false);


    for (let i = 0; i < CommandManager.commandList.length; i++) {
      let commandName: string = CommandManager.commandList[
        i
      ].command.toLowerCase();
      if (commandName == command) {
        if (
          CommandManager.commandList[i].permissionLevel == permissionLevel.admin
        ) {
          if (isAdmin) {
            CommandManager.commandList[i].action(
              msg.content.split(" "),
              msg.author.id,
              msg
            );
          } else {
            CommandManager.permError(msg.channel, msg.author);
          }
        } else {
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

      helpMessage.setAuthor(
        `Hello, ${msg.author.username}`,
        msg.author.avatarURL
      );
      helpMessage.setTitle(
        `Sorry command not found! Try the **${discordBotConfig.customPrefix}help** command!`
      );
      helpMessage.setDescription(
        `The command can be used to tell you about other commands by doing \n \`${discordBotConfig.customPrefix}help CommandName\`. \n \n It will print out a list of commands by doing !help.`
      );
      helpMessage.setColor(discordBotConfig.color);
      msg.channel.send(helpMessage);
      status = parseStatus.commandNotFound;
    }
  } 
  else {
    status = parseStatus.incorrectPrefx;
  }
  return status;
};
