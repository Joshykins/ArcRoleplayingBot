import { ObjectId, Collection } from 'mongodb';
import { CharacterFieldDefinition } from './CharacterField';
import { mongoClient } from './connectionSetup';

export interface Server {
    _id?: ObjectId;
    notificationsChannel: string;
    adminRole: string;
    enableNewUserNotification: Boolean;
    defaultFields: CharacterFieldDefinition[];
}

export const Servers = async() : Promise<Collection<Server>> => {
    return mongoClient.db().collection<Server>("Servers");
}
