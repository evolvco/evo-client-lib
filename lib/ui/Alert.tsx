import { AlertDescription, AlertTitle, Alert as AlertUI } from '@lib/components/ui';
import { X, AlertCircle } from 'lucide-react';

interface AlertProps {
  variant: 'danger' | 'info' | 'success' | 'warning'; //'destructive' | 'default';
  children: React.ReactNode;
  title?: string;
  className?: string;
  open?: boolean;
  closeHandler?: () => void;
}

export function Alert({
  variant,
  children,
  title,
  className,
  closeHandler,
  open = true,
}: AlertProps) {
  let uiVariant: string = ['warning', 'danger'].includes(variant)
    ? 'destructive'
    : 'default';

  if (!open) return null;

  return (
    <AlertUI
      variant={uiVariant as 'destructive' | 'default'}
      className={`relative ${
        uiVariant === 'destructive' ? 'bg-red-100 ' : ''
      } ${className}`}
    >
      {closeHandler && <X className="h-4 w-4 cursor-pointer absolute top-0 p-2 right-0" onClick={closeHandler} />}
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </AlertUI>
  );
}