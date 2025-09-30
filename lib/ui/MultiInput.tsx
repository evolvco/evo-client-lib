import { Tag, TagInput } from 'emblor';
import React, { useEffect, useState } from 'react';
import { Label } from '@lib/components/ui';
import { FormFieldBaseProps } from '../types';

interface MultiInputProps extends FormFieldBaseProps {
  value: string[];
  onChange: (value: string[]) => void;
}
export function MultiInput({
  label,
  value = [],
  onChange,
  placeholder,
  className,
  style,
}: MultiInputProps) {
  const _tags: Tag[] = value.map((v: string) => ({ text: v, id: v }));
  const [tags, setTags] = useState<Tag[]>(_tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  useEffect(() => {
    onChange(tags.map((t) => t.text));
  }, [tags]);

  return (
    <>
      {label && <Label className="m-2">{label}</Label>}
      <TagInput
        className={className}
        style={style}
        placeholder={placeholder}
        tags={tags}
        setTags={setTags}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />
    </>
  );
}
