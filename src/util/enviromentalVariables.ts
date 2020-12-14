interface DiscordBotConfig {
    token: string,
    color: number,
    profilePic: string,
    notificationsChannel: string,
    adminRole: string
}
//Enviromental Variables
import * as dotenv from "dotenv";

dotenv.config();

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
    adminRole: "607162419147702283"
} 
