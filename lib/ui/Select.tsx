import { CircleX } from 'lucide-react';
import {
  Select as _Select,
  Label,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/components';
import { Tooltip } from './Tooltip';
import { FormFieldBaseProps } from '../types';
import { BookOpen } from 'lucide-react';
import { cn } from '@lib/utils';

interface SelectProps extends FormFieldBaseProps {
  children?: React.ReactNode;
  options?: {
    label: string;
    value: string;
  }[];
  value?: string;
  onChange?: (value: string) => void;
  clearable?: boolean;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClear?: () => void;
  required?: boolean;
}

export function Select({
  children,
  placeholder,
  className,
  style,
  value,
  label,
  description,
  size,
  options,
  onChange,
  clearable,
  disabled,
  onClear,
  required,
}: SelectProps) {
  let _onClear = (): void => {
    onChange?.('');
    onClear?.();
  };

  return (
    <>
      {label && <Label className="m-2">{label}{description && <Tooltip content={description}>
        <BookOpen className="w-4 h-4 text-muted-foreground" />
      </Tooltip>}</Label>}
      <div style={style} className={`${className} relative`}>
        <_Select value={value} required={required} onValueChange={(value) => {
          onChange?.(value)
        }} disabled={disabled}>
          {clearable && (
            <div className="absolute right-0 top-0 bottom-0">
              <CircleX
                className="cursor-pointer absolute right-9 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                onClick={onClear}
              />
            </div>
          )}
          <SelectTrigger style={style} className={cn('w-full', size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg')}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>{options && options.length > 0 ? options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            )) : children}</SelectGroup>
          </SelectContent>
        </_Select>
      </div>
    </>
  );
}

interface OptionProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Option({ children, className, value, style }: OptionProps) {
  return (
    <SelectItem value={value} className={className} style={style}>
      {children}
    </SelectItem>
  );
}
