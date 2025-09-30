import { Schema } from "../types/models/meta";

export const metaSchema: Schema = {
    name: {
        type: "String",
        required: true
    },
    plural: {
        type: "String"
    },
    collection: {
        type: "String"
    },
    database: {
        type: "String",
        required: true
    },
    recordName: {
        type: "String"
    },
    description: {
        type: "String"
    },
    socket_support: {
        type: "Boolean"
    },
    tags: {
        type: "Array"
    },
    order: {
        type: "Array"
    },
    mixins: {
        type: "Array"
    },
    hooks: {
        type: "Object"
    },
    actions:{
        type: "Object"
    },
    schema: {
        type: "Object",
        required: true
    }
}