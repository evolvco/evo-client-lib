import React, { useContext } from 'react';
import { Button, Confirm } from './';
import { FormContext, FormContextType } from './ModelForm';
import { ModelFormSubmitButtonProps } from '@lib/types/components.types';

export function ModelFormSubmitButton({
  className,
  style,
  children,
  action,
  ...props
}: ModelFormSubmitButtonProps): JSX.Element | null {
  const ctx = useContext(FormContext as React.Context<FormContextType>); // record, meta, values, setValues, handleUpdate, handleRemove, handleCreate

  if (!ctx || !ctx.meta || !ctx.record) return null;

  if (ctx.values?.id && action === 'remove') {
    return (
      <Confirm
        content="This Action will remove the Model Forever."
        onConfirm={ctx.handleRemove}
        onOpen={() => {}}
        onCancel={() => {}}
        disabled={false}
      >
        <Button className={className}>{children}</Button>
      </Confirm>
    );
  }

  if (!ctx.values?.id && action === 'create') {
    return (<div className="flex flex-row gap-2">
    {ctx.meta.draft_support && ctx.fails.length > 0 && <Button onClick={ctx.handleCreate} className={className} style={style} {...props}>Save Draft</Button>}
      <Button
        disabled={ctx.fails.length > 0}
        onClick={ctx.handleCreate}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Button>
      </div>
    );
  }

  if (ctx.values?.id && action === 'update') {
    return (<div className="flex flex-row gap-2">
    {ctx.meta.draft_support && ctx.fails.length > 0 && <Button onClick={ctx.handleUpdate} className={className} style={style} {...props}>Save Draft</Button>}
      <Button
        disabled={ctx.fails.length > 0}
        onClick={ctx.handleUpdate}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Button>
      </div>
    );
  }

  return null;
}
