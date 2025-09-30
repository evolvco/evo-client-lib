import { HoverCard, HoverCardContent, HoverCardTrigger } from '@lib/components';
import { TooltipProps } from '../types';

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <HoverCard>
      <HoverCardTrigger className="underline cursor-pointer">
        {children}
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">{content}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
