import { getRecords } from '../store';
import { Field, Meta, ModelRecord } from '@lib/types';

type Dict<T> = { [key: string]: T };

interface FieldTypes {
  [key: string]: {
    empty: (many?: boolean) => any;
    editors: string[];
    formatters: string[];
  };
}

interface ResolveRefParams {
  value: any;
  model: Meta;
}

export function resolveRef({
  value,
  model,
}: ResolveRefParams): string | string[] {
  if (value === undefined || !model) {
    return '';
  }
  const records = getRecords(model.name);
  //console.log('---resolveRef records', model, value, records);
  if (Array.isArray(value)) {
    let vrecs = value.map((v) => records[v]);
    return vrecs.map((vrec) => vrec && vrec[model.recordName!] as any);
  } else if (value) {
    const vrec = records.find((rec) => rec.id === value);
    //console.log('---resolveRef vrec', vrec);
    return vrec && vrec[model.recordName!] as any;
  }
  return '';
}

export function toRecornNameString({ value, model }: ResolveRefParams): string {
  const v = resolveRef({ value, model });
  if (Array.isArray(v)) {
    return v.join('');
  }
  return v;
}

interface IsInValidParams {
  values: ModelRecord;
  fields: Field[];
}

interface ValidationError {
  name: string;
  message: string;
}

export const types: FieldTypes = {
  String: {
    empty: () => '',
    editors: ['Text Input', 'Code Editor', 'Time', 'Meta Model Dropdown'],
    formatters: [],
  },
  Number: {
    empty: () => '',
    editors: [],
    formatters: [],
  },
  Boolean: {
    empty: () => '',
    editors: ['Checkbox', 'Switch'],
    formatters: [],
  },
  Date: {
    empty: () => '',
    editors: [],
    formatters: [],
  },
  ObjectId: {
    empty: (many?: boolean) => (many ? [] : ''),
    editors: [],
    formatters: [],
  },
  Array: {
    empty: () => [],
    editors: [
      'Tags Editor',
      'roles-editor',
      ' meta-model-dropdown',
      'multi-select',
    ],
    formatters: [],
  },
  Object: {
    empty: () => ({}),
    editors: [
      'Json Editor',
      'Name/Value ListEditor',
      'meta-schema-editor',
      'nested-form-editor',
      'Tags Editor',
      'multi-select',
      'meta-model-dropdown',
    ],
    formatters: [],
  },
};

export function isInValid({
  values,
  fields,
}: IsInValidParams): ValidationError[] | false {
  let errors = fields
    .filter((fld) => {
      if (
        fld.required &&
        values[fld.name!] === types[fld.type].empty(fld.many)
      ) {
        return true;
      }
      return false;
    })
    .map((fld) => ({
      name: fld.name,
      message: `${fld.name} is required`,
    }));

  return errors.length > 0 ? errors as ValidationError[] : false;
}

interface ToFieldsParams {
  meta: Meta;
  action?: 'Create' | 'Update';
  user?: any;
}

export function toFields({ meta, action, user }: ToFieldsParams): Field[] {
  let fields: Field[] = [];

  Object.keys(meta.schema).forEach((k) => {
    let many: boolean | undefined;
    let att = meta.schema[k];

    if (Array.isArray(att)) {
      att = att[0];
      many = true;
    }

    if (att.type === 'ObjectId' && att.auto) {
      return;
    }

    let field: Field = {
      ...att,
      ...(att._ui_ || {}),
      name: k,
    };

    if (many) {
      field.many = true;
    }

    //check if user has role to create or update field
    if (action && user) {
      const userRoles = user.roles.map((role: any) => role.id);
      if (
        action === 'Create' &&
        att._ui_?.create_roles &&
        att._ui_.create_roles.length &&
        !att._ui_.create_roles.some((ary) => ary.includes(userRoles))
      )
        return;
      if (
        action === 'Update' &&
        att._ui_?.update_roles &&
        att._ui_.update_roles.length &&
        !att._ui_.update_roles.some((ary) => ary.includes(userRoles))
      )
        return;
    }

    fields.push(field);
  });

  return fields;
}

interface OrderFieldsParams {
  meta: Meta;
  fields: Field[];
  action: string | null;
}

export function orderFields({
  meta,
  fields,
  action,
}: OrderFieldsParams): Field[] {
  let map: Dict<Field> = {};

  fields.forEach((fld) => {
    if(fld.field) {
      map[fld.field] = fld;
    }else if(fld.name) {
      map[fld.name!] = fld;
    }
  });
  //console.log('--orderFields', fields, map, meta)
  let fldOrder: string[] | undefined;

  if (
    action &&
    meta.actions?.[action as keyof typeof meta.actions]?.order?.length
  ) {
    fldOrder = meta.actions[action as keyof typeof meta.actions].order;
  }
  if (!fldOrder?.length && meta.order?.length) {
    fldOrder = meta.order;
  }
  console.log('---- fldOrder', fldOrder, fields)

  if (fldOrder) {
    return fldOrder
      .filter((k) => map[k])
      .map((k) => {
        return map[k];
      });
  }

  return fields;
}

interface GroupFieldsByTagParams {
  meta: Meta;
  fields: Field[];
  action: string;
}

export function groupFieldsByTag({
  meta,
  fields,
  action,
}: GroupFieldsByTagParams): Dict<Field[]> {
  let groups: Dict<Field[]> = {};

  if (
    !meta.actions ||
    !meta.actions[action as keyof typeof meta.actions] ||
    !meta.actions[action as keyof typeof meta.actions].tags_order
  ) {
    return {};
  }

  meta.actions[action as keyof typeof meta.actions].tags_order?.forEach(
    (tag: string) => {
      groups[tag] = [];
    }
  );

  fields.forEach((fl) => {
    let fld = Array.isArray(fl) ? (fl[1] as Field) : fl;
    if (fld._ui_?.tags) {
      fld._ui_.tags.forEach((tg: string) => {
        if (
          meta.actions?.[
            action as keyof typeof meta.actions
          ]?.tags_order?.includes(tg)
        ) {
          groups[tg].push(fld);
        }
      });
    }
  });

  return groups;
}
