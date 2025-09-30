import { Label, Switch as SwitchUI } from '@lib/components/ui';
import { FormFieldBaseProps } from '../types';

interface SwitchProps extends FormFieldBaseProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
}
export function Switch({
  label,
  value,
  onChange,
  className,
  style,
}: SwitchProps) {
  let id = `switch-${Math.random().toString(36).substring(2, 15)}`;
  return (
    <div
      className={`flex flex-row items-center space-x-2 ${className}`}
      style={style}
    >
      <SwitchUI id={id} checked={value} onCheckedChange={onChange} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}