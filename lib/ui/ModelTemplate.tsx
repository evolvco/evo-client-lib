import { renderString } from 'nunjucks';
import React, { useContext } from 'react';
import { DetailContext } from './ModelDetail';
import { ModelTemplateProps } from '@lib/types';

export function ModelTemplate({
  className,
  style,
  template,
}: ModelTemplateProps): JSX.Element | null {
  const ctx = useContext(DetailContext); // record, meta, values, setValues
  //console.log('----ctx', ctx);
  if (!ctx || !ctx.meta || !ctx.record) return null;
  let value = renderString(template, ctx.record);

  return (
    <div
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
