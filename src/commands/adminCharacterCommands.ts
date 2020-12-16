import { ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { discordBotConfig } from "../util/enviromentalVariables";
import { Message, RichEmbed } from "discord.js";
import { Character, ICharacter } from "../models/Character";
import { Bot } from "..";
import { IServer, Server } from "../models/Server";
import { isAdmin } from "../resources/isAdmin";
import { defaultOrderPriority } from "../models/CharacterField";

export const ListDefaultCharacterFields: ICommand = {
    permissionLevel: permissionLevel.admin,
    command: "ListDefaultCharacterFields",
    description: "Lists Default Character Fields.",
    examples:[
        {
            example: "",
            exampleDesc: "Displays a list of all default fields that are displayed in characters list."
        }
    ],
    async action(argv: string[], user: string, msg: Message) {
        try {        
            const server = await  Server.findOne({id: msg.guild.id});
            let DefaultFieldMessage = new RichEmbed();
            DefaultFieldMessage.setAuthor(
                `Listing Default Fields!`,
                Bot.user.avatarURL
            );
            DefaultFieldMessage.setColor(discordBotConfig.color);
            DefaultFieldMessage.setDescription("A list of all default fields for characters.");
            server.defaultFields.forEach(defaultField => {
                DefaultFieldMessage.addField(`${defaultField.title}`, `Public: ${defaultField.public} | Numeric: ${defaultField.numeric} | OrderPriority: ${defaultField.orderPriority}`)
            });
            msg.channel.send(DefaultFieldMessage);
        }
        catch(err) {
            CommandManager.printHelp(msg.channel,"Something went wrong!");
            console.log(err)
        }
    }
}

export const RemoveDefaultCharacterField: ICommand = {
    permissionLevel: permissionLevel.admin,
    command: "RemoveDefaultCharacterField",
    description: "Removes a Default Character Field.",
    examples:[
        {
            example: "Height",
            exampleDesc: "Removes height from the default character fields"
        }
    ],
    syntax:[
        {
            syntaxName:"FieldName",
            optional: false
        }
    ],
    async action(argv: string[], user: string, msg: Message) {
        if(!argv[1]) {
            msg.reply("Provide a field to be deleted.");
            return;
        }
        try {        
            const server = await  Server.findOne({id: msg.guild.id});
            let fieldFound;
            let DeleteFieldMessage = new RichEmbed();

            server.defaultFields.forEach( (defaultField, i )=> {
                if(defaultField.title == argv[1]) fieldFound = i; 
            });

            if(!fieldFound) {
                msg.reply(`Field '${argv[1]}' not found.`);
                return;
            }

            server.defaultFields.splice(fieldFound, 1);
            server.save();
            DeleteFieldMessage.setAuthor(
                `Removed Field!`,
                Bot.user.avatarURL
            );
            DeleteFieldMessage.setColor(0xff0000);
            DeleteFieldMessage.setDescription(`The field '${argv[1]}' was successfully removed from the server!`);
            msg.channel.send(DeleteFieldMessage);
        }
        catch(err) {
            CommandManager.printHelp(msg.channel,"Something went wrong!");
            console.log(err)
        }
    }
}



export const CreateDefaultCharacterField: ICommand = {
    permissionLevel: permissionLevel.admin,
    command: "CreateDefaultCharacterField",
    description: "Adds a Default Character Field.",
    examples:[
        {
            example: "Height true false",
            exampleDesc: "Adds 'Height' to the default character fields. It is public facing(displays on get character/character list), not numeric, and has the default order priority of 1."
        },
        {
            example: "Sexyness true true 3",
            exampleDesc: "Adds 'Sexyness' to the default character fields. It is public facing(displays on get character/character list), Numeric, and has the order priority of 3."
        }
    ],
    syntax:[
        {
            syntaxName:"FieldName",
            optional: false
        },
        {
            syntaxName:"Public",
            optional: false
        },
        {
            syntaxName:"Numeric",
            optional: false
        },
        {
            syntaxName:"OrderPriority",
            optional: true
        }
    ],
    async action(argv: string[], user: string, msg: Message) {
        if(!argv[1]) {
            msg.reply("Provide a field to be added.");
            return;
        }
        
        if(!argv[2] || !(argv[2] == 'true' || argv[2] == 'false')) {
            msg.reply("Provide specify if the field is public or not.(true or false)");
            return;
        }
        
        if(!argv[3] || !(argv[3] == 'true' || argv[3] == 'false')) {
            msg.reply("Provide specify if the field is numeric or not.(true or false)");
            return;
        }

        if(argv[4] && !Number(argv[4])) {   
            msg.reply("Enter a valid number for the order priority.");
            return;
        }

        try {        
            //Check if field already exists.
            const server = await  Server.findOne({id: msg.guild.id});
            let fieldFound;
            let AddFieldMessage = new RichEmbed();

            server.defaultFields.forEach( (defaultField, i )=> {
                if(defaultField.title == argv[1]) fieldFound = i; 
            });

            if(fieldFound) {
                //Overwrite?
                msg.reply(`Field '${argv[1]}' already exists.`);
                return;
            }

            //adding field
            server.defaultFields.push({
                title: argv[1],
                public: argv[2] == 'true' ? true : false,
                numeric: argv[3] == 'true' ? true : false,
                orderPriority: argv[4] == argv[4] ? Number(argv[4]) : defaultOrderPriority
            })

            server.save();
            AddFieldMessage.setAuthor(
                `Removed Field!`,
                Bot.user.avatarURL
            );
            AddFieldMessage.setColor(discordBotConfig.color);
            AddFieldMessage.setDescription(`The field '${argv[1]}' was successfully added to the server!`);
            msg.channel.send(AddFieldMessage);
        }
        catch(err) {
            CommandManager.printHelp(msg.channel,"Something went wrong!");
            console.log(err)
        }
    }
}
