import { useEffect, useState } from 'react';
import { find } from '../models/services';
import { ModelRecord, RecordSet, Field, Meta, FormFieldAttributes, FormFieldProps } from '../types';
import {
  CodeEditor,
  Input,
  MultiInput,
  MultiSelect,
  //MetaSchemaEditor,
  NestedFormEditor,
  Option,
  RelatedModelGrid,
  RelatedModelSelect,
  Select,
  Switch,
  Textarea,
} from '../ui';

interface FormatLabelProps {
  label?: string;
  name: string;
  required?: boolean;
}

export function FormField({
  value,
  onChange,
  att,
  metaModels,
  className,
  meta,
}: FormFieldProps): JSX.Element | boolean {
  const { name, hideLabel, label, type, readonly, placeholder, required } = att;

  let [rolesOptions, setRolesOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    find('role').then(({ records }: RecordSet) => {
      setRolesOptions(
        records.map((r: ModelRecord) => {
          return { label: r.name, value: r.id } as {
            label: string;
            value: string;
          };
        })
      );
    });
  }, []);

  function formatLabel({
    label,
    name,
    required,
  }: FormatLabelProps): string | undefined {
    return hideLabel ? undefined : `${label || name}${required ? '*' : ''}`;
  }

  let params: Record<string, any> = {
    name,
  };

  if (readonly) {
    params.disabled = true;
  }
  if (att.default) {
    params.default = att.default;
  }
  if (className) {
    params.className = className;
  }

  if (att.ref) {
    params.value = value || (att.many ? [] : '');
    params.model = att.ref;
    params.label = formatLabel({ label, name, required });
    params.many = att.many;
    params.onChange = onChange;
    params.meta = meta;
    params.metaModels = metaModels;
    if (att.many) {
      let ui = (meta.schema[name] as Field)._ui_;
      if (ui?.inline_editor === 'dropdown') {
        return (
          <RelatedModelSelect
            value={value || (att.many ? [] : '')}
            label={formatLabel({ label, name, required })}
            onChange={onChange}
            many={att.many}
            model={att.ref}
            metaModels={metaModels}
            className={className}
          />
        );
      } else {
        params.fields = ui?.inline_editor_attributes || ['name'];
        const modelMeta = metaModels.find((m: Meta) => m.name === att.ref);
        return (
          <RelatedModelGrid
            value={value || (att.many ? [] : '')}
            label={formatLabel({ label, name, required })}
            onChange={onChange}
            many={att.many}
            model={modelMeta!}
            fields={params.fields}
          />
        );
      }
    }
    return (
      <RelatedModelSelect
        value={value || (att.many ? [] : '')}
        label={formatLabel({ label, name, required })}
        onChange={onChange}
        many={att.many}
        model={att.ref}
        metaModels={metaModels}
        className={className}
        disabled={readonly}
      />
    );
  }

  if (type === 'String') {
    params.value = value || att.default || '';
    params.label = formatLabel({ label, name, required });
    params.onChange = (ev: any) => onChange(ev.target.value);
    params.placeholder = placeholder;

    if (att._ui_?.multiline) {
      params.onChange = onChange;
      return <Textarea {...params} />;
    }

    if (att._ui_ && att._ui_.editor === 'meta-model-dropdown') {
      return (
        <Select {...params}>
          {metaModels.map((m: Meta) => (
            <Option key={m.name} value={m.name}>
              {m.name}
            </Option>
          ))}
        </Select>
      );
    }

    if (att.enum && att.enum.length) {
      params.onChange = (ev: any) =>
        onChange(decodeURIComponent(ev.target.value));
      params.value = encodeURIComponent(value);
      return (
        <Select {...params}>
          {att.enum.map((k) => (
            <Option key={k} value={encodeURIComponent(k)}>
              {k}
            </Option>
          ))}
        </Select>
      );
    }

    if (att._ui_?.editor === 'time') {
      params.type = 'time';
    }

    return <Input {...params} />;
  }

  if (type === 'Number') {
    params.value = value === undefined ? '' : value;
    params.type = 'number';
    params.label = formatLabel({ label, name, required });
    params.onChange = (ev: any) => onChange(ev.target.value);
    let { key, ...rest } = params;
    if (key) {
      return <Input {...rest} key={key} />;
    }
    return <Input {...params} />;
  }

  if (type === 'Boolean') {
    if (value !== undefined) {
      params.value = value;
    }
    params.onChange = onChange;
    params.className = 'm-2';
    params.label = formatLabel({ label, name, required });
    return <Switch {...(params as FormFieldAttributes)} />;
  }

  if (type === 'Date') {
    params.value =
      value && new Date(value)
        ? new Date(value).toISOString().replace('T00:00:00.000Z', '')
        : '';
    params.type = 'date';
    params.label = formatLabel({ label, name, required });
    params.onChange = (ev: any) => onChange(ev.target.value);
    return <Input {...params} />;
  }

  if (type === 'Array') {
    if (att._ui_?.editor === 'roles-editor') {
      return (
        <MultiSelect
          {...params}
          options={rolesOptions}
          onChange={onChange}
          value={value || []}
          label={formatLabel({ label, name, required })}
          className={className}
        />
      );
    }
  }

  if (type === 'Object') {
    params.label = formatLabel({ label, name, required });

    if (att._ui_?.editor === 'tags-editor') {
      return (
        <MultiInput
          value={value || []}
          onChange={(value: string[]) => onChange(value)}
          label={formatLabel({ label, name, required })}
          className={className}
        />
      );
    }

    /* if (att._ui_?.editor === 'meta-schema-editor') {
      return (
        <MetaSchemaEditor
          value={value || {}}
          onChange={(value: any) => onChange(value)}
          label={formatLabel({ label, name, required })}
        />
      );
    }
*/
    if (att._ui_?.editor === 'nested-form-editor') {
      return (
        <NestedFormEditor
          name={name}
          value={value || {}}
          metaModels={metaModels}
          meta={meta}
          onChange={(value: any) => onChange(value)}
          label={formatLabel({ label, name, required })}
        />
      );
    }

    if (att._ui_ && att._ui_.editor === 'meta-model-dropdown') {
      params.value = value || [];
      params.onChange = (ev: any) => onChange(ev.target.value);
      return (
        <Select {...params}>
          {metaModels.map((m: Meta) => (
            <Option key={m.name} value={m.name}>
              {m.name}
            </Option>
          ))}
        </Select>
      );
    }

    if (att._ui_?.editor === 'multi-select') {
      return (
        <MultiSelect
          {...params}
          options={(att._ui_.options || []).map((k) => ({
            label: k.label,
            value: k.value,
          }))}
          onChange={onChange}
          value={value || []}
          label={formatLabel({ label, name, required })}
          className={className}
        />
      );
    }

    params.onChange = onChange;
    params.value = value || {};
    params.height = att._ui_?.height || '800px';
    params.defaultLanguage = att._ui_?.language || 'json';
    params.options = {
      glyphMargin: att._ui_?.lineNumbers ? true : false,
      folding: att._ui_?.lineNumbers ? true : false,
      minimap: att._ui_?.minimap ? { enabled: true } : { enabled: false },
    };
    return (
      <CodeEditor
        value={value || {}}
        onChange={(value: any) => onChange(value)}
        {...params}
      />
    );
  }

  return false;
}
