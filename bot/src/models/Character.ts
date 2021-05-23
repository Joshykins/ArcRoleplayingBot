import { model, Schema, Model, Document } from 'mongoose';
import { CharacterField } from './CharacterField';


//TODO: ADD BEAUTIFULNESS TO DEFAULT DYNAMICALLY(NOT STATIC) FIELD FOR TEST FIELD

export interface ICharacter extends Document {
    name: string,
    description: string,
    image: string,
    
    //
    additionalFields: CharacterField[]
    

    //Additional Fields from Creation Process
    referenceName: string,
    ownerId: string,
    serverId: string,
    currency: number
}

const CharacterSchema: Schema = new Schema({
    name: {type: String, required: false},
    description: {type: String, required: false},
    image: {type: String, required: false},
    //Additional Fields
    additionalFields: {type: Array, required: false},

    //Application-Required Fields
    referenceName: {type: String, required: true},
    ownerId: {type: String, required: true},
    serverId: {type: String, required: true},
    currency: {type: Number, required: false, default: 0}
})


export const Character: Model<ICharacter> = model('Characters', CharacterSchema);