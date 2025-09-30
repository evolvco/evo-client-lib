import React, { useContext } from 'react';
import { FieldsEditor } from './FieldsEditor';
import { useMeta } from '../meta';
import { FormContext } from './ModelForm';

export function ModelFormFields({
  className,
  style,
}: ModelFormFieldsProps): JSX.Element | null {
  const meta = useMeta();
  const ctx = useContext(FormContext); // record, meta, values, setValues

  if (!ctx || !ctx.meta || !ctx.record) return null;

  return (
    <FieldsEditor
      style={style}
      className={className}
      values={ctx.values}
      onChange={(atts: Record<string, any>) =>
        ctx.setValues?.({ ...ctx.values, ...atts })
      }
      fields={ctx.fields}
      meta={ctx.meta}
      metaModels={meta.metaModels}
      id={ctx.record.id}
    />
  );
}
