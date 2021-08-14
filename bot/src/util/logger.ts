import { discordBotConfig } from "./enviromentalVariables";

enum LogLevels {
    ERROR,
    DEBUG,
    INFO
}

const Log = (msg : any, level = LogLevels.DEBUG ) => {
    if(discordBotConfig.logLevel >= level) {
        console.log(msg);
    }
}

export { LogLevels, Log }