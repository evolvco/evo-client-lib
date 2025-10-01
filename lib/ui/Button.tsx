import { useState } from 'react';
import { Button as _Button } from '@lib/components';
import { dispatch as _dispatch } from '@lib/bus';
import { Confirm } from './Confirm';
import { ButtonProps } from '@lib/types';

export function Button({
  children,
  dispatch,
  confirm,
  onClick,
  ...props
}: ButtonProps) {
  if (onClick) {
    const _click = onClick;
    onClick = (ev: any, ...args: any[]) => {
      ev.preventDefault();
      ev.stopPropagation();
      _click(...args);
    };
  }

  if (dispatch) {
    const _click = onClick;
    onClick = (...args: any[]) => {
      _dispatch(dispatch, null);
      if (_click) {
        _click(...args);
      }
    };
  }

  if (confirm) {
    const [_open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleCancel = () => setOpen(false);

    return (
      <Confirm
        content={typeof confirm === 'string' ? confirm : undefined}
        onConfirm={onClick ? () => onClick() : () => {}}
        onOpen={handleOpen}
        onCancel={handleCancel}
        disabled={!!props.disabled}
      >
        <ButtonUI {...(props as any)}>{children}</ButtonUI>
      </Confirm>
    );
  }
  return <ButtonUI {...{ ...(props as any), onClick }}>{children}</ButtonUI>;
}

function ButtonUI({
  children,
  variant = 'default',
  ...props
}: ButtonProps) {

  let _variant = variant;
  if(variant === 'primary') {
    _variant = 'default';
  }
  if(variant === 'danger') {
    _variant = 'destructive';
  }
  console.log(3333, _variant);
  return <_Button {...(props as any)} variant={_variant}>{children}</_Button>;
}
