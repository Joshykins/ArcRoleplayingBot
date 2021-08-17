import { Roll } from "../commands/generlCommands";
import { ListCommands, Ping, Pong } from "../commands/miscCommands";
import { ReinitServer } from "../commands/sadminCommands";
import { CommandCategory, CommandInput, ICommand, PermissionLevels } from "./commandTypes";

let CommandsList : ICommand[] = new Array();


const AddCommand = (
    name : string, 
    action : (input: CommandInput) => Promise<void>,
    commandCategory?: CommandCategory,
    description?: string,
    permissionLevel?: PermissionLevels,
) : void => {
    //Default command values are set here, if none provided
    let command :ICommand = {
        commandName: name,
        action: action,
        commandCategory: commandCategory ? commandCategory : CommandCategory.unAssigned,
        description: description ? description : "No Description",
        permissionLevel: permissionLevel ? permissionLevel : PermissionLevels.admin
    } 

    CommandsList.push(command);
};

//Misc Commands
AddCommand("Ping", Ping, undefined, "Plays pong with a ping!", PermissionLevels.user);
AddCommand("Pong", Pong, undefined, "Plays ping with a pong!", PermissionLevels.user);
AddCommand("ListCommands", ListCommands, undefined, "List all the commands!", PermissionLevels.user);

//General Commands
AddCommand("Roll", Roll, CommandCategory.generalCommands, "Rolls a dice", PermissionLevels.user);

//Super Admin Commands
AddCommand("ResetServer", ReinitServer, undefined, undefined, PermissionLevels.sadmin);

export { CommandsList };