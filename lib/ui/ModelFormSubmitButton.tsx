import React, { useContext } from 'react';
import { Button, Confirm } from './';
import { FormContext, FormContextType } from './ModelForm';

interface ModelFormSubmitButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  action?: 'create' | 'update' | 'remove';
  [key: string]: any;
}

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
    return (
      <Button
        onClick={ctx.handleCreate}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Button>
    );
  }

  if (ctx.values?.id && action === 'update') {
    return (
      <Button
        onClick={ctx.handleUpdate}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return null;
}
