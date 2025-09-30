import { Label, Textarea as TextareaUI } from '@lib/components/ui';
import { FormFieldBaseProps } from '../types';

interface TextareaProps extends FormFieldBaseProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function Textarea({
  label,
  value,
  onChange,
  className,
  style,
  placeholder,
}: TextareaProps) {
  return (
    <div>
      {label && <Label className="m-2">{label}</Label>}
      <TextareaUI
        value={value}
        placeholder={placeholder}
        onChange={(ev) => onChange?.(ev.target.value)}
        className={className}
        style={style}
      />
    </div>
  );
}
