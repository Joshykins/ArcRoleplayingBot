import { Guild } from "discord.js"
import { IServer, Server } from "../models/Server"

export const initializeServer = async(guild: Guild): Promise<string> => {
    const server : IServer= new Server({
        id: guild.id,
        name: guild.name
    });

    try {
        await server.save();
        return "Server Initialized";
    }
    catch(err) {
        console.log(err);
        return "Server Already Initialized";
    }
}