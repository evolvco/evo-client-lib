import React, { Children, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@lib/components/ui';

interface TabsetProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Tabset({
  className,
  style,
  children,
  value,
  onChange,
}: TabsetProps): JSX.Element {
  const [tab, setTab] = useState(
    value || (children?.[0] as any)?.props['data-label']
  );

  return (
    <Tabs
      defaultValue={value}
      value={tab}
      onValueChange={(v) => {
        setTab(v);
        onChange?.(v);
      }}
    >
      <TabsList className={className} style={style}>
        {Children.map(children, (child: any) => {
          return (
            <TabsTrigger
              key={child.props['data-label']}
              value={child.props['data-label']}
            >
              <span>{child.props['data-label']}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className="w-full">
        {Children.map(children, (child: any) => {
          return (
            <TabsContent
              key={child.props['data-label']}
              value={child.props['data-label']}
            >
              {child}
            </TabsContent>
          );
        })}
      </div>
    </Tabs>
  );
}