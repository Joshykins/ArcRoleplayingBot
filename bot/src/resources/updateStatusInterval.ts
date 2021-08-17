import { Bot } from "..";
import { Character, Characters } from "../models/Character";
import { discordBotConfig } from "../util/enviromentalVariables";
import { FormatNumberWithCommas } from "./stringUtils";

export const SetupStatusInterval = () => {
    StatusInterval();
    setInterval(StatusInterval, 1000*60*10);
} 
const StatusInterval = async () => {

    const totalStatuses = 3;
    const chosenStatus = Math.floor(Math.random()*totalStatuses+1);
    if(chosenStatus == 1) {
        const CharactersCollection = await Characters();

        const count : number = await CharactersCollection.countDocuments();
        Bot.user.setActivity(
            `${FormatNumberWithCommas(count)} characters.`,
            { type: "WATCHING" }
        );
    }
    else if (chosenStatus == 2) {
        Bot.user.setActivity(
            `${discordBotConfig.customPrefix}roll 4d16`,
            { type: "PLAYING" }
        );
    }
    else if (chosenStatus == 3) {
        Bot.user.setActivity(
            `${discordBotConfig.customPrefix}help being used.`,
            { type: "WATCHING" }
        );
    }


}