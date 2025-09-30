import { groupFieldsByTag, orderFields } from '../models/utils';
import { Field, FormFieldAttributes } from '../types';
import { Card, Details, Tabset } from '../ui';
import { FormField } from './FormField';

interface FieldsEditorProps {
  values: any;
  onChange: (values: any) => void;
  fields: FormFieldAttributes[] | Field[];
  metaModels: any;
  className?: string;
  style?: React.CSSProperties;
  meta: any;
  id?: string;
}

export function FieldsEditor({
  values,
  onChange,
  fields,
  metaModels,
  className,
  style,
  meta,
  id,
}: FieldsEditorProps) {
  let action = id ? 'update' : 'create';

  function args(att: FormFieldAttributes) {
    return {
      key: att.name,
      att,
      value: values[att.name!],
      metaModels,
      meta,
      onChange: (v: any) => {
        onChange({ [att.name!]: v });
      },
    };
  }

  if (
    meta.actions &&
    meta.actions[action] &&
    meta.actions[action].tags_order?.length &&
    meta.actions[action].tags_display
  ) {
    let groups = groupFieldsByTag({ meta, fields: fields as Field[], action });
    if (meta.actions[action].tags_display === 'tabs') {
      return (
        <div className={`flex flex-col ${className}`}>
          <Tabset className="w-full">
            {meta.actions[action].tags_order.map((tab: string) => {
              return (
                <div
                  key={tab}
                  style={style}
                  className="flex flex-col"
                  data-label={tab}
                >
                  {groups[tab].map((att: any) => {
                    //if(!id && att.readonly) return false
                    let { key, ...rest } = args(att);
                    return (
                      <FormField key={att.name} className="mb-4" {...rest} />
                    );
                  })}
                </div>
              );
            })}
          </Tabset>
        </div>
      );
    }

    if (meta.actions[action].tags_display === 'collapsible') {
      return (
        <div style={style} className={`flex flex-col ${className}`}>
          {meta.actions[action].tags_order.map((tab: string) => {
            return (
              <Details className="mt-2" summary={tab}>
                {groups[tab].map((att: any) => {
                  //if(!id && att.readonly) return false
                  return <FormField className="mb-4" {...args(att)} />;
                })}
              </Details>
            );
          })}
        </div>
      );
    }

    if (meta.actions[action].tags_display === 'fieldset') {
      return (
        <div style={style} className={`flex flex-col ${className}`}>
          {meta.actions[action].tags_order.map((tab: string) => {
            return (
              <Card className="mt-2" title={tab}>
                {groups[tab].map((att: any) => {
                  //if(!id && att.readonly) return false
                  return <FormField className="m-4 mt-2" {...args(att)} />;
                })}
              </Card>
            );
          })}
        </div>
      );
    }

    return false;
  }

  const ordered = orderFields({ meta, fields: fields as Field[], action });
  //console.log('---ordered', ordered)
  return (
    <div style={style} className={`flex flex-col overflow-auto ${className}`}>
      {ordered.map((att: Field) => {
        //if(!id && att.readonly) return false
        let { key, ...rest } = args(att as FormFieldAttributes);
        if (key) {
          return <FormField className="mb-4" {...rest} key={key} />;
        }
        return (
          <FormField className="mb-4" {...args(att as FormFieldAttributes)} />
        );
      })}
    </div>
  );
}
