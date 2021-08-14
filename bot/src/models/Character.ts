import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import { CharacterField } from './CharacterField';
import { mongoClient } from './connectionSetup';

export interface Character {
    _id?: ObjectId;
    name: string;
    description: string;
    image: string;
    
    additionalFields: CharacterField[];
    
    //Additional Fields from Creation Process
    referenceName: string;
    ownerId: string;
    serverId: string;
}


export const Characters = async() : Promise<Collection<Character>> => {
    return mongoClient.db().collection<Character>("Characters");
}