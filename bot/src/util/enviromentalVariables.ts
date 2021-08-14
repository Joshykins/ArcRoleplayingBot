//Enviromental Variables
import * as dotenv from "dotenv";
import { LogLevels } from "./logger";


interface DiscordBotConfig {
    token: string,
    color: number,
    profilePic: string,
    notificationsChannel: string,
    adminRole: string,
    customPrefix: string, 
    dbConnectionString: string,
    debugMode: boolean,
    logLevel: LogLevels
}

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




//Color type import
let processColor : any = process.env.BOT_COLOR;
if(processColor) {
    processColor = Number(processColor);
}

export const discordBotConfig : DiscordBotConfig = {
    token: process.env.BOT_TOKEN,
    color: processColor || 0x3c50ff,
    profilePic:"http://www.womenfitness.net/wp/wp-content/uploads/2016/07/rubyro-1-500x500.jpg",
    notificationsChannel: "607132389243748382",
    adminRole: "607162419147702283",
    customPrefix: process.env.CUSTOM_PREFIX || "!",
    dbConnectionString: process.env.DB_STRING,
    debugMode: process.env.DEBUG == "true",
    logLevel: logLevel

} 
