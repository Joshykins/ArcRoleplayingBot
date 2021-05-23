import { Message } from "discord.js";

export const isAdmin = async(msg: Message) => {
    let isAdmin: boolean = msg.author.id == msg.guild.ownerID || 
    msg.member.roles.find(role => role.hasPermission('ADMINISTRATOR')) ? true : false;

    return isAdmin;
}