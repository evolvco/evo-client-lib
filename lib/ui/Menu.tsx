import React from 'react';

interface MenuProps {
  className?: string;
  menuProps?: React.HTMLAttributes<HTMLUListElement>;
  children: React.ReactNode;
  direction?: 'column' | 'row';
}

export function Menu({
  className,
  menuProps,
  children,
  direction = 'column',
}: MenuProps): JSX.Element {
  return (
    <ul
      className={`p-2 rounded border ${
        direction === 'column' ? 'flex flex-col' : 'flex flex-row'
      } ${className || ''}`}
      {...menuProps}
    >
      {children}
    </ul>
  );
}

interface MenuItemProps {
  value?: any;
  onClick?: (value: any) => void;
  children?: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  triggerProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  selected?: boolean;
  selectedClassName?: string;
  [key: string]: any;
}

export function MenuItem({
  value,
  onClick,
  children,
  className = '',
  triggerClassName = '',
  triggerProps,
  selected,
  selectedClassName = '',
  ...itemProps
}: MenuItemProps): JSX.Element {
  if (onClick) {
    return (
      <li
        className={`${selected ? selectedClassName : ''} ${className}`}
        {...itemProps}
      >
        <button
          type="button"
          className={`min-w-32 p-2 flex w-full text-nowrap text-ellipsis overflow-hidden justify-between items-center ${triggerClassName}`}
          onClick={() => onClick(value)}
          {...triggerProps}
        >
          {children}
        </button>
      </li>
    );
  }

  return (
    <li
      className={`min-w-32 p-2 ${selected && selectedClassName} ${className}`}
      {...itemProps}
    >
      {children}
    </li>
  );
}
