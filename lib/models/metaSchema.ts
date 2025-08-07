import { Schema, FieldType } from "./ModelAdaptor.types";

export const metaSchema: Schema = {
    name: {
        type: FieldType.String,
        required: true
    },
    plural: {
        type: FieldType.String
    },
    collection: {
        type: FieldType.String
    },
    database: {
        type: FieldType.String,
        required: true
    },
    recordName: {
        type: FieldType.String
    },
    description: {
        type: FieldType.String
    },
    socket_support: {
        type: FieldType.Boolean
    },
    tags: {
        type: FieldType.Array
    },
    order: {
        type: FieldType.Array
    },
    mixins: {
        type: FieldType.Array
    },
    hooks: {
        type: FieldType.Object
    },
    actions:{
        type: FieldType.Object
    },
    schema: {
        type: FieldType.Object,
        required: true
    }
}