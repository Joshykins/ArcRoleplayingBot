import { Db, MongoClient, MongoClientOptions } from "mongodb";
import { discordBotConfig } from "../util/enviromentalVariables";
import { Log, LogLevels } from "../util/logger";

let dbClient : Db;
let mongoClient : MongoClient;

export const ValidateDatabaseConnection = async():Promise<boolean> => {
    try {
        if(!discordBotConfig.dbConnectionString) {
            Log("NO CONNECTION STRING GIVEN :(", LogLevels.ERROR);
            return false;
        }
        mongoClient = new MongoClient(
            discordBotConfig.dbConnectionString,
            {} //Options
        );
        mongoClient = await mongoClient.connect();

        return true
    }
    catch(err) {
        Log(err, LogLevels.ERROR);
        return false;
    }
}

export { mongoClient };