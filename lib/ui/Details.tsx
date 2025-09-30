import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@lib/components/ui';

interface DetailsProps {
  summary: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  open?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

export function Details({
  summary,
  children,
  className,
  style,
  open,
  onShow,
  onHide,
}: DetailsProps): JSX.Element {
  return (
    <Collapsible
      className={className}
      style={style}
      open={open}
      onChange={(open) => {
        if (open) {
          onShow?.();
        } else {
          onHide?.();
        }
      }}
    >
      <CollapsibleTrigger>{summary}</CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
