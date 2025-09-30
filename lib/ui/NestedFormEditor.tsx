import { FormField } from './FormField';
import {
  Field,
  FormFieldAttributes,
  FormFieldBaseProps,
  FormFieldProps,
  Meta,
} from '../types';
import { Details } from './Details';

interface NestedFormEditorProps extends FormFieldBaseProps {
  value: any;
  meta: Meta;
  metaModels: Meta[];
  onChange: (value: any) => void;
  label?: string;
  name: string;
}

export const NestedFormEditor = ({
  value,
  name,
  meta,
  metaModels,
  onChange,
  label,
}: NestedFormEditorProps) => {
  let schema = meta.schema[name!];
  console.log('---nested-schema', meta, name, schema);
  return (
    <Details summary={label!}>
      {Object.keys(schema).map((key) => {
        let fld = schema[key as keyof typeof schema] as Field;
        //console.log('---key', key, fld)
        if (fld.constructor !== Object || fld.nested_meta) {
          return false;
        }

        let att = { ...fld, ...fld._ui_ };
        if (att.readonly) return false;

        att.name = key;
        att.label = att.label || att.name;
        att.type = fld.type;

        let props: FormFieldProps = {
          name: att.name,
          att: att as FormFieldAttributes,
          value: value[key] || '',
          metaModels,
          meta: { schema: schema as any } as any,
          onChange: (v) => {
            onChange({ [att.name as string]: v });
          },
        };
        //console.log('---nested-att-props', props, value)
        return <FormField className="mb-4" {...props} />;
      })}
    </Details>
  );
};
