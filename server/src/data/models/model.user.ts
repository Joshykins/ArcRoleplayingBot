import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import { EnvVariables } from 'src/config/config.server';
import { mongoClient } from 'src/data/connection/data.connect';


export interface User {
    _id?: ObjectId;
    refresh_token: string;
    access_token: string;
}


export const Users = async () : Promise<Collection<User>> => {    
    return mongoClient.db().collection<User>("Users");
}
