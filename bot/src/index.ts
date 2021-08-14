import {Client, Message, TextChannel,  MessageReaction, User} from 'discord.js';
import { setupCommandEvents } from './commands/commandEvents';
import {  ValidateDatabaseConnection } from './models/connectionSetup';
import { SetupStatusInterval } from './resources/updateStatusInterval';
import { discordBotConfig }from "./util/enviromentalVariables";
import { Log, LogLevels } from './util/logger';
export const Bot = new Client({intents: 123});


setupCommandEvents();

const InitBot = async () => {
  let dbSucceeded = true;
  try {
      dbSucceeded = await ValidateDatabaseConnection();
  }
  catch(err) {
      dbSucceeded = false;
      Log(err, LogLevels.ERROR);
  }

  
  if(!dbSucceeded) {
    Log("Stopping due to database connection issue", LogLevels.ERROR);
    return;
  }

  await Bot.login(discordBotConfig.token);
    SetupStatusInterval();
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

InitBot();