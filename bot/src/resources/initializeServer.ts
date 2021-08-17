import { Guild } from "discord.js"
import { Character, Characters } from "../models/Character";
import { DefaultFieldsForServer } from "../models/CharacterField";
import { Servers, Server } from "../models/Server"

export const InitializeServer = async (guild: Guild): Promise<string> => {
    let server : Server= {
        serverId: guild.id,
        notificationsChannel: null,
        adminRole: null,
        enableNewUserNotification: false,
        defaultFields: DefaultFieldsForServer
    };

    const ServersCollection = await Servers();
    const existingServer = await ServersCollection.findOne({serverId: guild.id});


    if(!existingServer) {
        await ServersCollection.insertOne(server);
        return "Server Initialized";
    }
    else {
        const CharactersCollection = await Characters();
        const charactersInServer = CharactersCollection.find({serverId : guild.id});
        const oldServer = ServersCollection.find({serverId: guild.id});

        await CharactersCollection.deleteMany(charactersInServer);
        await ServersCollection.deleteMany(oldServer);

        await ServersCollection.insertOne(server);


        return "Server Was Already Initialized \n \n WARNING: Server Reinitialized, ALL server information reset.";
    }
}