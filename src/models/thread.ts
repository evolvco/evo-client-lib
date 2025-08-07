import { FieldType, Meta} from "@lib/models/ModelAdaptor.types";
import { appStore } from "./stores";

export const thread:Meta = {
    name: 'thread',
    plural: 'threads',
    database: appStore.name,
    schema: {
        title: {
            type: FieldType.String,
            required: true,
            index: true
        },
        messages: {
            type: FieldType.Object
        },
        lastUsedAgentId: {
          type: FieldType.String  
        },
        lastUsedAgent: {
            type: FieldType.Object
        },
        lastMessageAt: {
            type: FieldType.Date
        },
        agentId: {
          type: FieldType.ObjectId,
          ref: 'agent'  
        },
        createdAt: {
            type: FieldType.Date
        },
        updatedAt: {
            type: FieldType.Date
        }
    }
}