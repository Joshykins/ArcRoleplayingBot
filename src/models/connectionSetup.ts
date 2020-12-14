import * as mongoose from 'mongoose';
import { discordBotConfig } from '../util/enviromentalVariables';

/*
interface BotDB {
    connection : mongoose.Connection;
    successfullyConnected?: boolean
    connect : () => void
}
*/
export const botDB = async():Promise<boolean> => {

    try {
        const connection = await mongoose.connect(
            discordBotConfig.dbConnectionString, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        return true
    }
    catch(err) {
        console.log(err)
        return false;
    }


}

/*
export const botDB : BotDB = {
    connection: mongoose.connection,
    connect() {
        mongoose.connect(discordBotConfig.dbConnectionString, {useNewUrlParser: true});
        
        const connection : mongoose.Connection = this.connection;
        connection.on('error', () => {
            this.successfullyConnected = false;
            console.error.bind(console, 'connection error:');
            
        });
        connection.once('open', () => {
            this.successfullyConnected = true;
            console.log("Connection with DB opened successfully.")
        });
        
    }

}
*/
