import React from 'react';
import { ContainerProps } from '@lib/types';

export function Container({
  children,
  style,
  className = '',
  dir = 'col',
}: ContainerProps) {
  return (
    <div style={style} className={`flex flex-${dir} ${className}`}>
      {children}
    </div>
  );
}
