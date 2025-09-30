import { useEffect, useState } from 'react';
import { find } from '../models/services';
import { FormFieldBaseProps } from '../types';
import { Loader, MultiSelect, Option, Select } from '../ui';

interface RelatedModelSelectProps extends FormFieldBaseProps {
  onChange: any;
  many?: any;
  model: string;
  metaModels: any[];
  value: string | string[];
  useAsValue?: 'id' | 'recordName';
}

interface OptionType {
  label: string;
  value: string;
}

export function RelatedModelSelect({
  value,
  label,
  onChange,
  many,
  model,
  disabled,
  metaModels,
  className,
  useAsValue = 'id',
}: RelatedModelSelectProps) {
  const [options, setOptions] = useState<OptionType[]>();
  const metaModel = metaModels.find((m) => m.name === model);
  const attName = metaModel ? metaModel.recordName || 'name' : 'name';

  useEffect(() => {
    find(model, { limit: 1000 }).then(
      (recSet) => {
        setOptions(
          recSet.records.map((rec: any) => ({
            label: rec[attName] || rec.id,
            value: useAsValue === 'id' ? rec.id : rec[attName],
          }))
        );
      }
    );
  }, [model, attName, useAsValue]);
  if (!options) return <Loader />;

  if (many) {
    return (
      <>
        <MultiSelect
          className={className}
          disabled={disabled}
          label={label}
          value={value as string[]}
          options={options}
          onChange={onChange}
        />
      </>
    );
  }

  return (
    <>
      <Select
        className={className}
        disabled={disabled}
        label={label}
        value={value as string}
        clearable={true}
        onChange={onChange}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </>
  );
}
