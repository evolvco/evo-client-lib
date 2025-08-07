import { FieldType, Meta} from "@lib/models/ModelAdaptor.types";
import { appStore } from "./stores";

export const ctx_topic:Meta = {
    name: 'ctx_topic',
    plural: 'ctx_topics',
    database: appStore.name,
    schema: {
        name: {
            type: FieldType.String,
            required: true,
            index:true
        },
        description: {
            type: FieldType.String,
        },
        createdAt: {
            type: FieldType.Date,
            index:true
        }
    }
}