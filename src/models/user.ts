import { FieldType, Meta, Mixin} from "@lib/models/ModelAdaptor.types";
import { appStore } from "./stores";

export const user:Meta = {
    name: 'user',
    plural: 'users',
    database: appStore.name,
    schema: {
        email: {
            type: FieldType.String,
            required: true,
            unique: true
        },
        name: {
            type: FieldType.String,
        },
        avatar: {
            type: FieldType.String,
        },
        bio: {
            type: FieldType.String,
            _ui_:{
                multiline: true
            }
        },
        firstName: {
            type: FieldType.String,
        },
        lastName: {
            type: FieldType.String,
        },
        title: {
            type: FieldType.String,
        },
        type: {
            type: FieldType.String,
            required: true
        },
        status: {
            type: FieldType.String,
            required: true
        },
        projects: [{
            type: FieldType.ObjectId,
            ref: 'project'
        }],
        tasks:[{
            type: FieldType.ObjectId,
            ref: 'task'
        }],
        comments: {
            type: FieldType.Array
        },
        files: {
            type: FieldType.Array
        },
        settings: {
            type: FieldType.Object
        },
        profileId: {
            type: FieldType.ObjectId,
            ref: 'profile'
        },
        createdAt: {
            type: FieldType.Date
        },
        updatedAt: {
            type: FieldType.Date
        }
    }
}