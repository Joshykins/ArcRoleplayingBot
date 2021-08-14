import { Message, TextChannel, DMChannel, GroupDMChannel, User  } from 'discord.js';

export enum CommandCategory {
  adminCharacterCommands,
  adminGeneralCommands,
  characterCommands,
  debugCommands,
  generalCommands
}

export interface ICommand {
  command : string; //Command's name(what you put in after prefix)
  commandCategory: CommandCategory;
  description?: string; //Description
  syntax?: {syntaxName : string, optional: boolean}[]; //Syntax, each index contains syntax for that position of the command's arguements
  examples?: {exampleDesc : string, example: string}[];
  permissionLevel: permissionLevel;
  action : (argv: string[], user: string, msg: Message) => Promise<void>;
}

export enum parseStatus { commandNotFound = 0, incorrectPrefx = 1, commandRan = 2 }

export enum permissionLevel { user = 0, admin = 1}

export interface ICommandManager {
  prefix: string;
  commandList: ICommand[];
  
  permError: (channel: TextChannel | DMChannel | GroupDMChannel, target: User)=> void;
  printCommandHelpPage: (channel: TextChannel | DMChannel | GroupDMChannel, targetCommand : string) => void;
  printHelp: (channel: TextChannel | DMChannel | GroupDMChannel, title: string, msg?: string) => void;
  printReply: (msg: Message, text: any) => void;

}
