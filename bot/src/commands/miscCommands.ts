import { CommandsList } from "../commandResources/commandList";
import { CommandInput, PermissionLevels } from "../commandResources/commandTypes";
import { MessageStandard } from "../resources/messageHelper";
import { discordBotConfig } from "../util/enviromentalVariables";

export const Ping = async (input: CommandInput) : Promise<void> => {
    const { args, msg} = input;

    MessageStandard(msg.channel, "Lets play pong!");
}

export const Pong = async (input: CommandInput) : Promise<void> => {
    const { args, msg} = input;

    MessageStandard(msg.channel, "Lets play ping!");
}

export const ListCommands = async (input: CommandInput) : Promise<void> => {
    const { args, msg} = input;
    let commandNames : string = "";
    CommandsList.forEach(command => {
        if(command.permissionLevel == PermissionLevels.sadmin && !discordBotConfig.debugMode) {
            return;
        }
        commandNames += `-> ${command.commandName} \n`;
    })

    MessageStandard(msg.channel, commandNames, "Listing Available Commands");
}