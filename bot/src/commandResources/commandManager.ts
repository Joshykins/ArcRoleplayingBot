import { Message } from "discord.js"
import { GetPermissionLevelOfSender } from "../resources/isAdmin";
import { MessageFailure } from "../resources/messageHelper";
import { discordBotConfig } from "../util/enviromentalVariables"
import { CommandsList } from "./commandList";
import { ICommand } from "./commandTypes";



export const ManageCommand = async (msg: Message) => {
    //Verify msg starts with prefix
    if(!CheckCommandPrefixExists(msg)) {
        return;
    }

    //Get command arguements
    const args = GetCommandArguments(msg);
    if(!args) {
        return;
    }

    //Get command
    const command = GetCommand(args[0]);
    if(!command) {
        MessageFailure(msg.channel, `Command not found! Try '${discordBotConfig.customPrefix}ListCommands' to see all commands!`);
        return;
    }
    
    //Check permissions of command
    const permissionLevel = GetPermissionLevelOfSender(msg);
    if(command.permissionLevel > permissionLevel) {
        return;
    }
    
    msg.delete();
    await command.action({args: args, msg: msg});
}

const GetCommand = (inputCommand : string) : ICommand => {

    return CommandsList.find(command => command.commandName.toLowerCase() === inputCommand.toLowerCase())
}

const CheckCommandPrefixExists = (msg : Message) => {
    const prefix = discordBotConfig.customPrefix;
    if(msg.content.slice(0, prefix.length) === prefix) {
        return true;
    }
    else {
        return false;
    }
}

const GetCommandArguments = (msg : Message) => {
    const prefix = discordBotConfig.customPrefix;
    if(msg.content.slice(0, prefix.length) === prefix) {
        //Prefix matches
        return msg.content.slice(prefix.length, msg.content.length).split(" ");
    }
    else {
        return undefined;
    }
}

