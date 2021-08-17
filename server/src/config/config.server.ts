//Enviromental Variables
import * as dotenv from "dotenv";
import { LogLevels } from "src/util/logger";

dotenv.config();

let logLevelEnv : string = process.env.LOG_LEVEL || "DEBUG" 
let logLevel : LogLevels;

if(logLevelEnv == "ERROR") {


    logLevel = LogLevels.ERROR;
}
else if(logLevelEnv == "DEBUG") {
    
    //always log all
    logLevel = LogLevels.DEBUG;
}
else {
    
    //always log all
    logLevel = LogLevels.INFO;
}




export const EnvVariables = {
    port: process.env.PORT || 4000,
    dbConnectionString : process.env.CONNECTION_STRING,
    dbName : process.env.DB_NAME,
    logLevel : logLevel,
    signature: process.env.SIGNATURE || " josh's autograph /;) ",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}
