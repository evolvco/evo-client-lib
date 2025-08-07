import { ObjectId } from '../models';
import { Query } from './query';
import { Records, AsyncRecord } from './record';


export interface Attributes {
    [fieldKey: string]: unknown;
}

export interface MetaContext {
  metaModels: Meta[] | null;
  loadMetaModels: () => Promise<void>;
}

export interface ModelAdaptor extends Meta, Crud { //todo how do i deem this a class vs module vs object or does it even matter
  model: any;
  attributes(): Meta;
  load(): Promise<void>; //loads model into memory
}

export interface MetaMap {
  [key:string]:Meta
}

export interface Meta {
  id?: ObjectId;
  name?: string;
  plural?: string;
  collection?: string;
  recordName?: string;
  primaryKey?: string;
  ownRecordsKey?: string;
  description?: string;
  socket_support?: boolean;
  tags?: Array<string>;
  order?: Array<string>;
  mixins?: Array<Mixin>;
  database?: string;
  sync?: string;
  view_own_records?: boolean;
  read_own_records?: boolean;
  create_own_records?: boolean;
  update_own_records?: boolean;
  delete_own_records?: boolean;
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
}

export interface Notify {
  email: boolean;
  email_addresses: Array<string>;
}

export interface Actions {
  create: {
      order: Array<string>;
      tags_display: TagsDisplay;
      tags_order: Array<string>;
      populate: Array<string>; 
      service: Service;
      notify: Notify;
  }
  collection: {
      order: Array<string>;
      tags_order: Array<string>; 
      populate: Array<string>; 
      service: Service;
      notify: Notify;
  }
  update: {
      order: Array<string>;
      tags_order: Array<string>;
      tags_display: TagsDisplay;
      populate: Array<string>; 
      service: Service;
      notify: Notify;
  }
  detail: {
      order: Array<string>;
      tags_order: Array<string>;
      tags_display: TagsDisplay;
      populate: Array<string>; 
      service: Service;
      notify: Notify;
  }
  remove: {
      service: Service;
      notify: Notify;
  }
}

export interface Field {
  type: FieldType;
  required?: boolean;
  unique?: boolean;
  index?: boolean;
  immutable?: boolean;
  enum?: Array<string>
  auto?: boolean;
  properties?: {
    [key: string]: any;
  };
  default?: string;
  ref?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  _ui_?: { 
      read_roles?: Array<string>;
      view_roles?: Array<string>;
      update_roles?: Array<string>;
      create_roles?: Array<string>;
      label?: string;
      multiline?: boolean;
      readonly?: boolean;
      grid?: any;
      grid_pinned?: Pinned;
      tags?: Array<string>;
      description?: string;
      nested_meta?: boolean;
      inline_editor_attributes?: Array<string>; //todo too many editor related fields
      editor?: StringEditors | BooleanEditors | ArrayEditors | ObjectEditors //todo can you show the case for each
      inline_editor?: ObjectIdEditors 
  }
}


export interface Schema {
  [fieldName: string]: Field | Array<Field>;
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
  "RolesEditor"="RolesEditor",
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
