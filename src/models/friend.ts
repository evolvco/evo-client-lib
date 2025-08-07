import { FieldType, Meta} from "@lib/models/ModelAdaptor.types";
import { appStore } from "./stores";

export const friend:Meta = {
    name: 'friend',
    plural: 'friends',
    database: appStore.name,
    schema: {
        name: {
            type: FieldType.String,
            required: true,
            index:true
        },
        age: {
            type: FieldType.String,
            required: true,
            index:true
        },
        createdAt: {
            type: FieldType.Date
        },
        updatedAt: {
            type: FieldType.Date
        }
    }
}