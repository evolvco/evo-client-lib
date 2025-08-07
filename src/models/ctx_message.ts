import { FieldType, Meta} from "@lib/models/ModelAdaptor.types";
import { appStore } from "./stores";

export const ctx_message:Meta = {
    name: 'ctx_message',
    plural: 'ctx_messages',
    database: appStore.name,
    schema: {
        role: {
            type: FieldType.String,
            required: true,
            index:true
        },
        content: {
            type: FieldType.String,
            required: true,
            index:true
        },
        topic: {
            type: FieldType.ObjectId,
            //required: true,
            //index:true,
            ref: 'ctx_topic'
        },
        createdAt: {
            type: FieldType.Date,
            index:true
        }
    }
}