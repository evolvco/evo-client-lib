import { FieldUI, FieldType, Meta } from "@lib/types";

export interface FormFieldBaseProps {
    name?: string;
    placeholder?: string;
    description?: string;
    className?: string;
    style?: React.CSSProperties;
    label?: string;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }
  
  export interface FormFieldAttributes {
    name: string;
    label?: string;
    type: FieldType;
    hideLabel?: boolean;
    readonly?: boolean;
    placeholder?: string;
    required?: boolean;
    default?: string;
    ref?: string;
    many?: boolean;
    enum?: string[];
    _ui_: FieldUI;
  }
  
  export interface FormFieldProps {
    value: any;
    name?: string;
    onChange: (value: any) => void;
    att: FormFieldAttributes;
    metaModels: Meta[];
    className?: string;
    meta: Meta;
    label?: string;
  }
      