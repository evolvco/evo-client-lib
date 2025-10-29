import { ManyQuery } from "./query";
import { SingleQuery } from "./query";
import { Attributes, Meta } from "./meta";

export interface ModelFactoryType { //todo how do you label a singleton/module
    meta(): ModelAdaptor;
    modelMap(): ModelMap;
    model(name: string): ModelAdaptor;
    create(atts: Meta): Promise<ModelAdaptor>;
    destroy(name:string): void;
}

export interface ModelAdaptor extends Meta, Crud { //todo how do i deem this a class vs module vs object or does it even matter
    model: any;
    attributes(): Meta;
    load(): Promise<void>; //loads model into memory
}

export interface ModelRecord extends Attributes {
    id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface RecordSet {
    records: ModelRecords
    count: {
        filtered: number,
        collection: number,
        page?: number
    }
}

export interface Crud { //todo how do i deem this a class vs module vs object or does it even matter
    //todo whats the best way to show async/await for below class methods
    count(query?: ManyQuery): Promise<number>;
    validate(atts:Attributes): Promise<void>;
    validateCreate(atts:Attributes): Promise<void>;
    validateUpdate(id:ObjectId, atts:Attributes): Promise<void>;
    find(query?: ManyQuery): Promise<ModelRecords>;
    findOne(query?: SingleQuery): AsyncModelRecord;
    findById(id: ObjectId): AsyncModelRecord;
    create(atts:Attributes): AsyncModelRecord;
    createMany(attsList: Array<Attributes>): Promise<ModelRecords>;
    createBulk(attsList: Array<Attributes>): void;
    update(query: SingleQuery, attsList: Attributes): AsyncModelRecord;
    updateMany(query: ManyQuery, attsList: Attributes): Promise<ModelRecords>;
    updateBulk(query: ManyQuery, attsList: Attributes): void;
    updateById(id: ObjectId, attsList: Attributes): AsyncModelRecord;
    remove(query: SingleQuery): AsyncModelRecord;
    removeById(id: ObjectId): AsyncModelRecord;
    removeMany(query: ManyQuery): Promise<ModelRecords>;
    removeBulk(query: ManyQuery): void;
}

export interface ModelMap {
    [modelName: string]: ModelAdaptor;
}

export type ObjectIdEditors = "dropdown" | "grid"
export type ObjectEditors = "Json Editor" | "Name/Value ListEditor" | "nested-form-editor" | "roles-editor" | "tags-editor" | "multi-select" | "meta-model-dropdown"
export type ArrayEditors = "tags-editor" | "roles-editor" | "meta-model-dropdown" | "multi-select"
export type StringEditors = "Text Input" | "Code Editor" | "time" | "Meta Model Dropdown"
export type BooleanEditors = "Checkbox" | "Switch"
export type Pinned = "left" | "right"
export type FieldType = "String" | "Number" | "Boolean" | "Date" | "ObjectId" | "Array" | "Object"
export type TagsDisplay = "tabs" | "collapsible" | "fieldset" | "" | "none"
export type Method = "GET" | "POST" | "PUT" | "DELETE"
export type Mixin = "user" | "refreshToken" | "meta"


export type ModelRecords = Array<ModelRecord> 

export type AsyncModelRecord = Promise<ModelRecord | undefined> 

//custom complex types to be relocated to a lib
type RegexMatchedString<Pattern extends RegExp> = string & {
    __regexPattern: Pattern;
};
const ObjectIdRegex = /^[0-9a-fA-F]{24}$/; 

export type ObjectId = RegexMatchedString<typeof ObjectIdRegex>;
