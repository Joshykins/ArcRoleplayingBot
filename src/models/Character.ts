import { model, Schema, Model, Document } from 'mongoose';


export interface ICharacter extends Document {
    name: string,
    outwardAge: string,
    origin: string,
    race: string,
    sex: string,
    height: string,
    beautifulness: string,
    description: string,
    image: string,
    

    //Additional Fields from Creation Process
    referenceName: string,
    ownerId: string,
    serverId: string,
    currency: number
}

const CharacterSchema: Schema = new Schema({
    name: {type: String, required: false},
    outwardAge: {type: String, required: false},
    origin: {type: String, required: false},
    race: {type: String, required: false},
    sex: {type: String, required: false},
    height: {type: String, required: false},
    beautifulness: {type: String, required: false},
    description: {type: String, required: false},
    image: {type: String, required: false},

    //Additional Fields from Creation Process
    referenceName: {type: String, required: true},
    ownerId: {type: String, required: true},
    serverId: {type: String, required: true},
    currency: {type: Number, required: false, default: 0}
})


export const Character: Model<ICharacter> = model('Characters', CharacterSchema);