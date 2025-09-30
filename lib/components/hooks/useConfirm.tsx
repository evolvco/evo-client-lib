import { useState } from 'react';

export interface UseConfirmProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  onOpen?: () => void;
}

export interface UseConfirmResult {
  open: boolean;
  onOpen: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function useConfirm(props: UseConfirmProps = {}): UseConfirmResult {
  const [open, setOpen] = useState(false);

  const onCancel = () => {
    setOpen(false);
    if (props.onCancel) props.onCancel();
  };

  const onConfirm = () => {
    setOpen(false);
    if (props.onConfirm) props.onConfirm();
  };

  const onOpen = () => {
    setOpen(true);
    if (props.onOpen) props.onOpen();
  };

  return { open, onOpen, onConfirm, onCancel };
}
