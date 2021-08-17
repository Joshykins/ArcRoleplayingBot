import { Message } from "discord.js";

export enum CommandCategory {
    adminCharacterCommands,
    adminGeneralCommands,
    characterCommands,
    debugCommands,
    generalCommands,
    unAssigned
}

export enum PermissionLevels { user = 0, admin = 1, sadmin = 2}

export interface CommandInput {
  args : string[],
  msg: Message
}

export interface ICommand {
  commandName : string; //Command's name(what you put in after prefix)
  commandCategory?: CommandCategory;
  description?: string; //Description
  permissionLevel?: PermissionLevels;
  action : (input: CommandInput) => Promise<void>;
}