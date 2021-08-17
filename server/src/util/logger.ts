import { EnvVariables } from "src/config/config.server";

enum LogLevels {
    ERROR,
    DEBUG,
    INFO
}

const Log = (msg : any, level = LogLevels.DEBUG ) => {
    if(EnvVariables.logLevel >= level) {
        console.log(msg);
    }
}

export { LogLevels, Log }