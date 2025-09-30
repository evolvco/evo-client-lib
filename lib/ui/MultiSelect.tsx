import { Label, MultiSelect2 } from '@lib/components/ui';
import { FormFieldBaseProps } from '../types';

interface MultiSelectProps extends FormFieldBaseProps {
  options: { label: string; value: string }[];
  onChange: (value: string[]) => void;
  value?: string[];
}

export function MultiSelect({
  options,
  onChange,
  value,
  placeholder,
  className,
  style,
  label,
  disabled,
}: MultiSelectProps) {
  return (
    <>
      {label && <Label className="m-2">{label}</Label>}
      <MultiSelect2
        options={options}
        onValueChange={onChange}
        variant={'default'}
        defaultValue={value}
        placeholder={placeholder}
        className={className}
        style={style}
        disabled={disabled}
      />
    </>
  );
}
