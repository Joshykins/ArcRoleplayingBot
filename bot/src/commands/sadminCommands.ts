import { CommandInput } from "../commandResources/commandTypes";
import { InitializeServer } from "../resources/initializeServer";
import { MessageStandard } from "../resources/messageHelper";

export const ReinitServer = async (input: CommandInput) : Promise<void> => {
    const { args, msg} = input;
    const initializeStatus = await InitializeServer(msg.guild);
    
    MessageStandard(msg.channel, initializeStatus);
}