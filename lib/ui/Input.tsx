import { CircleX, SearchIcon } from 'lucide-react';
import { Input as InputUI, Label } from '@lib/components/ui';
import { FormFieldBaseProps } from '../types';
import { cn } from '@lib/utils';

interface InputProps extends FormFieldBaseProps {
  value?: string;
  clearable?: boolean;
  search?: boolean;
  autocomplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export function Input({
  label,
  value,
  className,
  style,
  placeholder,
  clearable,
  search,
  autocomplete,
  onChange,
  onClear,
}: InputProps) {
  let input = (
    <InputUI
      style={style}
      value={value}
      autoComplete={autocomplete}
      onChange={onChange}
      className={cn(`w-full`, className)}
      placeholder={placeholder}
    />
  );

  if (search) {
    return (
      <>
        {label && <Label className="m-2">{label}</Label>}
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          {input}
        </div>
      </>
    );
  }

  if (clearable) {
    return (
      <>
        {label && <Label className="m-2">{label}</Label>}
        <div className="relative w-full max-w-sm">
          <CircleX
            className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            onClick={onClear}
          />
          {input}
        </div>
      </>
    );
  }

  return (
    <>
      {label && <Label className="m-2">{label}</Label>}
      {input}
    </>
  );
}
