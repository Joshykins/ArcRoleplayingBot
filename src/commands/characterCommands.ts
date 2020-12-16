import { ICommand, permissionLevel } from "./commandsTypings";
import { CommandManager } from "./commands";
import { discordBotConfig } from "../util/enviromentalVariables";
import { Message, RichEmbed } from "discord.js";
import { Character, ICharacter } from "../models/Character";
import { Bot } from "..";
import { IServer, Server } from "../models/Server";
import { isAdmin } from "../resources/isAdmin";

export const CreateCharacter: ICommand = {
    permissionLevel: permissionLevel.user,
    command: "CreateCharacter",
    description: "Creates a new character with the specified reference id.",
    examples:[
        {
            example: "CreateCharacter bobross",
            exampleDesc: "Creates a new character with the identifier of 'bobross'. The identifier will be used to reference the character when updating or deleting it."
        }
    ],
    syntax: [
        {
            syntaxName: "identifier",
            optional: false
        }
    ],
    async action(argv: string[], user: string, msg: Message) {
        //Check if chara exists
        if(!argv[1]) {
            msg.reply("Provide an identifier.");
            return;
        }

        //Make sure there isn't more than one identifier
        if(argv[2]) {
            msg.reply("Identifiers can not contain spaces.");
            return;
        }

        try {        

            const foundChara = await Character.findOne({referenceName: argv[1]}).exec();

            if(foundChara) {
                msg.reply(`Character with the identifier '${argv[1]}' exists already. Use a different one.`)
                return;
            }
            
            const character : ICharacter = new Character({
                referenceName: argv[1],
                ownerId: msg.author.id,
                serverId: msg.guild.id,
                'customfield': "test123GOD"
            })

            character.save();

            msg.reply("Character created successfully!");
        }
        catch(err) {
            CommandManager.printHelp(msg.channel,"Something went wrong!");
            console.log(err)
        }

    }
}



export const RemoveCharacter: ICommand = {
    permissionLevel: permissionLevel.user,
    command: "RemoveCharacter",
    description: "Remove a character with the specified reference id.",
    examples:[
        {
            example: "RemoveCharacter bobross",
            exampleDesc: "Removes a character with the identifier of 'bobross'."
    }
    ],
    syntax: [
        {
            syntaxName: "identifier",
            optional: false
        }
    ],
    async action(argv: string[], user: string, msg: Message) {
        //Check if chara exists
        if(!argv[1]) {
            msg.reply("Provide an identifier.");
            return;
        }
        try {
            const foundChara = await Character.findOne({referenceName: argv[1]}).exec();
            const server : IServer =  await Server.findOne({id : msg.guild.id}).exec();

            if(!foundChara) {
                msg.reply(`Character does not exist.`)
                return;
            }
            
            if( await isAdmin(msg) || msg.author.id == foundChara.ownerId) {
                foundChara.remove();
                msg.reply("Character removed successfully!");
                return;
            }
            else {
                msg.reply("You do not have permission to remove this character.");
            }

        }
        catch(err) {
            CommandManager.printHelp(msg.channel,"Something went wrong!");
            console.log(err)
        }

    }
}


export const ListCharacters: ICommand = {
    permissionLevel: permissionLevel.user,
    command: "ListCharacters",
    description: "List all characters with their name and identifier.",
    examples:[
        {
            example: "ListCharacters",
            exampleDesc: "Lists all the characters stored for the server, with their names and identifiers."
        }
    ],
    async action(argv: string[], user: string, msg: Message) {
        try {
            let CharacterMessage = new RichEmbed();
            CharacterMessage.setAuthor(
                `${Bot.user.username} is giving assistance!`,
                Bot.user.avatarURL
            )
            CharacterMessage.setTitle("Character List");
            CharacterMessage.setColor(discordBotConfig.color);
            let charactersListMessage = ""
            let characters = await Character.find({serverId: msg.guild.id});
            characters.forEach(character => {
                charactersListMessage += `______\nID: ${character.referenceName} \n Name: ${character.name || "(No Name For Character)"}\n Owner: ${msg.guild.members.get(character.ownerId) || "(Owner Left Server)"}\n`
            })
            if(characters.length != 0) {
                CharacterMessage.setDescription(charactersListMessage);
            }
            else {
                CharacterMessage.setDescription("No characters in the server :(");
            }
            msg.channel.send(CharacterMessage);
        }
        catch(err) {
            CommandManager.printHelp(msg.channel,"Something went wrong!");
            console.log(err)
        }

    }
}


export const CharacterSetField: ICommand = {
    permissionLevel: permissionLevel.user,
    command: "SetCharacterField",
    description: "Sets a field of the character.",
    examples:[
        {
            example: "setcharacterfield {identifier} name Basil V. Sterling",
            exampleDesc: "Sets a characters name."
        },
        {
            example: "setcharacterfield {identifier} outwardage 20s",
            exampleDesc: "Sets a character's outward age."
        },
        {
            example: "setcharacterfield {identifier} origin Kaziria",
            exampleDesc: "Sets a character's origin."
        },
        {
            example: "setcharacterfield {identifier} race Elf",
            exampleDesc: "Sets a character's race."
        },
        {
            example: "setcharacterfield {identifier} sex Female",
            exampleDesc: "Sets a character's sex."
        },
        {
            example: "setcharacterfield {identifier} height 6'6\"",
            exampleDesc: "Sets a character's height."
        },
        {
            example:"{identifier} beautifulness 10\"",
            exampleDesc: "Sets a character's beautifulness."
        },
        {
            example: "setcharacterfield {identifier} description A lushus elven queen.",
            exampleDesc: "Sets a character's description."
        },
        {
            example: "setcharacterfield {identifier} image media.discordapp.net/attachments/688652229669945354/732683076190208010/brocktherock.png",
            exampleDesc: "Sets a character's image."
        }
        
    ],
    syntax: [
        {
            syntaxName: "identifier",
            optional: false
        },
        {
            syntaxName: "field",
            optional: false
        },
        {
            syntaxName: "fieldinfo",
            optional: false
        },
    ],
    async action(argv: string[], user: string, msg: Message) {
        //Retrieve Character
        try {

            //Checks if identifier exists
            if(!argv[1]) {
                msg.reply("Provide a character identifier.")
            }

            //Gets characters(Errors if does not exist)
            let character = await Character.findOne({referenceName: argv[1]});
            if(!character) {
                msg.reply("Invalid character");
                return;
            }
            
            //Gets the field we are editing
            let field = argv[2].toLowerCase();

            //Gets the value we are going to set to the field
            let remainderString: string = "";
            argv.forEach((arg, i) => {
                if(i > 2) {
                    remainderString += arg + " "
                }
            })

            //Check permissions

            if( !(await isAdmin(msg) || msg.author.id == character.ownerId) ) {
                msg.reply("Character is not yours! You can't edit it!");
                return;
            }

            //Compares fields to valid fields, and sets the field if found.(Errors if the field does not exist.)
            switch (field) {
                case "name":
                    character.update({name: remainderString}).exec();
                    msg.reply("Character Updated!");
                    break;
                case "description":
                    character.update({description: remainderString}).exec();
                    msg.reply("Character Updated!");
                    break;
                case "image":
                    character.update({image: remainderString}).exec();
                    msg.reply("Character Updated!");
                    break;

                default:
                    msg.reply("Field not found.")
                    break;
            }
            
        }
        catch(err) {
            CommandManager.printHelp(msg.channel,"Something went wrong!");
            console.log(err)
        }
        
    }

}



export const GetCharacter: ICommand = {
    permissionLevel: permissionLevel.user,
    command: "GetCharacter",
    description: "Gets a character with the specified reference id.",
    examples:[
        {
            example: "bobross",
            exampleDesc: "Gets a character with the identifier of 'bobross'."
    }
    ],
    syntax: [
        {
            syntaxName: "identifier",
            optional: false
        }
    ],
    async action(argv: string[], user: string, msg: Message) {
        //Check if chara exists
        if(!argv[1]) {
            msg.reply("Provide an identifier.");
            return;
        }

        try {
            const character = await Character.findOne({referenceName: argv[1]}).exec();
            const server : IServer =  await Server.findOne({id : msg.guild.id}).exec();

            if(!character) {
                msg.reply(`Character does not exist.`)
                return;
            }
            
            let characterMessage = new RichEmbed();
            characterMessage.setTitle(`${character.name || "(No Name)"}`);
            characterMessage.setAuthor(
                `Character Sheet!`,
                character.image ? character.image : Bot.user.avatarURL
              );
            characterMessage.addField('Name', character.name || "(No Name)", true);
            if(character.image) {
                characterMessage.setImage(character.image);
            }
            characterMessage.setDescription(`${character.description ? character.description : "(No Description)"}`)

            msg.channel.send(characterMessage);
            
            if( await isAdmin(msg) || msg.author.id == character.ownerId) {
                //Display hidden fields
                return;
            }


        }
        catch(err) {
            CommandManager.printHelp(msg.channel,"Something went wrong!");
            console.log(err)
        }

    }
}