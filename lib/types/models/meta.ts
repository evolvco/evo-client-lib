import { ArrayEditors, BooleanEditors, ObjectEditors, Pinned, StringEditors, Mixin, Method, TagsDisplay, FieldType, ObjectIdEditors } from './ModelAdaptor.types';
import { ObjectId } from '../models';
import { DataStore } from './StoreAdapter.types';
export interface Attributes {
  [fieldKey: string]: unknown;
}

export interface MetaContext {
  metaModels: Meta[] | null;
  loadMetaModels: () => Promise<void>;
}

export interface MetaMap {
  [key: string]: Meta
}

export interface Meta {
  id?: ObjectId;
  name: string;
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
  dataStore?: DataStore;
  draft_support?: boolean;
  database: string;
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

export interface NotifySchema {
  email: boolean;
  email_addresses: Array<string>;
}

export interface Actions {
  create: Action;
  collection: Action;
  update: Action;
  detail: Action;
  remove: Action;
}

export interface Action {
  order?: Array<string>;
  tags_order?: Array<string>;
  tags_display?: TagsDisplay;
  invalid?:{
    conditions?: {
      [key: string]: any
    }
  };
  populate?: Array<string>;
  service: Service;
  notify: NotifySchema;
  sort?: Array<string>;
} 

export interface Field {
  type: FieldType;
  name?: string;
  field?: string;
  many?: boolean;
  required?: boolean;
  unique?: boolean;
  index?: boolean;
  immutable?: boolean;
  enum?: Array<string>
  auto?: boolean;
  nested_meta?: boolean;
  properties?: {
    [key: string]: any;
  };
  default?: string;
  ref?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  _ui_?: FieldUI
}

export interface FieldUI {
  read_roles?: Array<string>;
  view_roles?: Array<string>;
  update_roles?: Array<string>;
  create_roles?: Array<string>;
  label?: string;
  clearable?: boolean;
  falsey_value?: 'false-value'|'empty-value';
  multiline?: boolean;
  readonly?: boolean;
  options?: Array<{
    label: string;
    value: string;
  }>;
  height?: string;
  language?: string;
  lineNumbers?: boolean;
  minimap?: boolean;
  grid?: any;
  grid_pinned?: Pinned;
  grid_sortable?: boolean;
  grid_resizable?: boolean;
  grid_width?: number;
  grid_filterable?: boolean;
  grid_flex?: number;
  grid_filter?: boolean;
  tags?: Array<string>;
  description?: string;
  nested_meta?: boolean;
  inline_editor_attributes?: Array<string>; //todo too many editor related fields
  editor?: StringEditors | BooleanEditors | ArrayEditors | ObjectEditors //todo can you show the case for each
  inline_editor?: ObjectIdEditors
}

export interface Schema {
  [fieldName: string]: Field | Array<Field>;
}

