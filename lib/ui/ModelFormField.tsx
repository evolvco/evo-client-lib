import React, { useContext, useEffect } from 'react';
import { FormField } from './FormField';
import { FormContext } from './ModelForm';

interface ModelFormFieldProps {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  value?: any;
  hidden?: boolean;
  hideLabel?: boolean;
  name: string;
  [key: string]: any;
}

export function ModelFormField({
  className,
  name,
  hideLabel,
  label,
  value,
  hidden,
}: ModelFormFieldProps): JSX.Element | null {
  const ctx = useContext(FormContext); // record, meta, values, setValues

  useEffect(() => {
    if (value !== undefined) {
      ctx.setValues?.({ ...ctx.values, [name]: value });
    }
  }, [value, name]);

  if (!ctx || !ctx.meta || !ctx.record) return null;

  return (
    <FormField
      value={ctx.values?.[name]}
      onChange={(v) => ctx.setValues?.({ ...ctx.values, [name]: v })}
      att={{
        ...ctx.meta.schema[name],
        hideLabel,
        label:
          label ||
          ctx.meta.schema[name]._ui_?.label ||
          ctx.meta.schema[name]._ui_?.name,
      }}
      className={`${className} ${hidden ? 'hidden h-0 w-0 absolute' : ''}`}
      meta={ctx.meta}
      metaModels={ctx.metaModels}
    />
  );
}