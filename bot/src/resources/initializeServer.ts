import { Guild } from "discord.js"
import { Character } from "../models/Character";
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
        //Remove characters,
        try {

            const charactersInServer = Character.find({serverId: guild.id});
            const oldServer = Server.find({id: guild.id});
    
            //Remove Server
    
            await oldServer.deleteMany().exec();
            await charactersInServer.deleteMany().exec();
            
            //Reinitalize
            const server : IServer= new Server({
                id: guild.id,
                name: guild.name
            });
            await server.save();
            return "Server Was Already Initialized \n \n WARNING: Server Reinitialized, ALL server information reset.";
        }
        catch(err) {
            console.log(err);
            return "Something went wrong in reintialization";
        }
    }
}