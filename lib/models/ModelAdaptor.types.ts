import { DataStore } from "./StoreAdapter.types";
import {Query} from "./QueryAdaper.types"

export interface ModelFactory { //todo how do you label a singleton/module
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

export interface Attributes {
    [fieldKey: string]: unknown;
}

export interface Record extends Attributes {
    id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface RecordSet {
    records: Records
    counts: {
        filtered: number,
        collection: number,
        page?: number
    }
}

export interface Hooks {
    pre_save?: string;
    post_save?: string;
    pre_remove?: string;
    post_remove?: string;
    read_vo?: string;
}

export interface Service {
    path: string;
    method: Method;
    secure: boolean;
    sort?: Array<string>;
    populate: Array<string>; 
}

export interface Actions {
    create: {
        order: Array<string>;
        tags_display: TagsDisplay;
        tags_order: Array<string>;
        service: Service;
    }
    collection: {
        order: Array<string>;
        tags_order: Array<string>; 
        service: Service;
    }
    update: {
        order: Array<string>;
        tags_order: Array<string>;
        tags_display: TagsDisplay;
        service: Service;
    }
    detail: {
        order: Array<string>;
        tags_order: Array<string>;
        tags_display: TagsDisplay;
        service: Service;
    }
    remove: {
        service: Service;
    }
}

export interface Field {
    type: FieldType;
    required?: boolean;
    unique?: boolean;
    index?: boolean;
    immutable?: boolean;
    enum?: Array<string>
    default?: string;
    ref?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    _ui_?: {
        label?: string;
        multiline?: boolean;
        readonly?: boolean;
        grid_pinned?: Pinned;
        tags?: Array<string>;
        description?: string;
        inline_editor_attributes?: Array<string>; //todo too many editor related fields
        editor?: StringEditors | BooleanEditors | ArrayEditors | ObjectEditors //todo can you show the case for each
        inline_editor?: ObjectIdEditors 
    }
}

export interface Schema {
    [fieldName: string]: Field | Array<Field>;
}

export interface Meta {
    id?: ObjectId;
    name: string;
    plural?: string;
    collection?: string;
    recordName?: string;
    description?: string;
    socket_support?: boolean;
    tags?: Array<string>;
    order?: Array<string>;
    mixins?: Array<Mixin>;
    dataStore?: DataStore;
    database: string;
    hooks?: Hooks;
    actions?: Actions;
    schema: Schema;
}

export interface Crud { //todo how do i deem this a class vs module vs object or does it even matter
    //todo whats the best way to show async/await for below class methods
    count(query?: Query): Promise<number>;
    validate(atts:Attributes): Promise<void>;
    validateCreate(atts:Attributes): Promise<void>;
    validateUpdate(id:ObjectId, atts:Attributes): Promise<void>;
    find(query?: Query): Promise<Records>;
    findOne(query?: Query): AsyncRecord;
    findById(id: ObjectId): AsyncRecord;
    create(atts:Attributes): AsyncRecord;
    createMany(attsList: Array<Attributes>): Promise<Records>;
    createBulk(attsList: Array<Attributes>): void;
    update(query: Query, attsList: Attributes): AsyncRecord;
    updateMany(query: Query, attsList: Attributes): Promise<Records>;
    updateBulk(query: Query, attsList: Attributes): void;
    updateById(id: ObjectId, attsList: Attributes): AsyncRecord;
    remove(query: Query): AsyncRecord;
    removeById(id: ObjectId): AsyncRecord;
    removeMany(query: Query): Promise<Records>;
    removeBulk(query: Query): void;
}

export interface ModelMap {
    [modelName: string]: ModelAdaptor;
}

export enum ObjectIdEditors {
    dropdown="dropdown",
    grid="grid"
}

export enum ObjectEditors {
    "Json Editor"="Json Editor", 
    "Name/Value ListEditor"="Name/Value ListEditor", 
    "Tags Editor"="Tags Editor",
    "multi-select"="multi-select", 
    "meta-model-dropdown"="meta-model-dropdown"
}

export enum ArrayEditors {
    "Tags Editor"="Tags Editor",
    "meta-model-dropdown"="meta-model-dropdown", 
    "multi-select"="multi-select"
}

export enum StringEditors {
    "Text Input"="Text Input",
    "Code Editor"="Code Editor", 
    "Time"="Time", 
    "Meta Model Dropdown"="Meta Model Dropdown"
}

export enum BooleanEditors {
    "Checkbox"="Checkbox",
    "Switch"="Switch"
}

export enum Pinned {
    left="left",
    right="right"
}

export enum FieldType {
    String="String",
    Number="Number",
    Boolean="Boolean",
    Date="Date",
    ObjectId="ObjectId",
    Array="Array",
    Object="Object"
}

export enum TagsDisplay {
    tabs="tabs",
    collapsible="collapsible",
    fieldset="fieldset",
    none=""
}

export enum Method {
    GET="GET",
    POST="POST",
    PUT="PUT",
    DELETE="DELETE"
}

export enum Mixin {
    user="user",
    refreshToken="refreshToken",
    meta="meta"
}

export type Records = Array<Record> 

export type AsyncRecord = Promise<Record | undefined> 

//custom complex types to be relocated to a lib
type RegexMatchedString<Pattern extends RegExp> = string & {
    __regexPattern: Pattern;
};
const ObjectIdRegex = /^[0-9a-fA-F]{24}$/; 

export type ObjectId = RegexMatchedString<typeof ObjectIdRegex>;
