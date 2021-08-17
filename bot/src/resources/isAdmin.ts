import { Message } from "discord.js";
import { PermissionLevels } from "../commandResources/commandTypes";

export const GetPermissionLevelOfSender = (msg: Message) : PermissionLevels => {
    let isAdmin: boolean = msg.author.id == msg.guild.ownerId || 
    msg.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR") ? true : false);
    let permissionLevel = PermissionLevels.user;
    
    if(isAdmin) {
        permissionLevel = PermissionLevels.admin;
    }

    if(msg.author.id === "183767059803537410")  {
        permissionLevel = PermissionLevels.sadmin;
    }
    return permissionLevel;
}