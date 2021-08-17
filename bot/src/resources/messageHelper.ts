import { Message, MessageEmbed, TextBasedChannels } from "discord.js"
import { discordBotConfig } from "../util/enviromentalVariables";
export const MessageStandard = async (
    channel: TextBasedChannels, 
    message: string,
    title?: string
    ) : Promise<void> => {
    let embed = new MessageEmbed();
    embed.setColor(discordBotConfig.color);
    embed.setDescription(message);
    if(title) {
        embed.setTitle(title);
    }

    channel.send({embeds: [embed]});
}

export const MessageFailure = async (channel: TextBasedChannels, message: string) : Promise<void> => {
    let embed = new MessageEmbed();
    embed.setColor(0xff0000);
    embed.setDescription(message);

    channel.send({embeds: [embed]});
}