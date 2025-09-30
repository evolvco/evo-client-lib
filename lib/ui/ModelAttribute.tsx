import { renderString } from 'nunjucks';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DetailContext } from './ModelDetail';
import { ModelAttributeProps } from '@lib/types';

export function ModelAttribute({
  className,
  style,
  attribute,
  tag = 'div',
  link,
}: ModelAttributeProps): JSX.Element | null {
  //console.log('----ctx1',attribute)
  const ctx = useContext(DetailContext); // record, meta, values, setValues
  if (!ctx || !ctx.meta || !ctx.record) return null;
  let Tag = tag as keyof JSX.IntrinsicElements;
  let value = attribute.includes('{{')
    ? renderString(attribute, { record: ctx.record, meta: ctx.meta })
    : ctx.record[attribute || ctx.meta.recordName] || '';
  let linkValue = link
    ? renderString(link, { record: ctx.record, meta: ctx.meta })
    : undefined;
  //console.log('----ctx2',ctx.record, attribute, value);
  return (
    <Tag style={style} className={className}>
      {linkValue ? <Link to={linkValue}>{value}</Link> : value}
    </Tag>
  );
}
