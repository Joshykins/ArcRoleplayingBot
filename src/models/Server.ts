import { model, Schema, Model, Document } from 'mongoose';
import { CharacterFieldDefinition, DefaultFieldsForServer } from './CharacterField';

export interface IServer extends Document {
    id: string;
    name: string;
    notificationsChannel: string;
    adminRole: string;
    enableNewUserNotification: Boolean;
    defaultFields: CharacterFieldDefinition[];
}

const ServerSchema: Schema = new Schema({
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    notificationsChannel: {type: String, required: false},
    adminRole: {type: String, required: false},
    enableNewUserNotification: {type: Boolean, required: true, default: false},
    defaultFields: {type: Array, required: false, default: DefaultFieldsForServer}
});

export const Server: Model<IServer> = model('Server', ServerSchema);