import { useConfirm } from '@lib/components';
import { Button, ButtonGroup, Dialog } from './index';

interface ConfirmProps {
  cancelText?: string;
  onOpen?: () => void;
  confirmText?: string;
  title?: string;
  content?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export function Confirm({
  cancelText = 'Cancel',
  onOpen,
  confirmText = 'Confirm',
  title = 'Confirm',
  content = 'Are You Sure...',
  onCancel,
  onConfirm,
  children,
  disabled,
}: ConfirmProps) {
  const confirm = useConfirm({ onCancel, onConfirm, onOpen });

  return (
    <>
      <Dialog open={confirm.open}>
        <h3 className="text-center">{title}</h3>
        <p className="text-center">{content}</p>
        {confirm.onConfirm ? (
          <div className='flex gap-2'>
            {typeof onCancel === 'function' ? (
              <Button onClick={confirm.onCancel}>{cancelText}</Button>
            ) : null}
            <Button onClick={confirm.onConfirm} variant="primary">
              {confirmText}
            </Button>
          </div>
        ) : null}
      </Dialog>
      <div
        onClick={disabled ? () => {} : confirm.onOpen}
        style={{ display: 'inline-flex' }}
      >
        {children}
      </div>
    </>
  );
}
