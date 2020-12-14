import {Client, Message, TextChannel, RichEmbed, MessageReaction, User} from 'discord.js';
import { setupCommandEvents } from './commands/commandEvents';
import { CommandParser} from "./commands/commands";
import { botDB } from './models';
import { discordBotConfig }from "./util/enviromentalVariables";
export const Bot = new Client;


setupCommandEvents();

//connect to DB then login
botDB().then(async res => {
  if(res) {
    await Bot.login(discordBotConfig.token);
    console.log("\x1b[0m",`
     _    ___   ___     ___  ___  
    /_\\  | _ \\ / __|   | _ \\| _ \\ 
   / _ \\ |   /| (__    |   /|  _/ 
  /_/ \\_\\|_|_\\ \\___|   |_|_\\|_|   

  _____________________________________________________________________________

    ___  _____  __    ___   ___   __     ___       ___    ___  _____ 
   /   \\ \\_   \\/ _\\  / __\\ /___\\ /__\\   /   \\     / __\\  /___\\/__   \\
  / /\\ /  / /\\/\\ \\  / /   //  /// \\//  / /\\ /    /__\\// //  //  / /\\/
 / /_///\\/ /_  _\\ \\/ /___/ \\_/// _  \\ / /_//    / \\/  \\/ \\_//  / /   
/___,' \\____/  \\__/\\____/\\___/ \\/ \\_//___,'     \\_____/\\___/   \\/    
                                                                    

    `)
    console.log("\x1b[34m","[ Application started Successfully ] \n ","\x1b[0m");
  }
  else {
    console.error("\x1b[31m","[ Application Failed to connect to Mongo] \n ","\x1b[0m");
  }
})
